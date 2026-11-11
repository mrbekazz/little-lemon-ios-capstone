import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StatusBar, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { colors } from './src/theme';

const PROFILE_KEY = '@littlelemon/profile-v1';
const Stack = createNativeStackNavigator();

export default function App() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(PROFILE_KEY);
        if (active && saved) {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.firstName && parsed.lastName && parsed.email && parsed.phone) {
            setProfile(parsed);
          }
        }
      } catch (error) {
        console.warn('Could not restore profile:', error);
      } finally { if (active) setLoading(false); }
    })();
    return () => { active = false; };
  }, []);

  const saveProfile = async (data) => {
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(data));
    setProfile(data);
  };
  const logout = async () => {
    await AsyncStorage.removeItem(PROFILE_KEY);
    setProfile(null);
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      {loading ? <View style={styles.loading}><ActivityIndicator size="large" color={colors.green} /></View> : (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
            {profile ? (
              <Stack.Group navigationKey="signed-in">
                <Stack.Screen name="Home">{(props) => <HomeScreen {...props} profile={profile} />}</Stack.Screen>
                <Stack.Screen name="Profile">{(props) => <ProfileScreen {...props} profile={profile} onSave={saveProfile} onLogout={logout} />}</Stack.Screen>
              </Stack.Group>
            ) : (
              <Stack.Screen name="Onboarding" navigationKey="signed-out">
                {(props) => <OnboardingScreen {...props} onComplete={saveProfile} />}
              </Stack.Screen>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({ loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.cream } });

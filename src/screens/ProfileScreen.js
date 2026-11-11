import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormInput from '../components/FormInput';
import { colors } from '../theme';

const emailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export default function ProfileScreen({ navigation, profile, onSave, onLogout }) {
  const [draft, setDraft] = useState(profile);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const update = (key, value) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: null }));
  };
  useEffect(() => { setDraft(profile); }, [profile]);
  const save = async () => {
    const problems = {};
    if (!draft.firstName.trim()) problems.firstName = 'First name is required.';
    if (!draft.lastName.trim()) problems.lastName = 'Last name is required.';
    if (!emailValid(draft.email)) problems.email = 'A valid email is required.';
    if ((draft.phone.match(/\d/g) || []).length < 7) problems.phone = 'Enter at least 7 digits.';
    if (Object.keys(problems).length) { setErrors(problems); return; }
    setSaving(true);
    try {
      await onSave(Object.fromEntries(Object.entries(draft).map(([k, v]) => [k, v.trim()])));
      Alert.alert('Saved', 'Your profile changes have been saved.');
    } catch { Alert.alert('Unable to save', 'Please try again.'); }
    finally { setSaving(false); }
  };
  const logout = () => Alert.alert('Log out?', 'Your profile details will be cleared from this device.', [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Log out', style: 'destructive', onPress: async () => {
      try { await onLogout(); } catch { Alert.alert('Unable to log out', 'Please try again.'); }
    } },
  ]);

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.full} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
          <View style={styles.top}><Pressable testID="profile-back" accessibilityRole="button" accessibilityLabel="Back to menu" onPress={() => navigation.goBack()} style={styles.back}><Text style={styles.backIcon}>‹</Text></Pressable><Text style={styles.topLabel}>My profile</Text><View style={styles.placeholder} /></View>
          <View style={styles.identity}><View style={styles.avatar}><Text style={styles.avatarText}>{`${draft.firstName[0] || ''}${draft.lastName[0] || ''}`.toUpperCase()}</Text></View><Text style={styles.name}>{profile.firstName} {profile.lastName}</Text><Text style={styles.email}>{profile.email}</Text></View>
          <Text style={styles.sectionHeading}>Personal information</Text>
          <Text style={styles.sectionHint}>Make changes below and tap Save changes.</Text>
          <View style={styles.form}>
            <FormInput testID="profile-first-name" label="First name" value={draft.firstName} onChangeText={(v) => update('firstName', v)} autoComplete="given-name" error={errors.firstName} />
            <FormInput testID="profile-last-name" label="Last name" value={draft.lastName} onChangeText={(v) => update('lastName', v)} autoComplete="family-name" error={errors.lastName} />
            <FormInput testID="profile-email" label="Email address" value={draft.email} onChangeText={(v) => update('email', v)} autoCapitalize="none" autoCorrect={false} keyboardType="email-address" autoComplete="email" error={errors.email} />
            <FormInput testID="profile-phone" label="Phone number" value={draft.phone} onChangeText={(v) => update('phone', v)} keyboardType="phone-pad" autoComplete="tel" error={errors.phone} />
          </View>
          <Pressable testID="save-profile" disabled={saving} onPress={save} style={({ pressed }) => [styles.save, pressed && { opacity: 0.85 }]}>{saving ? <ActivityIndicator color={colors.ink} /> : <Text style={styles.saveText}>Save changes</Text>}</Pressable>
          <Pressable testID="logout" onPress={logout} style={({ pressed }) => [styles.logout, pressed && { opacity: 0.85 }]}><Text style={styles.logoutText}>Log out</Text></Pressable>
          <Text style={styles.disclaimer}>Your profile is stored locally on this device.</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream }, full: { flex: 1 }, content: { paddingHorizontal: 25, paddingTop: 8, paddingBottom: 35 },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 9 },
  topLabel: { fontWeight: '900', fontSize: 16, color: colors.ink }, placeholder: { width: 42 },
  back: { width: 42, height: 42, borderRadius: 14, backgroundColor: colors.pale, borderWidth: 1, borderColor: colors.line, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 34, lineHeight: 36, color: colors.green, marginTop: -4 },
  identity: { alignItems: 'center', paddingTop: 15, paddingBottom: 29 }, avatar: { backgroundColor: colors.orange, width: 82, height: 82, borderRadius: 30, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 28, fontWeight: '900', color: colors.greenDark }, name: { fontSize: 24, fontWeight: '900', color: colors.ink, marginTop: 13 },
  email: { fontSize: 13, color: colors.muted, marginTop: 5 }, sectionHeading: { fontWeight: '900', fontSize: 19, color: colors.ink },
  sectionHint: { color: colors.muted, fontSize: 12, marginTop: 5, marginBottom: 20 },
  form: { },
  save: { height: 54, borderRadius: 14, backgroundColor: colors.yellow, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  saveText: { fontWeight: '900', fontSize: 15, color: colors.ink },
  logout: { height: 54, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginTop: 12, borderWidth: 1.5, borderColor: colors.green },
  logoutText: { fontWeight: '900', fontSize: 15, color: colors.green },
  disclaimer: { textAlign: 'center', fontSize: 11, color: colors.muted, marginTop: 20 },
});

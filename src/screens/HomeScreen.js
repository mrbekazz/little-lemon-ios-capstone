import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, Image, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Brand from '../components/Brand';
import { colors } from '../theme';
import { CATEGORIES, MENU, filterMenu } from '../data/menu';

function DishCard({ dish }) {
  return (
    <View style={styles.dishCard} accessibilityLabel={`${dish.title}, ${dish.category}, $${dish.price.toFixed(2)}`}>
      <View style={styles.dishText}>
        <Text style={styles.dishCategory}>{dish.category.toUpperCase()}</Text>
        <Text style={styles.dishTitle}>{dish.title}</Text>
        <Text numberOfLines={3} style={styles.dishDescription}>{dish.description}</Text>
        <Text style={styles.dishPrice}>${dish.price.toFixed(2)}</Text>
      </View>
      <Image source={dish.image} style={styles.dishImage} resizeMode="cover" accessibilityLabel={`${dish.title} illustration`} />
    </View>
  );
}

export default function HomeScreen({ navigation, profile }) {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const visible = useMemo(() => filterMenu(MENU, category, search), [category, search]);
  const initials = `${profile.firstName[0] || ''}${profile.lastName[0] || ''}`.toUpperCase();

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'right', 'left']}>
      <FlatList
        testID="menu-list"
        data={visible}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DishCard dish={item} />}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<>
          <View style={styles.header}>
            <Brand small />
            <Pressable onPress={() => navigation.navigate('Profile')} testID="open-profile" accessibilityRole="button" accessibilityLabel="Open profile" style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </Pressable>
          </View>
          <View style={styles.helloRow}><Text style={styles.hello}>Hi, {profile.firstName} 👋</Text><Text style={styles.welcome}>Welcome back!</Text></View>
          <View style={styles.hero}>
            <View style={styles.heroTextArea}>
              <Text style={styles.heroTitle}>Little Lemon</Text>
              <Text style={styles.heroCity}>Chicago</Text>
              <Text style={styles.heroDescription}>Family-owned Mediterranean flavors, freshly made with love, right in the heart of Chicago.</Text>
            </View>
            <View style={styles.heroArt}>
              <Text style={styles.heroIcon}>🍋</Text>
              <Text style={styles.heroSprig}>✺</Text>
            </View>
            <View style={styles.searchWrap}>
              <Text style={styles.searchIcon}>🔎</Text>
              <TextInput testID="menu-search" accessibilityLabel="Search dishes" placeholder="Search dishes, ingredients..." placeholderTextColor="#86938D" value={search} onChangeText={setSearch} autoCapitalize="none" returnKeyType="search" style={styles.searchInput} />
              {!!search && <Pressable testID="clear-search" accessibilityLabel="Clear search" onPress={() => setSearch('')}><Text style={styles.clear}>✕</Text></Pressable>}
            </View>
          </View>
          <View style={styles.menuTitleRow}>
            <View><Text style={styles.menuOverline}>FRESHLY PREPARED</Text><Text style={styles.menuTitle}>Our menu</Text></View>
            <Text style={styles.count}>{visible.length} dishes</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll} contentContainerStyle={styles.categories}>
            {CATEGORIES.map((item) => (
              <Pressable key={item} testID={`category-${item.toLowerCase()}`} accessibilityRole="button" accessibilityState={{ selected: category === item }} onPress={() => setCategory(item)} style={[styles.chip, category === item && styles.chipActive]}>
                <Text style={[styles.chipText, category === item && styles.chipTextActive]}>{item}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </>}
        ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyEmoji}>🥗</Text><Text style={styles.emptyTitle}>No dishes found</Text><Text style={styles.emptyText}>Try a different search or menu category.</Text><Pressable onPress={() => { setSearch(''); setCategory('All'); }}><Text style={styles.reset}>Show all dishes</Text></Pressable></View>}
        ListFooterComponent={<Text style={styles.endText}>GOOD FOOD, GOOD MOOD  ·  LITTLE LEMON</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream }, list: { paddingHorizontal: 21, paddingBottom: 30 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 15, paddingBottom: 17 },
  avatar: { width: 46, height: 46, borderRadius: 17, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.orange },
  avatarText: { fontSize: 16, fontWeight: '900', color: colors.greenDark },
  helloRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 15 },
  hello: { fontSize: 17, fontWeight: '800', color: colors.ink }, welcome: { fontSize: 12, color: colors.muted },
  hero: { backgroundColor: colors.green, borderRadius: 23, padding: 19, paddingBottom: 18, overflow: 'hidden' },
  heroTextArea: { width: '75%', zIndex: 1 }, heroTitle: { fontSize: 32, lineHeight: 37, fontWeight: '900', color: colors.yellow, letterSpacing: -1.2 },
  heroCity: { fontSize: 22, lineHeight: 27, fontWeight: '700', color: colors.white },
  heroDescription: { marginTop: 14, marginBottom: 22, fontSize: 13, lineHeight: 19, color: colors.white },
  heroArt: { position: 'absolute', right: -23, top: 29, width: 152, height: 152, borderRadius: 76, backgroundColor: '#62796F', alignItems: 'center', justifyContent: 'center' },
  heroIcon: { fontSize: 75, transform: [{ rotate: '-18deg' }] }, heroSprig: { position: 'absolute', color: colors.yellow, right: 14, top: -15, fontSize: 35 },
  searchWrap: { flexDirection: 'row', height: 49, backgroundColor: colors.white, borderRadius: 13, alignItems: 'center', paddingHorizontal: 13, zIndex: 2 },
  searchIcon: { fontSize: 21, lineHeight: 28, color: colors.green, width: 32, marginTop: 0 }, searchInput: { color: colors.ink, fontSize: 13, flex: 1, height: '100%' }, clear: { color: colors.muted, fontSize: 16, paddingHorizontal: 8 },
  menuTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 25, marginBottom: 16 },
  menuOverline: { fontSize: 10, fontWeight: '900', letterSpacing: 1.9, color: colors.green },
  menuTitle: { fontSize: 27, fontWeight: '900', letterSpacing: -1, marginTop: 4, color: colors.ink },
  count: { fontSize: 12, color: colors.muted, marginBottom: 4 },
  categoryScroll: { flexGrow: 0, marginBottom: 8 }, categories: { gap: 9, paddingBottom: 14, paddingRight: 10 },
  chip: { borderRadius: 12, backgroundColor: colors.pale, borderWidth: 1, borderColor: colors.line, paddingVertical: 11, paddingHorizontal: 17 },
  chipActive: { backgroundColor: colors.green, borderColor: colors.green }, chipText: { fontWeight: '800', color: colors.green, fontSize: 12 }, chipTextActive: { color: colors.white },
  dishCard: { flexDirection: 'row', paddingVertical: 18, borderBottomWidth: 1, borderColor: colors.line, gap: 14, alignItems: 'center' },
  dishText: { flex: 1 }, dishCategory: { fontSize: 9, fontWeight: '900', letterSpacing: 1.4, color: colors.green },
  dishTitle: { fontSize: 17, fontWeight: '900', color: colors.ink, marginTop: 6 },
  dishDescription: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 8 },
  dishPrice: { color: colors.green, fontSize: 16, fontWeight: '900', marginTop: 9 },
  dishImage: { width: 119, height: 115, borderRadius: 17, backgroundColor: colors.pale },
  empty: { alignItems: 'center', paddingVertical: 42 }, emptyEmoji: { fontSize: 48 }, emptyTitle: { color: colors.ink, fontSize: 20, fontWeight: '900', marginTop: 10 },
  emptyText: { marginTop: 8, color: colors.muted, fontSize: 13 }, reset: { color: colors.green, fontWeight: '900', marginTop: 20, textDecorationLine: 'underline' },
  endText: { textAlign: 'center', marginTop: 28, fontSize: 9, fontWeight: '700', color: colors.muted, letterSpacing: 1.5 },
});

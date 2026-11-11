import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormInput from '../components/FormInput';
import Brand from '../components/Brand';
import { colors } from '../theme';

const headings = [
  ['Welcome to the table.', 'First, tell us what to call you.'],
  ['Stay in the loop.', 'Add an email address for your profile.'],
  ['One last detail.', 'Add your phone number and explore the menu.'],
];

const emailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
const phoneValid = (phone) => (phone.match(/\d/g) || []).length >= 7;

export default function OnboardingScreen({ onComplete }) {
  const [page, setPage] = useState(0);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: null }));
  };

  const next = async () => {
    const problems = {};
    if (page === 0) {
      if (!form.firstName.trim()) problems.firstName = 'First name is required.';
      if (!form.lastName.trim()) problems.lastName = 'Last name is required.';
    } else if (page === 1) {
      if (!emailValid(form.email)) problems.email = 'Enter a valid email address.';
    } else if (!phoneValid(form.phone)) {
      problems.phone = 'Enter a valid phone number (at least 7 digits).';
    }
    if (Object.keys(problems).length) { setErrors(problems); return; }
    if (page < 2) { setPage((current) => current + 1); return; }
    setSaving(true);
    try {
      await onComplete({
        firstName: form.firstName.trim(), lastName: form.lastName.trim(),
        email: form.email.trim(), phone: form.phone.trim(),
      });
    } catch {
      Alert.alert('Unable to save', 'Please try again.');
    } finally { setSaving(false); }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.full} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Brand />
          <View style={styles.progressRow}>
            {[0, 1, 2].map((n) => <View key={n} style={[styles.progress, n <= page && styles.progressActive]} />)}
          </View>
          <Text style={styles.overline}>GETTING STARTED  ·  {page + 1} OF 3</Text>
          <Text style={styles.title}>{headings[page][0]}</Text>
          <Text style={styles.sub}>{headings[page][1]}</Text>
          <View style={styles.visual}>
            <Text style={styles.visualEmoji}>{['🍋', '✉️', '🥗'][page]}</Text>
            <Text style={styles.visualText}>{['Fresh food. Warm welcome.', 'Good food, good news.', 'Your table is ready.'][page]}</Text>
          </View>
          <View style={styles.form}>
            {page === 0 && <>
              <FormInput label="First name" testID="first-name" value={form.firstName} onChangeText={(v) => update('firstName', v)} autoComplete="given-name" placeholder="e.g. Alex" error={errors.firstName} />
              <FormInput label="Last name" testID="last-name" value={form.lastName} onChangeText={(v) => update('lastName', v)} autoComplete="family-name" placeholder="e.g. Morgan" error={errors.lastName} />
            </>}
            {page === 1 && <FormInput label="Email address" testID="email" value={form.email} onChangeText={(v) => update('email', v)} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} autoComplete="email" placeholder="alex@example.com" error={errors.email} />}
            {page === 2 && <FormInput label="Phone number" testID="phone" value={form.phone} onChangeText={(v) => update('phone', v)} keyboardType="phone-pad" autoComplete="tel" placeholder="+1 312 555 0199" error={errors.phone} />}
          </View>
          <View style={styles.actions}>
            {page > 0 && <Pressable testID="onboarding-back" onPress={() => { setErrors({}); setPage((p) => p - 1); }} style={styles.back}><Text style={styles.backText}>← Back</Text></Pressable>}
            <Pressable testID="onboarding-next" disabled={saving} onPress={next} style={({ pressed }) => [styles.next, pressed && { opacity: 0.85 }, saving && { opacity: 0.7 }]}>
              {saving ? <ActivityIndicator color={colors.greenDark} /> : <Text style={styles.nextText}>{page === 2 ? 'Explore the menu  →' : 'Next  →'}</Text>}
            </Pressable>
          </View>
          <Text style={styles.footer}>Little Lemon  ·  Chicago, Illinois</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream }, full: { flex: 1 },
  content: { flexGrow: 1, paddingHorizontal: 26, paddingTop: 18, paddingBottom: 28 },
  progressRow: { flexDirection: 'row', gap: 7, marginTop: 38, marginBottom: 24 },
  progress: { flex: 1, height: 5, borderRadius: 5, backgroundColor: colors.line },
  progressActive: { backgroundColor: colors.green },
  overline: { fontSize: 11, letterSpacing: 2, color: colors.green, fontWeight: '900', marginBottom: 12 },
  title: { fontSize: 37, fontWeight: '900', letterSpacing: -1.6, color: colors.ink, lineHeight: 42 },
  sub: { fontSize: 16, lineHeight: 24, color: colors.muted, marginTop: 11 },
  visual: { marginTop: 25, backgroundColor: colors.green, minHeight: 158, borderRadius: 23, alignItems: 'center', justifyContent: 'center', gap: 6, overflow: 'hidden' },
  visualEmoji: { fontSize: 66 }, visualText: { color: colors.white, fontWeight: '700', fontSize: 15 },
  form: { marginTop: 26, minHeight: 165 },
  actions: { flexDirection: 'row', gap: 12, marginTop: 7 },
  back: { paddingHorizontal: 20, borderRadius: 14, borderWidth: 1, borderColor: colors.line, justifyContent: 'center', backgroundColor: colors.white },
  backText: { fontWeight: '700', color: colors.green },
  next: { flex: 1, backgroundColor: colors.yellow, borderRadius: 14, height: 54, alignItems: 'center', justifyContent: 'center' },
  nextText: { color: colors.ink, fontSize: 16, fontWeight: '900' },
  footer: { color: colors.muted, textAlign: 'center', fontSize: 11, marginTop: 33 },
});

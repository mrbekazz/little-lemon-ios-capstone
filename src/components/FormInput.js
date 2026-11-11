import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function FormInput({ label, value, onChangeText, placeholder, keyboardType = 'default', autoCapitalize = 'sentences', autoComplete, error, testID, ...rest }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        testID={testID}
        style={[styles.input, error && styles.invalid]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9AA49E"
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        selectionColor={colors.green}
        {...rest}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 17 },
  label: { fontSize: 14, color: colors.ink, fontWeight: '800', marginBottom: 8 },
  input: { height: 54, paddingHorizontal: 17, borderRadius: 15, backgroundColor: colors.white, borderWidth: 1.5, borderColor: colors.line, fontSize: 16, color: colors.ink },
  invalid: { borderColor: colors.error },
  error: { color: colors.error, marginTop: 5, fontSize: 12 },
});

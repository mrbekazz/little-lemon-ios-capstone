import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function Brand({ small = false }) {
  return (
    <View style={styles.row} accessibilityLabel="Little Lemon restaurant logo">
      <View style={[styles.mark, small && styles.smallMark]}>
        <Text style={[styles.lemon, small && styles.smallLemon]}>✦</Text>
      </View>
      <View>
        <Text style={[styles.name, small && styles.smallName]}>little lemon</Text>
        <Text style={styles.tag}>MEDITERRANEAN KITCHEN</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  mark: { width: 39, height: 39, borderRadius: 14, backgroundColor: colors.yellow, justifyContent: 'center', alignItems: 'center', transform: [{ rotate: '-12deg' }] },
  lemon: { fontSize: 31, fontWeight: '900', color: colors.greenDark, lineHeight: 37 },
  name: { fontSize: 22, fontWeight: '900', letterSpacing: -1.3, color: colors.greenDark },
  tag: { fontSize: 7, letterSpacing: 1.15, color: colors.muted, fontWeight: '800', marginTop: -2 },
  smallMark: { width: 31, height: 31, borderRadius: 11 },
  smallLemon: { fontSize: 25, lineHeight: 31 },
  smallName: { fontSize: 18 },
});

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

export default function Header( {onBackPress} ) {
  const { t } = useTranslation();
  const { scale } = useResponsiveLayout();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onBackPress ? onBackPress : () => router.back()} style={styles.backButton} accessibilityRole="button">
        <View style={styles.backButtonContent}>
          <Ionicons name="arrow-back" size={scale(23, 20, 26)} color="#345641" />
          <Text style={[styles.backButtonText, { fontSize: scale(18, 15, 20) }]}>{t('PREVIOUS')}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    paddingVertical: 10,
  },
  backButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#345641',
  },
});

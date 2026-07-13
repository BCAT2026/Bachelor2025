import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

export default function TipsBox({ title = 'Tips!', subtitle }) {
  const { scale } = useResponsiveLayout();

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={[styles.title, { fontSize: scale(22, 19, 25) }]}>
        {title}
      </ThemedText>
      {subtitle && (
        <ThemedText type="default" style={[styles.subtitle, { fontSize: scale(16, 14, 18) }]}>
          {subtitle}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FBF8',
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D3DED8',
    marginBottom: 10,
    width: '100%',
  },
  title: {
    fontSize: 22,
    fontFamily: 'Poppins_600SemiBold',
    color: '#2E443E',
    marginBottom: 8,
  },
  subtitle: {
    color: '#2E443E', 
    textAlign: 'center',
    lineHeight: 23,
  },
});

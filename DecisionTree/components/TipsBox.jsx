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
    backgroundColor: '#E8F5E9',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#2E443E',
    marginBottom: 10,
    width: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold', 
    color: '#2E443E',
    marginBottom: 2,
  },
  subtitle: {
    color: '#2E443E', 
    textAlign: 'center',
    lineHeight: 23,
  },
});

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import pdfFiles from './pdfFiles';

export default function PdfView() {
  const { filename } = useLocalSearchParams();
  const router = useRouter();

  const pdf = pdfFiles[filename];
  const uri = pdf?.uri;

  if (!uri) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>PDF ikke funnet: {filename}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#345641" />
        </TouchableOpacity>
        <ThemedText style={styles.title}>{filename}</ThemedText>
      </View>

      <WebView
        source={{ uri }}
        style={styles.pdf}
        originWhitelist={['*']}
        useWebKit
        startInLoadingState
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5ECE5',
  },
  backButton: { marginRight: 10 },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#345641',
  },
  pdf: { flex: 1 },
});









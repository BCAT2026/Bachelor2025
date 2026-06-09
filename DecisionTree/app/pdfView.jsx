import React, { useCallback, useEffect } from 'react';
import { Alert, Linking, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import Constants from 'expo-constants';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import pdfFiles from './pdfFiles';
import { useTranslation } from 'react-i18next';

export default function PdfView() {
  const { t } = useTranslation();
  const params = useLocalSearchParams();
  const router = useRouter();
  const selectedFile = Array.isArray(params.filename) ? params.filename[0] : params.filename;
  const pdf = pdfFiles[selectedFile];
  const pdfUri = pdf?.fallbackUri;
  const isExpoGo = Constants.executionEnvironment === 'storeClient' || Constants.appOwnership === 'expo';

  const getPdfUri = async () => {
    try {
      if (isExpoGo) {
        if (pdf?.asset) {
          return Asset.fromModule(pdf.asset).uri || pdfUri;
        }

        return pdfUri;
      }

      if (!pdf?.asset) {
        return pdfUri;
      }

      const asset = Asset.fromModule(pdf.asset);
      await asset.downloadAsync();
      const localUri = asset.localUri || asset.uri;

      return localUri || pdfUri;
    } catch {
      return pdfUri;
    }
  };

  const openPdf = useCallback(async () => {
    const uri = await getPdfUri();

    if (!uri) {
      Alert.alert(t('PDF_OPEN_ERROR'));
      return;
    }

    try {
      if (uri.startsWith('http')) {
        await WebBrowser.openBrowserAsync(uri);
        return;
      }

      await Linking.openURL(uri);
    } catch {
      try {
        if (pdfUri && pdfUri !== uri) {
          await WebBrowser.openBrowserAsync(pdfUri);
          return;
        }
      } catch {
        // Fallback failed too. Show the user-facing error below.
      }

      Alert.alert(t('PDF_OPEN_ERROR'));
    }
  }, [pdf, pdfUri, isExpoGo, t]);

  useEffect(() => {
    openPdf();
  }, [openPdf]);

  if (!pdfUri) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#345641" />
          </TouchableOpacity>
          <ThemedText style={styles.title}>PDF ikke funnet</ThemedText>
        </View>
        <View style={styles.emptyState}>
          <ThemedText style={styles.emptyText}>{selectedFile}</ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#345641" />
        </TouchableOpacity>
        <ThemedText style={styles.title}>{selectedFile}</ThemedText>
      </View>

      <View style={styles.openState}>
        <ThemedText style={styles.openText}>PDF-en åpnes i nettleseren.</ThemedText>
        <TouchableOpacity style={styles.openButton} onPress={openPdf}>
          <ThemedText style={styles.openButtonText}>Åpne PDF</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5ECE5',
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#345641',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyText: {
    color: '#345641',
    textAlign: 'center',
  },
  openState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 20,
  },
  openText: {
    color: '#345641',
    fontSize: 18,
    textAlign: 'center',
  },
  openButton: {
    borderWidth: 2,
    borderColor: '#345641',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  openButtonText: {
    color: '#345641',
    fontSize: 18,
    fontFamily: 'Poppins_400Regular',
  },
});

import React, { useCallback, useEffect } from 'react';
import { Alert, Linking, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Asset } from 'expo-asset';
import Constants from 'expo-constants';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { ThemedText } from '@/components/ThemedText';
import Header from '@/components/Header';
import ParallaxScrollView from '@/components/ParallaxScrollView';
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
      <ParallaxScrollView>
        <Header onBackPress={() => router.back()} />
        <View style={styles.emptyState}>
          <ThemedText style={styles.title}>PDF ikke funnet</ThemedText>
          <ThemedText style={styles.emptyText}>{selectedFile}</ThemedText>
        </View>
      </ParallaxScrollView>
    );
  }

  return (
    <ParallaxScrollView>
      <Header onBackPress={() => router.back()} />

      <View style={styles.openState}>
        <ThemedText style={styles.openText}>PDF-en åpnes i nettleseren.</ThemedText>
        <TouchableOpacity style={styles.openButton} onPress={openPdf}>
          <ThemedText style={styles.openButtonText}>Åpne PDF</ThemedText>
        </TouchableOpacity>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#345641',
    marginBottom: 10,
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

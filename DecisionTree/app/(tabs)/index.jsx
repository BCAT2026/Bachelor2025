import React, { useState } from 'react';
import { StyleSheet, Image, TouchableOpacity, Text, Modal, View, Dimensions, } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LanguageSelector from '../../components/LanguageSelector';
import { ThemedView } from '../../components/ThemedView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: screenWidth } = Dimensions.get('window');

export default function IndexScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={styles.container}>
      {/* TOPP */}
      <View style={styles.top}>
        <TouchableOpacity
          style={styles.helpIcon}
          onPress={() => setModalVisible(true)}
          accessibilityRole="button"
          accessibilityLabel="Help: About the app"
        >
          <Ionicons
            name="help-circle-outline"
            size={30}
            color="#345641"
          />
        </TouchableOpacity>

        <ThemedView style={styles.languageButton}>
          <LanguageSelector />
        </ThemedView>
      </View>


      {/* MIDT */}
      <View style={styles.middle}>
        <Image
          source={require('../../assets/images/Logo_bildeogtekst.png')}
          style={styles.logo}
          resizeMode="contain"
          accessibilityLabel="Logo - BCAT"
        />
      </View>

      {/* BUNN */}
      <View style={[styles.bottom, { paddingBottom: insets.bottom + 20 }]}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => router.push({ pathname: '/swipeTips', params: { reset: 'true' } })}
          accessibilityRole="button"
        >
          <Text style={styles.startText}>{t('START')}</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
          accessibilityRole="button"
        >
          <TouchableOpacity style={styles.modalBox} activeOpacity={1}>
            <Text style={styles.modalTitle}>{t('ABOUT_APP_TITLE')}</Text>
            <Text style={styles.modalText}>{t('ABOUT_APP_TEXT')}</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
              accessibilityRole="button"
            >
              <Text style={styles.modalCloseText}>{t('CLOSE')}</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  languageButton: {
    minWidth: 44,
    minHeight: 44,
  },
  helpIcon: {
    minWidth: 44,
    minHeight: 44,
  },
  middle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: screenWidth * 0.8,
    height: screenWidth * 0.8,
    maxWidth: 300,
    marginBottom: 20,
  },
  bottom: {
    alignItems: 'center',
    marginBottom: 40,
  },
  startButton: {
    backgroundColor: '#345641',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 40,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startText: {
    color: '#fff',
    fontSize: 26,
    fontFamily: 'Poppins_600SemiBold',
    lineHeight: 30,
    textAlignVertical: 'center',
    textAlign: 'center',
    marginBottom: -2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    width: '85%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2E443E',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#2E443E',
    marginBottom: 20,
  },
  modalCloseButton: {
    backgroundColor: '#345641',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  modalCloseText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


/* Kilder
* Image - https://reactnative.dev/docs/image 
* */





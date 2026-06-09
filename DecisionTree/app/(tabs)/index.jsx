import { StyleSheet, Image, TouchableOpacity, Text, Modal, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LanguageSelector from '../../components/LanguageSelector';
import { ThemedView } from '../../components/ThemedView';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
{/* Nesteknapp
  import NextButton from '../../components/NextButton'; */}

export default function IndexScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  {/* Nesteknapp
    const handleNeste = () => {} */}

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.languageButton}>
        <LanguageSelector />
      </ThemedView>

      <TouchableOpacity style={styles.helpIcon} onPress={() => setModalVisible(true)} accessibilityRole="button">
        <Ionicons name="help-circle-outline" size={30} color="#345641" accessibilityLabel='Question mark' />
      </TouchableOpacity>

      <Image
        source={require('../../assets/images/Logo_bildeogtekst.png')}
        style={styles.logo}
        resizeMode="contain"
        accessibilityLabel="Logo - BCAT"
      />

      {/* Nesteknappen
      <NextButton onPress={handleNeste} text="Neste" />*/}

<TouchableOpacity
  style={styles.startButton}
  onPress={() => router.push({ pathname: '/swipeTips', params: { reset: 'true' } })}
  accessibilityRole="button"
>
  <Text style={styles.startText}>{t('START')}</Text>
</TouchableOpacity>

<Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)} accessibilityRole="button">
          <TouchableOpacity style={styles.modalBox} activeOpacity={1}>
            <Text style={styles.modalTitle}>{t('ABOUT_APP_TITLE')}</Text>
            <Text style={styles.modalText}>
              {t('ABOUT_APP_TEXT')}
            </Text>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)} accessibilityRole="button">
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageButton: {
    position: 'absolute',
    top: 60,
    right: 20,
  },
  logo: {
    width: 290,
    height: 290,
    marginBottom: 100,
  },
  startButton: {
    backgroundColor: '#345641',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 40,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 2px rgba(0, 0, 0, 0.2)',
      },
      default: {
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
      },
    }),
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
  helpIcon: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
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
    width: '80%',
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





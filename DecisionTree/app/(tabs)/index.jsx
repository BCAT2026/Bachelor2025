import { StyleSheet, Image, TouchableOpacity, Text, Modal } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import LanguageSelector from '../../components/LanguageSelector';
import { ThemedView } from '../../components/ThemedView';
import React, { useCallback, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { DECISION_TREE_PROGRESS_KEY } from '@/constants/storageKeys';
{/* Nesteknapp
  import NextButton from '../../components/NextButton'; */}

export default function IndexScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);
  const insets = useSafeAreaInsets();
  const { width, height, horizontalPadding, isSmallPhone, scale } = useResponsiveLayout();
  const logoSize = Math.min(width * 0.72, height * 0.32, scale(290, 190, 320));
  const topOffset = insets.top + 18;

  {/* Nesteknapp
    const handleNeste = () => {} */}

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const checkSavedProgress = async () => {
        try {
          const savedProgress = await AsyncStorage.getItem(DECISION_TREE_PROGRESS_KEY);
          if (isActive) {
            setHasSavedProgress(Boolean(savedProgress));
          }
        } catch {
          if (isActive) {
            setHasSavedProgress(false);
          }
        }
      };

      checkSavedProgress();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const handleStart = async () => {
    try {
      await AsyncStorage.removeItem(DECISION_TREE_PROGRESS_KEY);
    } catch {
      // Start ny flyt selv om lokal lagring ikke kan slettes akkurat nå.
    }

    setHasSavedProgress(false);
    router.push({ pathname: '/swipeTips', params: { reset: 'true' } });
  };

  const handleContinue = () => {
    router.push('/decisionTreePage');
  };

  return (
    <ThemedView style={[styles.container, { paddingHorizontal: horizontalPadding }]}>
      <ThemedView style={[styles.languageButton, { top: topOffset, right: horizontalPadding }]}>
        <LanguageSelector />
      </ThemedView>

      <TouchableOpacity
        style={[styles.helpIcon, { top: topOffset, left: horizontalPadding }]}
        onPress={() => setModalVisible(true)}
        accessibilityRole="button"
        hitSlop={12}
      >
        <Ionicons name="help-circle-outline" size={30} color="#345641" accessibilityLabel='Question mark' />
      </TouchableOpacity>

      <Image
        source={require('../../assets/images/Logo_bildeogtekst.png')}
        style={[styles.logo, {
          width: logoSize,
          height: logoSize,
          marginBottom: isSmallPhone ? 44 : 84,
        }]}
        resizeMode="contain"
        accessibilityLabel="Logo - BCAT"
      />

      {/* Nesteknappen
      <NextButton onPress={handleNeste} text="Neste" />*/}

<ThemedView style={styles.actionContainer}>
  {hasSavedProgress && (
    <TouchableOpacity
      style={styles.startButton}
      onPress={handleContinue}
      activeOpacity={0.78}
      accessibilityRole="button"
    >
      <Text style={styles.startText}>{t('CONTINUE')}</Text>
    </TouchableOpacity>
  )}

  <TouchableOpacity
    style={hasSavedProgress ? styles.secondaryButton : styles.startButton}
    onPress={handleStart}
    activeOpacity={0.78}
    accessibilityRole="button"
  >
    <Text style={hasSavedProgress ? styles.secondaryText : styles.startText}>
      {hasSavedProgress ? t('START_OVER') : t('START')}
    </Text>
  </TouchableOpacity>
</ThemedView>

<Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)} accessibilityRole="button">
          <TouchableOpacity style={styles.modalBox} activeOpacity={1}>
            <Text style={[styles.modalTitle, { fontSize: scale(20, 18, 22) }]}>{t('ABOUT_APP_TITLE')}</Text>
            <Text style={[styles.modalText, { fontSize: scale(16, 14, 18) }]}>
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
    zIndex: 10,
  },
  logo: {
    maxWidth: '100%',
  },
  actionContainer: {
    alignItems: 'center',
    gap: 14,
    backgroundColor: 'transparent',
  },
  startButton: {
    backgroundColor: '#345641',
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 142,
  },
  startText: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'Poppins_600SemiBold',
    lineHeight: 26,
    textAlignVertical: 'center',
    textAlign: 'center',
    marginBottom: -2,
  },
  secondaryButton: {
    backgroundColor: '#F8FBF8',
    borderColor: '#345641',
    borderWidth: 2,
    paddingVertical: 11,
    paddingHorizontal: 24,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 124,
  },
  secondaryText: {
    color: '#345641',
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
    lineHeight: 20,
    textAlign: 'center',
  },
  helpIcon: {
    position: 'absolute',
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
    width: '88%',
    maxWidth: 520,
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





import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';
import { LANGUAGE_PREFERENCE_KEY } from '@/lang/i18n';

const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧', accessibilityLabel: 'Change language - English', accessibilityRole: "button"},
  { code: 'no', label: 'Norsk', flag: '🇳🇴', accessibilityLabel: 'Change language - Norwegian', accessibilityRole: "button"},
];

const LanguageSelector = () => {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18next.language);

  const saveLanguage = async (lang) => {
    await AsyncStorage.setItem(LANGUAGE_PREFERENCE_KEY, lang);
    i18next.changeLanguage(lang);
    i18next.reloadResources();
    setSelectedLanguage(lang);
    setModalVisible(false);

    console.log('Språk byttet til:', lang);
  };

  const currentFlag = languages.find((l) => l.code === selectedLanguage)?.flag ?? '🌐';

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.languageToggle} accessibilityRole="button">
  <Text style={styles.languageLabel}>
    {t('LANGUAGE')}{' '} {currentFlag}
  </Text>
</TouchableOpacity>


      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableOpacity style={styles.overlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalBox}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={styles.option}
                onPress={() => saveLanguage(lang.code)}
                accessibilityRole="button"
              >
                <Text style={styles.optionText}>{lang.label}</Text>
                <Text style={styles.optionFlag}>{lang.flag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 80,
    paddingRight: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    width: 220,
    borderWidth: 3,
    borderColor: '#345641',
    borderStyle: 'solid',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
  },
  optionFlag: {
    fontSize: 20,
  },
});

export default LanguageSelector;

  
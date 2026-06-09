import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './en.json';
import no from './no.json';

export const LANGUAGE_PREFERENCE_KEY = 'LANGUAGE_PREFERENCE';

const resources = {
  en,
  no,
};

const getUserPreferredLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_PREFERENCE_KEY);
    if (savedLanguage) return savedLanguage;
  } catch {
    // Bruk enhetsspråk dersom lagret språkvalg ikke kan leses.
  }

  const deviceLanguage = typeof navigator !== 'undefined' ? navigator.language : 'en';
  return deviceLanguage.startsWith('no') ? 'no' : 'en';
};

const initializeI18n = async () => {
  const language = await getUserPreferredLanguage();

  await i18n
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v3',
      lng: language,
      fallbackLng: 'en',
      resources,
      interpolation: {
        escapeValue: false,
      },
    });
};

export default initializeI18n;





/*Kilder
* i18n asyncStorage - https://medium.com/@lasithherath00/implementing-react-native-i18n-and-language-selection-with-asyncstorage-b24ae59e788e
* i18n localize - https://medium.com/@svbala99/building-a-fully-localized-react-native-app-with-i18next-react-i18next-and-react-native-localize-8945cdf5e37b
*/

import { Alert, Linking } from 'react-native';

export async function openExternalLink(url, errorMessage) {
  try {
    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
      Alert.alert(errorMessage);
      return false;
    }

    await Linking.openURL(url);
    return true;
  } catch {
    Alert.alert(errorMessage);
    return false;
  }
}

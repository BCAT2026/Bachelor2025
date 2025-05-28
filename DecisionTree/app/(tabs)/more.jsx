import { StyleSheet, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Header from '@/components/Header';
import { useTranslation } from 'react-i18next';

export default function More() {
  const { t } = useTranslation();

  const infoItems = [
    { number: 1, titleKey: 'MORE_1' },
    { number: 2, titleKey: 'MORE_2' },
    { number: 3, titleKey: 'MORE_3' },
    { number: 4, titleKey: 'MORE_4' },
  ];

  return (
    <ParallaxScrollView>
      {/* TOPP */}
      <Header />
      <ThemedView style={styles.top}>
        <ThemedText type="title" style={styles.title}>{t('MORE_INFO')}</ThemedText>
      </ThemedView>

      {/* MIDT */}
      <View style={styles.middle}>
        {infoItems.map((item) => (
          <View key={item.number} style={styles.row}>
            <View style={styles.numberCircle}>
              <ThemedText style={styles.numberText}>{item.number}</ThemedText>
            </View>
            <ThemedText style={styles.rowText}>{t(item.titleKey)}</ThemedText>
          </View>
        ))}
      </View>

      {/* BUNN */}
      <View style={styles.bottom} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
  },
  middle: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 22,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  numberCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#345641',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  numberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  rowText: {
    fontSize: 16,
    color: '#2E443E',
    flexShrink: 1,
  },
  bottom: {
    height: 20,
  },
});





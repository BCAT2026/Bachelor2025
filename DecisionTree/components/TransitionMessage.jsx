import { StyleSheet, Image, View } from 'react-native';
import { ThemedText } from './ThemedText';
import NextButton from './NextButton';
import ProgressBar from './ProgressBar';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useTranslation } from 'react-i18next';

export default function TransitionMessage({ message, onNext, progress }) {
  const { t } = useTranslation();

  return (
    <ParallaxScrollView noPadding contentContainerStyle={styles.container}>
      {/* TOPP */}
      <View style={styles.top}>
        <Image
          source={require('../assets/images/warning_green.png')}
          style={styles.icon}
          resizeMode="contain"
          accessibilityLabel={t('ALT_GREENICON')}
        />
      </View>

      {/* MIDT */}
      <View style={styles.middle}>
        <ThemedText type="title" style={styles.text}>
          {message}
        </ThemedText>
      </View>

      {/* BUNN */}
        <View style={styles.bottom}>
            <View style={styles.progressWrapper}>
            <ProgressBar
            progress={progress}
            accessibilityRole="progressbar"
            accessibilityValue={{
                min: 0,
                max: 100,
                now: Math.round(progress),
            }}
            />
        </View>

        <View style={styles.buttonWrapper}>
          <NextButton onPress={onNext} text={t('NEXT')} />
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingVertical: 24,
    paddingHorizontal: 10,
  },
  top: {
    alignItems: 'center',
    marginTop: 24,
  },
  middle: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  bottom: {
    paddingBottom: 24,
    paddingHorizontal: 18,
  },
  progressWrapper: {
    width: '100%',
    marginBottom: 24,
  },
  buttonWrapper: {
    alignItems: 'center',
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 24,
    fontFamily: 'Poppins_400Regular',
  },
});




import { StyleSheet, Image, View } from 'react-native';
import { ThemedText } from './ThemedText';
import NextButton from './NextButton';
import ProgressBar from './ProgressBar';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useTranslation } from 'react-i18next';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

export default function TransitionMessage({ message, onNext, progress, buttonText }) {
    const { t } = useTranslation()
    const { scale } = useResponsiveLayout()
    const [title, ...bodyParts] = String(message ?? '').split(/\n\s*\n/)
    const body = bodyParts.join('\n\n')

  return (
    <ParallaxScrollView noPadding>
      <Image
        source={require('../assets/images/warning_green.png')}
        style={[styles.icon, {
          width: scale(80, 60, 92),
          height: scale(80, 60, 92),
        }]}
        resizeMode="contain"
        accessibilityLabel={t('ALT_GREENICON')}
      />

      <ThemedText type="title" style={[styles.title, { fontSize: scale(20, 17, 24) }]}>
        {title}
      </ThemedText>

      {body ? (
        <ThemedText style={[styles.body, { fontSize: scale(17, 15, 19), lineHeight: scale(25, 22, 29) }]}>
          {body}
        </ThemedText>
      ) : null}

      <View style={styles.progressArea}>
        <ProgressBar progress={progress} accessibilityRole="progressbar" accessibilityValue={{min: 0, max: 100, now: progress}}/>
      </View>

      <NextButton onPress={onNext} text={buttonText ?? t('NEXT')} style={styles.nextButton} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 26,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  body: {
    color: '#2E443E',
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  progressArea: {
    height: 30,
    marginTop: 38,
    marginBottom: 28,
  },
  nextButton: {
    marginTop: 12,
  },
  icon: {
    width: 80,
    height: 80,
    marginTop: 24,
    marginBottom: 24,
    alignSelf: 'center',
  },
});

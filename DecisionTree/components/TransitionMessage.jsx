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

      <ThemedText type="title" style={[styles.text, { fontSize: scale(20, 17, 24) }]}>
        {message}
      </ThemedText>

      <View style={{ height: 30, marginBottom: 50, marginTop: 40 }}><ProgressBar progress={progress} accessibilityRole="progressbar" accessibilityValue={{min: 0, max: 100, now: progress}}/></View>

      <NextButton onPress={onNext} text={buttonText ?? t('NEXT')} style={{ marginTop: 32 }} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 24,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 20,
    paddingHorizontal: 24,
  },
  icon: {
    width: 80,
    height: 80,
    marginTop: 24,
    marginBottom: 24,
    alignSelf: 'center',
  },
});

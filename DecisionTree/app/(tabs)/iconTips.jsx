import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import TipsBox from '@/components/TipsBox';
import NextButton from '@/components/NextButton';
import ProgressBar from '@/components/ProgressBar';
import { useTranslation } from 'react-i18next';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Header from '@/components/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ProgressTips() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { reset } = useLocalSearchParams();

  const handleNext = () => {
    router.push({ pathname: '/decisionTreePage', params: { reset } });
  };

  const handleGestureEnd = (event) => {
    const SWIPE_THRESHOLD = 80;
    if (event.translationX > SWIPE_THRESHOLD) {
      router.push({ pathname: '/decisionTreePage', params: { reset } });
    } else if (event.translationX < -SWIPE_THRESHOLD) {
      router.push({ pathname: '/swipeTips', params: { reset } });
    }
  };

  return (
    <PanGestureHandler onEnded={({ nativeEvent }) => handleGestureEnd(nativeEvent)}>
      <View style={[styles.container, { paddingTop: insets.top + 10, paddingBottom: insets.bottom + 20 }]}>
        {/* TOPP */}
        <View style={styles.top}>
          <Header />
        </View>

        {/* MIDT */}
        <View style={styles.middle}>
          <ThemedText style={styles.title}>{t('ICON_SUBTITLE')}</ThemedText>
          <TipsBox
            title="Tips!"
            subtitle={
              <View style={{ width: '100%' }}>
                <ThemedText style={styles.text_tips}>{t('ICON_T1')}</ThemedText>
                <ThemedText style={styles.text_tips}>{t('ICON_T2')}</ThemedText>

                {/* Grønn */}
                <View style={styles.inlineRow}>
                  <Image
                    source={require('@/assets/images/warning_green.png')}
                    style={styles.inlineIcon}
                    resizeMode="contain"
                    accessibilityLabel={t('ALT_GREENICON')}
                  />
                  <View style={styles.descriptionContainer}>
                    <Ionicons name="arrow-forward" size={16} color="#2E443E" style={styles.bulletIcon} />
                    <ThemedText style={styles.text_inline}>{t('GREEN_T')}</ThemedText>
                  </View>
                </View>

                {/* Gul */}
                <View style={styles.inlineRow}>
                  <Image
                    source={require('@/assets/images/warning_yellow.png')}
                    style={styles.inlineIcon}
                    resizeMode="contain"
                    accessibilityLabel={t('ALT_YELLOWICON')}
                  />
                  <View style={styles.descriptionContainer}>
                    <Ionicons name="arrow-forward" size={16} color="#2E443E" style={styles.bulletIcon} />
                    <ThemedText style={styles.text_inline}>{t('YELLOW_T')}</ThemedText>
                  </View>
                </View>

                {/* Rød */}
                <View style={styles.inlineRow}>
                  <Image
                    source={require('@/assets/images/warning_red.png')}
                    style={styles.inlineIcon}
                    resizeMode="contain"
                    accessibilityLabel={t('ALT_REDICON')}
                  />
                  <View style={styles.descriptionContainer}>
                    <Ionicons name="arrow-forward" size={16} color="#2E443E" style={styles.bulletIcon} />
                    <ThemedText style={styles.text_inline}>{t('RED_T')}</ThemedText>
                  </View>
                </View>
              </View>
            }
          />
        </View>

        {/* BUNN */}
        <View style={styles.bottom}>
          <ProgressBar
            progress={0}
            accessibilityRole="progressbar"
            accessibilityValue={{ min: 0, max: 100, now: 0 }}
          />
          <NextButton onPress={handleNext} text={t('NEXT')} accessibilityRole="button" />
        </View>
      </View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  top: {
    width: '100%',
    marginBottom: 8,
  },
  middle: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    gap: 12,
  },
  bottom: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 18,
  },
  title: {
    fontSize: 16,
    color: '#345641',
    fontWeight: '400',
    textAlign: 'center',
  },
  text_tips: {
    fontSize: 16,
    color: '#2E443E',
    lineHeight: 24,
    marginBottom: 6,
    textAlign: 'left',
  },
  inlineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 6,
  },
  inlineIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  descriptionContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  bulletIcon: {
    marginRight: 6,
    marginTop: 3,
  },
  text_inline: {
    fontSize: 16,
    color: '#2E443E',
    lineHeight: 24,
    flexShrink: 1,
    flex: 1,
  },
});








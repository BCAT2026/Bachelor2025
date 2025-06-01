import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import TipsBox from '@/components/TipsBox';
import Header from '@/components/Header';
import SwipeAnimation from '@/components/SwipeAnimation';
import NextButton from '@/components/NextButton';

const { width: screenWidth } = Dimensions.get('window');

export default function SwipeTips() {
  const router = useRouter();
  const { reset } = useLocalSearchParams();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const handleGestureEnd = (event) => {
    const SWIPE_THRESHOLD = 80;
    if (event.translationX > SWIPE_THRESHOLD) {
      router.push({ pathname: '/iconTips', params: { reset } });
    } else if (event.translationX < -SWIPE_THRESHOLD) {
      router.back();
    }
  };

  const handleNext = () => {
    router.push({ pathname: '/iconTips', params: { reset } });
  };

  return (
    <PanGestureHandler onEnded={({ nativeEvent }) => handleGestureEnd(nativeEvent)}>
      <ThemedView style={styles.container}>
        {/* TOPP */}
        <View style={[styles.top, { paddingTop: insets.top || 10 }]}>
          <Header />
        </View>

        {/* MIDT + SCROLL */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.middle}>
            <ThemedText style={styles.title} accessibilityRole="header">
              {t('TITLE_GUIDELINES')}
            </ThemedText>
            <TipsBox subtitle={t('TIP1')} />
            <SwipeAnimation accessibilityLabel={t('ALT_SWIPEHAND')} />
          </View>

          {/* JA / NEI */}
          <View style={styles.buttonContainer}>
            <View
              style={styles.noButton}
              accessibilityRole="button"
              accessibilityLabel={t('NO')}
            >
              <ThemedText style={styles.noButtonText}>{t('NO')}</ThemedText>
            </View>
            <View style={styles.separator} />
            <View
              style={styles.yesButton}
              accessibilityRole="button"
              accessibilityLabel={t('YES')}
              onTouchEnd={handleNext}
            >
              <ThemedText style={styles.yesButtonText}>{t('YES')}</ThemedText>
            </View>
          </View>
        </ScrollView>

        {/* BUNN */}
        <View style={[styles.bottom, { paddingBottom: insets.bottom || 20 }]}>
          <NextButton onPress={handleNext} text={t('NEXT')} accessibilityRole="button" />
        </View>
      </ThemedView>
    </PanGestureHandler>
  );
}

const PRIMARY = '#345641';
const BG = '#fff';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    paddingHorizontal: 22,
  },
  top: {
    width: '100%',
    marginBottom: 8,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  middle: {
    gap: 0,
  },
  title: {
    fontSize: 16,
    color: PRIMARY,
    fontWeight: '500',
    letterSpacing: 0.5,
    marginBottom: 8,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
    marginTop: 0,
    marginBottom: 32,
  },
  noButton: {
    backgroundColor: '#fff',
    borderColor: PRIMARY,
    borderWidth: 2,
    width: screenWidth * 0.28,
    height: screenWidth * 0.28,
    minWidth: 80,
    minHeight: 80,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yesButton: {
    backgroundColor: PRIMARY,
    borderColor: PRIMARY,
    borderWidth: 2,
    width: screenWidth * 0.28,
    height: screenWidth * 0.28,
    minWidth: 80,
    minHeight: 80,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noButtonText: {
    color: PRIMARY,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
  },
  yesButtonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
  },
  separator: {
    width: 2,
    height: 60,
    backgroundColor: PRIMARY,
    borderRadius: 1,
  },
  bottom: {
    alignItems: 'center',
    paddingTop: 8,
  },
});












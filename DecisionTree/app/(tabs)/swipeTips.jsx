import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import TipsBox from '@/components/TipsBox';
import NextButton from '@/components/NextButton';
import Header from '@/components/Header';
import { useTranslation } from 'react-i18next';
import SwipeAnimation from '@/components/SwipeAnimation';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

export default function SwipeTips() {
  const router = useRouter();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { horizontalPadding, contentMaxWidth, scale, isSmallPhone } = useResponsiveLayout();
  const buttonSize = scale(100, 76, 108);

  const handleNext = async () => {
    try {
      await AsyncStorage.setItem('hasSeenSwipeTips', 'true');
      router.push('/iconTips');
    } catch {
      router.push('/iconTips');
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <GestureRecognizer
        onSwipeRight={handleNext}
        onSwipeLeft={() => router.back()}
        config={{ velocityThreshold: 0.3, directionalOffsetThreshold: 80 }}
        style={{ flex: 1 }}
        accessibilityRole="image"
        accessibilityLabel={t('ALT_SWIPEHAND')}
      >
        <ThemedView style={styles.root}>
          <ScrollView
            contentContainerStyle={[
              styles.container,
              {
                paddingTop: insets.top + (isSmallPhone ? 18 : 34),
                paddingHorizontal: horizontalPadding,
              },
            ]}
          >
            <View style={[styles.inner, { maxWidth: contentMaxWidth }]}>
              <Header />
              <ThemedText style={styles.subtitle}>{t('TITLE_GUIDELINES')}</ThemedText>

              <TipsBox subtitle={t('TIP1')} />

              <SwipeAnimation />

              <View style={[styles.buttonContainer, { gap: scale(40, 20, 44) }]}>
            <View
              style={[styles.noButton, {
                width: buttonSize,
                height: buttonSize,
                borderRadius: buttonSize / 2,
              }]}
              accessibilityRole="image"
            >
              <ThemedText style={styles.noButtonText}>{t('NO')}</ThemedText>
            </View>

            <View style={[styles.separator, { height: scale(60, 42, 66) }]} />

            <View
              style={[styles.yesButton, {
                width: buttonSize,
                height: buttonSize,
                borderRadius: buttonSize / 2,
              }]}
              accessibilityRole="image"
            >
              <ThemedText style={styles.yesButtonText}>{t('YES')}</ThemedText>
            </View>
          </View>

              <NextButton onPress={handleNext} text={t('NEXT')} style={styles.nextButton} />
            </View>
          </ScrollView>
        </ThemedView>
      </GestureRecognizer>
    </>
  );
}


const PRIMARY = '#345641';
const BG = '#fff';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG,
  },
  container: {
    flexGrow: 1,
    alignItems: 'flex-start',
    backgroundColor: BG,
    paddingBottom: 32,
  },
  inner: {
    width: '100%',
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: PRIMARY,
    fontWeight: '500',
    letterSpacing: 0.5,
    marginTop: 16,
    marginBottom: 16,
    textAlign: 'center',
    alignSelf: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 0,
    marginBottom: 22,
    alignSelf: 'center',
  },
  
  noButton: {
    backgroundColor: '#fff',
    borderColor: '#345641',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yesButton: {
    backgroundColor: '#345641',
    borderColor: '#345641',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noButtonText: {
    color: '#345641',
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
    backgroundColor: '#345641',
    borderRadius: 1,
    alignSelf: 'center'
  },
  nextButton: {
    marginTop: 4,
  },
});

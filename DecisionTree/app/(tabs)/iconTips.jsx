import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import TipsBox from '@/components/TipsBox';
import NextButton from '@/components/NextButton';
import Header from '@/components/Header';
import ProgressBar from '../../components/ProgressBar';
import { useTranslation } from 'react-i18next';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

export default function ProgressTips() {
  const router = useRouter();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { horizontalPadding, contentMaxWidth, scale, isSmallPhone } = useResponsiveLayout();

  const handleNext = () => {
    router.push({ pathname: '/decisionTreePage', params: { reset: 'true' } });
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <GestureRecognizer
        onSwipeRight={handleNext}
        onSwipeLeft={() => router.back()}
        config={{ velocityThreshold: 0.3, directionalOffsetThreshold: 80 }}
        style={{ flex: 1 }}
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
          {/* TOPP */}
          <View style={styles.topArea}>
            <Header />
            <View style={styles.stepIntro}>
              <View style={[
                styles.stepCircle,
                {
                  width: scale(34, 30, 40),
                  height: scale(34, 30, 40),
                  borderRadius: scale(34, 30, 40) / 2,
                },
              ]}>
                <ThemedText style={styles.stepCircleText}>1</ThemedText>
              </View>
              <ThemedText style={styles.stepIntroText}>
                {t('TITLE_GUIDELINES')} - {t('OF')} 8
              </ThemedText>
            </View>
          </View>

          {/* MIDT */}
          <View style={styles.middleArea}>
            <TipsBox
              title="Tips!"
              subtitle={
                <View style={{ width: '100%' }}>
                  <ThemedText style={styles.text_tips}>{t('ICON_T1')}</ThemedText>
                  <ThemedText style={styles.text_tips}>{t('ICON_T2')}</ThemedText>

                  {/* Grønt */}
                  <View style={styles.inlineRow}>
                    <Image
                      source={require('@/assets/images/warning_green.png')}
                      style={[styles.inlineIcon, {
                        width: scale(50, 38, 56),
                        height: scale(50, 38, 56),
                      }]}
                      resizeMode="contain"
                      accessibilityLabel={t('ALT_GREENICON')}
                    />
                    <View style={styles.textContainer}>
                      <ThemedText style={styles.text_inline}>{t('GREEN_T')}</ThemedText>
                    </View>
                  </View>

                  {/* Gult */}
                  <View style={styles.inlineRow}>
                    <Image
                      source={require('@/assets/images/warning_yellow.png')}
                      style={[styles.inlineIcon, {
                        width: scale(50, 38, 56),
                        height: scale(50, 38, 56),
                      }]}
                      resizeMode="contain"
                      accessibilityLabel={t('ALT_YELLOWICON')}
                      accessibilityRole='image'
                    />
                    <View style={styles.textContainer}>
                      <ThemedText style={styles.text_inline}>{t('YELLOW_T')}</ThemedText>
                    </View>
                  </View>

                  {/* Rødt */}
                  <View style={styles.inlineRow}>
                    <Image
                      source={require('@/assets/images/warning_red.png')}
                      style={[styles.inlineIcon, {
                        width: scale(50, 38, 56),
                        height: scale(50, 38, 56),
                      }]}
                      resizeMode="contain"
                      accessibilityLabel={t('ALT_REDICON')}
                      accessibilityRole='image'
                    />
                    <View style={styles.textContainer}>
                      <ThemedText style={styles.text_inline}>{t('RED_T')}</ThemedText>
                    </View>
                  </View>
                </View>
              }
            />

            {/* PROGRESSBAR */}
            <View style={styles.progressBarContainer}>
              <ProgressBar progress={0} inline accessibilityRole='progressbar'/>
            </View>
          </View>

          {/* BUNN */}
          <View style={styles.bottomArea}>
            <NextButton onPress={handleNext} text={t('NEXT')} accessibilityRole='button'/>
          </View>
          </View>
          </ScrollView>
        </ThemedView>
      </GestureRecognizer>
    </>
  );
}


const PRIMARY = '#345641';
const BG = '#fff';
const STEP_ONE_COLOR = 'rgb(167, 200, 176)';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG,
  },
  container: {
    flexGrow: 1,
    backgroundColor: BG,
    paddingBottom: 24,
  },
  inner: {
    width: '100%',
    alignSelf: 'center',
  },
  topArea: {
    width: '100%',
    marginBottom: 10,
  },
  middleArea: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
  },
  stepIntro: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 14,
    marginBottom: 18,
    width: '100%',
  },
  stepCircle: {
    backgroundColor: 'white',
    borderWidth: 4,
    borderColor: STEP_ONE_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  stepCircleText: {
    color: PRIMARY,
    fontSize: 15,
    lineHeight: 18,
    fontFamily: 'Poppins_600SemiBold',
  },
  stepIntroText: {
    fontSize: 16,
    color: PRIMARY,
    fontWeight: '400',
    textAlign: 'center',
    flexShrink: 1,
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
    alignItems: 'center',
    width: '100%',
    marginBottom: 6,
  },
  inlineIcon: {
    marginRight: 10,
    flexShrink: 0,
  },
  textContainer: {
    flex: 1,
  },
  text_inline: {
    fontSize: 16,
    color: '#2E443E',
    lineHeight: 24,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  progressBarContainer: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  bottomArea: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
});



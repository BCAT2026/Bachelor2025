import React, { useEffect, useRef } from 'react';
import { Animated, PanResponder, StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useTranslation } from 'react-i18next';
import ProgressBar from './ProgressBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import MarkdownLinkText from './MarkdownLinkText';

const progressBarHeight = 30;
const lightGreen = [167, 200, 176];
const darkGreen = [26, 49, 38];

const getStepColor = (stepNumber) => {
  const index = Math.min(Math.max((stepNumber ?? 1) - 1, 0), 7);
  const r = Math.round(lightGreen[0] - (index * (lightGreen[0] - darkGreen[0]) / 7));
  const g = Math.round(lightGreen[1] - (index * (lightGreen[1] - darkGreen[1]) / 7));
  const b = Math.round(lightGreen[2] - (index * (lightGreen[2] - darkGreen[2]) / 7));

  return `rgb(${r}, ${g}, ${b})`;
};

const Questions = ({ stepTitle, stepNumber, totalSteps, question, onAnswer, progress }) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { width, height, isSmallPhone, scale } = useResponsiveLayout();
  const buttonSize = scale(100, 76, 112);
  const separatorHeight = scale(60, 42, 68);
  const stepCircleSize = scale(36, 30, 42);
  const stepColor = getStepColor(stepNumber);
  const bottomSpace = insets.bottom + progressBarHeight + (isSmallPhone ? 34 : 54);
  const swipeX = useRef(new Animated.Value(0)).current;
  const swipeThreshold = Math.min(Math.max(width * 0.24, 78), 120);
  const hasAnsweredRef = useRef(false);

  useEffect(() => {
    hasAnsweredRef.current = false;
    swipeX.setValue(0);
  }, [question, swipeX]);

  const answerWithSwipe = (answer) => {
    if (hasAnsweredRef.current) return;
    hasAnsweredRef.current = true;

    Animated.timing(swipeX, {
      toValue: answer ? width : -width,
      duration: 180,
      useNativeDriver: true,
    }).start(() => {
      swipeX.setValue(0);
      onAnswer(answer);
    });
  };

  const resetCardPosition = () => {
    Animated.spring(swipeX, {
      toValue: 0,
      friction: 6,
      tension: 80,
      useNativeDriver: true,
    }).start();
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => false,
    onMoveShouldSetPanResponder: (_, gestureState) =>
      Math.abs(gestureState.dx) > 8 && Math.abs(gestureState.dx) > Math.abs(gestureState.dy) * 1.1,
    onPanResponderTerminationRequest: () => false,
    onPanResponderMove: (_, gestureState) => {
      if (hasAnsweredRef.current) return;
      swipeX.setValue(gestureState.dx);
    },
    onPanResponderRelease: (_, gestureState) => {
      if (hasAnsweredRef.current) return;

      if (gestureState.dx > swipeThreshold) {
        answerWithSwipe(true);
        return;
      }

      if (gestureState.dx < -swipeThreshold) {
        answerWithSwipe(false);
        return;
      }

      resetCardPosition();
    },
    onPanResponderTerminate: () => {
      if (!hasAnsweredRef.current) {
        resetCardPosition();
      }
    },
    onShouldBlockNativeResponder: () => true,
  });

  const cardRotation = swipeX.interpolate({
    inputRange: [-width, 0, width],
    outputRange: ['-9deg', '0deg', '9deg'],
    extrapolate: 'clamp',
  });
  const yesOpacity = swipeX.interpolate({
    inputRange: [4, Math.min(swipeThreshold, 34)],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const noOpacity = swipeX.interpolate({
    inputRange: [-Math.min(swipeThreshold, 34), -4],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <>
      <View style={[styles.container, { minHeight: height * 0.62 }]}>
        <View style={[styles.questionContent, { paddingTop: scale(10, 8, 18) }]}>
          <View style={styles.stepHeader}>
            <View style={styles.stepMetaRow}>
              <View style={[
                styles.stepCircle,
                {
                  width: stepCircleSize,
                  height: stepCircleSize,
                  borderRadius: stepCircleSize / 2,
                  borderColor: stepColor,
                },
              ]}>
                <ThemedText style={[styles.stepCircleText, { fontSize: scale(16, 14, 18) }]}>
                  {stepNumber}
                </ThemedText>
              </View>
              <ThemedText style={[styles.stepTotal, { fontSize: scale(14, 13, 16) }]}>
                {t('OF')} {totalSteps}
              </ThemedText>
            </View>
            <ThemedText style={[styles.title, { fontSize: scale(17, 15, 20) }]}>
              {stepTitle}
            </ThemedText>
          </View>

          <View style={[styles.cardStage, { marginTop: scale(18, 14, 22) }]}>
            <Animated.View style={[styles.swipeBadge, styles.noSwipeBadge, { opacity: noOpacity }]}>
              <ThemedText style={styles.noSwipeText}>{t('NO')}</ThemedText>
            </Animated.View>
            <Animated.View style={[styles.swipeBadge, styles.yesSwipeBadge, { opacity: yesOpacity }]}>
              <ThemedText style={styles.yesSwipeText}>{t('YES')}</ThemedText>
            </Animated.View>

            <Animated.View
              style={[
                styles.questionCard,
                {
                  minHeight: scale(178, 148, 218),
                  transform: [
                    { translateX: swipeX },
                    { rotate: cardRotation },
                  ],
                },
              ]}
              {...panResponder.panHandlers}
            >
              <MarkdownLinkText
                text={question}
                style={[styles.question, { fontSize: scale(17, 15, 19), lineHeight: scale(25, 22, 29) }]}
              />
            </Animated.View>
          </View>
        </View>

        <View style={[styles.buttonContainer, {
          marginTop: scale(18, 14, 26),
          marginBottom: bottomSpace,
          gap: scale(40, 20, 48),
        }]}>
          <TouchableOpacity
            style={[styles.noButton, {
              width: buttonSize,
              height: buttonSize,
              borderRadius: buttonSize / 2,
            }]}
            onPress={() => onAnswer(false)}
            activeOpacity={0.78}
            hitSlop={12}
            accessibilityRole="button"
          >
            <ThemedText style={[styles.noButtonText, { fontSize: scale(20, 17, 22) }]}>
              {t('NO')}
            </ThemedText>
          </TouchableOpacity>

          <View style={[styles.separator, { height: separatorHeight }]} />

          <TouchableOpacity
            style={[styles.yesButton, {
              width: buttonSize,
              height: buttonSize,
              borderRadius: buttonSize / 2,
            }]}
            onPress={() => onAnswer(true)}
            activeOpacity={0.78}
            hitSlop={12}
            accessibilityRole="button"
          >
            <ThemedText style={[styles.yesButtonText, { fontSize: scale(20, 17, 22) }]}>
              {t('YES')}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
      <ProgressBar progress={progress} bottomInset={insets.bottom} accessibilityRole="progressbar" accessibilityValue={{min: 0, max: 100, now: progress}}/>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  questionContent: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  cardStage: {
    width: '100%',
    overflow: 'visible',
  },
  questionCard: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D3DED8',
    borderRadius: 8,
    backgroundColor: '#F8FBF8',
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  swipeBadge: {
    position: 'absolute',
    top: -14,
    borderWidth: 2,
    borderRadius: 18,
    paddingVertical: 4,
    paddingHorizontal: 12,
    zIndex: 3,
  },
  noSwipeBadge: {
    left: 12,
    borderColor: '#345641',
    backgroundColor: '#FFFFFF',
  },
  yesSwipeBadge: {
    right: 12,
    borderColor: '#345641',
    backgroundColor: '#345641',
  },
  noSwipeText: {
    color: '#345641',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 13,
    lineHeight: 17,
  },
  yesSwipeText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 13,
    lineHeight: 17,
  },
  stepHeader: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  stepMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  stepCircle: {
    backgroundColor: 'white',
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  stepCircleText: {
    color: '#345641',
    lineHeight: 20,
    fontFamily: 'Poppins_600SemiBold',
  },
  stepTotal: {
    color: '#345641',
    lineHeight: 19,
    fontFamily: 'Poppins_400Regular',
  },
  title: {
    flexShrink: 1,
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: '100%',
  },
  question: {
    marginVertical: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noButton: {
    backgroundColor: '#F8FBF8',
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
    textAlign: 'center',
    fontFamily: 'Poppins_600SemiBold',
  },
  yesButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Poppins_600SemiBold',
  },
  separator: {
    width: 2,
    backgroundColor: '#A8C6AD',
    borderRadius: 1,
  },
});

export default Questions;

import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
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
  const { height, isSmallPhone, scale } = useResponsiveLayout();
  const buttonSize = scale(100, 76, 112);
  const separatorHeight = scale(60, 42, 68);
  const stepCircleSize = scale(36, 30, 42);
  const stepColor = getStepColor(stepNumber);
  const bottomSpace = insets.bottom + progressBarHeight + (isSmallPhone ? 34 : 54);

  return (
    <>
      <View style={[styles.container, { minHeight: height * 0.62 }]}>
        <View style={[styles.questionContent, { paddingTop: scale(10, 8, 18) }]}>
          <View style={styles.stepHeader}>
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
            <ThemedText style={[styles.title, { fontSize: scale(17, 15, 20) }]}>
              {stepTitle}
            </ThemedText>
          </View>
          <MarkdownLinkText
            text={question}
            style={[styles.question, { fontSize: scale(17, 15, 19), lineHeight: scale(25, 22, 29) }]}
          />
        </View>

        <View style={[styles.buttonContainer, { marginBottom: bottomSpace, gap: scale(40, 20, 48) }]}>
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
  stepHeader: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
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
    marginBottom: 2,
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
    backgroundColor: '#345641',
    borderRadius: 1,
  },
});

export default Questions;

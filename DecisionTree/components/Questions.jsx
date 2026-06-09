import React from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useTranslation } from 'react-i18next';
import ProgressBar from './ProgressBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height } = Dimensions.get('window');
const progressBarHeight = 30;
const progressBarBottom = height * 0.05;

const Questions = ({ stepTitle, stepNumber, totalSteps, question, onAnswer, progress }) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.questionContent}>
          <ThemedText style={styles.title}>{stepTitle}</ThemedText>
          <ThemedText style={styles.subtitle}>{stepNumber} {t('OF')} {totalSteps}</ThemedText>
          <ThemedText style={styles.question}>{question}</ThemedText>
        </View>

        <View style={[styles.buttonContainer, { marginBottom: insets.bottom + progressBarBottom + progressBarHeight }]}>
          <TouchableOpacity
            style={styles.noButton}
            onPress={() => onAnswer(false)}
            hitSlop={12}
            accessibilityRole="button"
          >
            <ThemedText style={styles.noButtonText}>{t('NO')}</ThemedText>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity
            style={styles.yesButton}
            onPress={() => onAnswer(true)}
            hitSlop={12}
            accessibilityRole="button"
          >
            <ThemedText style={styles.yesButtonText}>{t('YES')}</ThemedText>
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
    minHeight: height * 0.7,
  },
  questionContent: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
    maxWidth: '95%',
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 8,
  },
  question: {
    fontSize: 18,
    marginVertical: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noButton: {
    backgroundColor: '#fff',
    borderColor: '#345641',
    borderWidth: 2,
    width: 100,
    height: 100,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yesButton: {
    backgroundColor: '#345641',
    borderColor: '#345641',
    borderWidth: 2,
    width: 100,
    height: 100,
    borderRadius: 60,
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
    height: 60,
    backgroundColor: '#345641',
    borderRadius: 1,
  },
});

export default Questions;

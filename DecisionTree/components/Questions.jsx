import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useTranslation } from 'react-i18next';
import ProgressBar from './ProgressBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Markdown from 'react-native-markdown-display';
import { useRouter } from 'expo-router';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

const Questions = ({ stepTitle, stepNumber, totalSteps, question, onAnswer, progress }) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: 1 - Math.abs(translateX.value / SCREEN_WIDTH),
  }));

  const animateOutAndAnswer = (isYes) => {
    const direction = isYes ? 1 : -1;
    translateX.value = withTiming(direction * SCREEN_WIDTH, { duration: 250 }, () => {
      runOnJS(onAnswer)(isYes);
      translateX.value = -direction * SCREEN_WIDTH;
      translateX.value = withTiming(0, { duration: 250 });
    });
  };

  const handleGestureEnd = (event) => {
    if (event.translationX > SWIPE_THRESHOLD) {
      animateOutAndAnswer(true);
    } else if (event.translationX < -SWIPE_THRESHOLD) {
      animateOutAndAnswer(false);
    } else {
      translateX.value = withTiming(0);
    }
  };

  const handleButtonPress = (isYes) => {
    animateOutAndAnswer(isYes);
  };

  const handleLinkPress = (url) => {
    if (url.startsWith('pdf:')) {
      const filename = url.replace('pdf:', '');
      router.push({ pathname: '/pdfView', params: { filename } });
      return false;
    }
    return true;
  };

  const isPlainText = !question?.includes('[') && !question?.includes(']') && !question?.includes('(');

  useEffect(() => {
    translateX.value = withTiming(0);
  }, [question]);

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 20 }]}>
      {/* Toppdel: steginfo */}
      <View style={styles.top}>
        <ThemedText style={styles.title}>{stepTitle}</ThemedText>
        <ThemedText style={styles.subtitle}>
          {stepNumber} {t('OF')} {totalSteps}
        </ThemedText>
      </View>

      {/* Midtdel: swipekort */}
      <View style={styles.middle}>
        <PanGestureHandler
          onGestureEvent={({ nativeEvent }) => {
            translateX.value = nativeEvent.translationX;
          }}
          onEnded={({ nativeEvent }) => handleGestureEnd(nativeEvent)}
        >
          <Animated.View style={[styles.card, animatedStyle]}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
              {isPlainText ? (
                <ThemedText style={styles.plainQuestion}>
                  {question || t('MISSING_QUESTION')}
                </ThemedText>
              ) : (
                <Markdown
                  onLinkPress={handleLinkPress}
                  style={{
                    body: { fontSize: 18, textAlign: 'center', color: '#345641' },
                    paragraph: { textAlign: 'center' },
                    link: { color: '#345641', textDecorationLine: 'underline' },
                  }}
                >
                  {question || t('MISSING_QUESTION')}
                </Markdown>
              )}
            </ScrollView>
          </Animated.View>
        </PanGestureHandler>

        {/* Knapper */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.noButton}
            onPress={() => handleButtonPress(false)}
            accessibilityRole="button"
          >
            <ThemedText style={styles.noButtonText}>{t('NO')}</ThemedText>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity
            style={styles.yesButton}
            onPress={() => handleButtonPress(true)}
            accessibilityRole="button"
          >
            <ThemedText style={styles.yesButtonText}>{t('YES')}</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Progressbar */}
      <View style={[styles.bottom, { paddingBottom: insets.bottom || 20 }]}>
        <ProgressBar
          progress={progress}
          accessibilityRole="progressbar"
          accessibilityValue={{ min: 0, max: 100, now: progress }}
        />
      </View>
    </View>
  );
};

const BUTTON_SIZE = SCREEN_WIDTH * 0.28;
const MIN_BUTTON_SIZE = 80;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  top: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginTop: 4,
  },
  middle: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    paddingVertical: 24,
    paddingHorizontal: 10,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    flex: 1,
    width: '100%',
    alignSelf: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  plainQuestion: {
    fontSize: 18,
    textAlign: 'center',
    color: '#345641',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
    marginTop: 30,
    marginBottom: 10,
  },
  noButton: {
    backgroundColor: '#fff',
    borderColor: '#345641',
    borderWidth: 2,
    width: Math.max(BUTTON_SIZE, MIN_BUTTON_SIZE),
    height: Math.max(BUTTON_SIZE, MIN_BUTTON_SIZE),
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yesButton: {
    backgroundColor: '#345641',
    borderColor: '#345641',
    borderWidth: 2,
    width: Math.max(BUTTON_SIZE, MIN_BUTTON_SIZE),
    height: Math.max(BUTTON_SIZE, MIN_BUTTON_SIZE),
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
  bottom: {
    marginTop: 10,
    alignItems: 'center',
  },
});

export default Questions;












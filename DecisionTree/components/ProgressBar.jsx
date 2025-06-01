import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const progressBarHeight = 30;

const lightGreen = [167, 200, 176];
const darkGreen = [26, 49, 38];

const generateShades = (steps = 8) => {
  return Array.from({ length: steps }, (_, index) => {
    const r = Math.round(lightGreen[0] - (index * (lightGreen[0] - darkGreen[0]) / (steps - 1)));
    const g = Math.round(lightGreen[1] - (index * (lightGreen[1] - darkGreen[1]) / (steps - 1)));
    const b = Math.round(lightGreen[2] - (index * (lightGreen[2] - darkGreen[2]) / (steps - 1)));
    return `rgb(${r}, ${g}, ${b})`;
  });
};

const stepQuestionCounts = [8, 6, 3, 6, 2, 2, 3, 4];

const getStepProgress = (answeredCount) => {
  let totalAnswered = 0;
  let progressSegments = [];

  for (let i = 0; i < stepQuestionCounts.length; i++) {
    const stepTotal = stepQuestionCounts[i];
    const remaining = answeredCount - totalAnswered;

    if (remaining <= 0) {
      progressSegments.push(0);
    } else if (remaining >= stepTotal) {
      progressSegments.push(1);
    } else {
      progressSegments.push(remaining / stepTotal);
    }

    totalAnswered += stepTotal;
  }

  return progressSegments;
};

const ProgressBar = ({ progress = 0, accessibilityRole, accessibilityValue }) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  const totalQuestions = 34;
  const answeredCount = Math.round((clampedProgress / 100) * totalQuestions);
  const segmentProgress = getStepProgress(answeredCount);
  const shades = generateShades(8);

  return (
    <View
      style={styles.container}
      accessibilityRole={accessibilityRole}
      accessibilityValue={accessibilityValue}
    >
      <View style={styles.barBackground}>
        <View style={styles.shadeContainer}>
          {shades.map((color, index) => {
            const fillPercent = segmentProgress[index] * 100;

            const isLast = index === shades.length - 1;
            const borderRadius = {
              borderTopLeftRadius: index === 0 ? 15 : 0,
              borderBottomLeftRadius: index === 0 ? 15 : 0,
              borderTopRightRadius: isLast && fillPercent === 100 ? 15 : 0,
              borderBottomRightRadius: isLast && fillPercent === 100 ? 15 : 0,
            };

            return (
              <View key={index} style={[styles.stepBlock, borderRadius]}>
                <View
                  style={{
                    width: `${fillPercent}%`,
                    height: '100%',
                    backgroundColor: color,
                    ...borderRadius,
                  }}
                />
              </View>
            );
          })}
        </View>
        <Text style={styles.progressText}>{clampedProgress}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: progressBarHeight,
    alignSelf: 'stretch',
  },
  barBackground: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    backgroundColor: '#E5ECE5',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#3C5538',
  },
  shadeContainer: {
    flexDirection: 'row',
    height: '100%',
  },
  stepBlock: {
    flex: 1,
    backgroundColor: '#E5ECE5',
    overflow: 'hidden',
    marginHorizontal: 0.5,
  },
  progressText: {
    position: 'absolute',
    alignSelf: 'center',
    color: '#3C5538',
    fontWeight: 'bold',
    paddingHorizontal: 4,
    paddingVertical: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
  },
});

export default ProgressBar;



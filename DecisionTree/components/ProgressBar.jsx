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

const ProgressBar = ({ progress, totalSteps = 8, accessibilityRole, accessibilityValue }) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  const segmentWidth = 100 / totalSteps;
  const shades = generateShades(totalSteps);

  return (
    <View
      style={styles.container}
      accessibilityRole={accessibilityRole}
      accessibilityValue={accessibilityValue}
    >
      <View style={styles.barBackground}>
        <View style={styles.shadeContainer}>
          {shades.map((color, index) => {
            const segmentStart = index * segmentWidth;
            const segmentEnd = segmentStart + segmentWidth;
            const fill = Math.max(0, Math.min(clampedProgress - segmentStart, segmentWidth));
            const fillPercent = (fill / segmentWidth) * 100;
            const isLast = index === totalSteps - 1;
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


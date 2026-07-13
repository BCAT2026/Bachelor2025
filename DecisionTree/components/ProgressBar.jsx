import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';

const progressBarHeight = 30

const ProgressBar = ({ progress, bottomInset, inline = false }) => {
  const { width, height } = useWindowDimensions();
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  const horizontalOffset = Math.min(Math.max(width * 0.06, 16), 32);

  if (inline) {
    return (
      <View style={styles.inlineContainer}>
        <View style={styles.barBackground}>
          <View style={[styles.barFill, { width: `${clampedProgress}%` }]} />
          <Text style={styles.progressText}>{clampedProgress}%</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={[
      styles.container,
      {
        bottom: (bottomInset ?? 0) + Math.min(Math.max(height * 0.04, 20), 44),
        left: horizontalOffset,
        right: horizontalOffset,
      },
    ]}>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${clampedProgress}%` }]} />
        <Text style={styles.progressText}>{clampedProgress}%</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: progressBarHeight,
    alignItems: 'center',
    marginBottom: 3,
  },
  inlineContainer: {
    height: progressBarHeight,
    width: '100%',
    alignItems: 'center',
  },
  barBackground: {
    flex: 1,
    width: '85%',
    borderRadius: 15,
    backgroundColor: '#E5ECE5',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#3C5538',
  },
  barFill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#A8C6AD',
    borderRadius: 15,
  },
  progressText: {
    textAlign: 'center',
    color: '#1A3126',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 13,
    lineHeight: 17,
  },
});

export default ProgressBar;

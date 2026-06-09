import React from 'react';
import { Platform, Image, StyleSheet } from 'react-native';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

export default function SwipeAnimation() {
  const { scale } = useResponsiveLayout();
  const mediaSize = scale(140, 96, 170);

  if (Platform.OS === 'web') {
    return (
      <Image
        source={require('../assets/images/swipe-left.gif')}
        style={[styles.media, { width: mediaSize, height: mediaSize }]}
        resizeMode="contain"
      />
    );
  }

  const { Video } = require('expo-av');

  return (
    <Video
      source={require('../assets/images/swipe-left.mp4')}
      shouldPlay
      isLooping
      isMuted
      resizeMode="contain"
      style={[styles.media, { width: mediaSize, height: mediaSize }]}
    />
  );
}

const styles = StyleSheet.create({
  media: {
    marginVertical: 22,
    alignSelf: 'center'
  },
});

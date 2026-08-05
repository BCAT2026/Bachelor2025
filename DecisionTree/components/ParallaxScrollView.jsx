import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ParallaxScrollView({
  children,
  noPadding = false,
  hideBack = false,
  scrollEnabled = true,
  bottomPaddingExtra = 96,
}) {
  const { horizontalPadding, contentMaxWidth } = useResponsiveLayout();
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, 12) + bottomPaddingExtra;
  const contentStyle = noPadding
    ? styles.noPadding
    : [styles.content, { paddingHorizontal: horizontalPadding }];

  return (
    <ThemedView style={styles.root}>
      <View style={[styles.safeArea, { height: insets.top }]} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[contentStyle, styles.scrollContent, { paddingBottom: bottomPadding }]}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={scrollEnabled}
        alwaysBounceVertical={scrollEnabled}
        bounces={scrollEnabled}
      >
        <View style={[styles.inner, { maxWidth: contentMaxWidth }]}>
          {children}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    backgroundColor: '#fff',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  inner: {
    width: '100%',
    alignSelf: 'center',
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  content: {
    paddingVertical: 24,
    gap: 16,
    alignItems: 'stretch',
  },
  noPadding: {
    paddingHorizontal: 0,
  }
});

/* Kilder
* Statusbar - https://reactnative.dev/docs/statusbar
* Optional Props - https://www.dhiwise.com/post/how-react-optional-props-can-improve-the-maintainability
* ScrollView - https://reactnative.dev/docs/scrollview
* paddingTop: Platform.OS osv. - https://stackoverflow.com/questions/64926356/paddingtop-platform-os-android-statusbar-currentheight-0 
*/


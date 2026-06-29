import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export function useResponsiveLayout() {
  const { width, height } = useWindowDimensions();

  return useMemo(() => {
    const shortestSide = Math.min(width, height);
    const isTablet = shortestSide >= 768;
    const horizontalPadding = clamp(width * 0.06, 16, isTablet ? 56 : 32);

    return {
      width,
      height,
      shortestSide,
      isSmallPhone: width < 360 || height < 680,
      isTablet,
      horizontalPadding,
      contentMaxWidth: isTablet ? 720 : 520,
      scale: (size, min = size * 0.85, max = size * 1.2) =>
        clamp(size * (shortestSide / 390), min, max),
      clamp,
    };
  }, [width, height]);
}

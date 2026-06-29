import { Text, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

/**
 * @param {{
 *   style?: import('react-native').StyleProp<import('react-native').TextStyle>;
 *   lightColor?: string;
 *   darkColor?: string;
 *   type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
 * } & import('react-native').TextProps} props
 */
export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Poppins_400Regular',
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Poppins_600SemiBold',
  },
  title: {
    fontSize: 32,
    lineHeight: 32,
    fontFamily: 'Poppins_700Bold',
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#345641',
    fontFamily: 'Poppins_400Regular',
  },
});



import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ExitButton({ onPress = () => {}, text = 'Avslutt' }) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.78}
      accessibilityRole="button"
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#AF0012',
    borderRadius: 50,
    alignSelf: 'center',
    paddingVertical: 13,
    paddingHorizontal: 28,
    marginBottom: 10,
    minWidth: 112,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 23,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: -2,
  },
});

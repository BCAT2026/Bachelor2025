import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function NextButton({ onPress = () => {}, text = 'Neste', feedbackType, style }) {
  const isRed = feedbackType === 'red';

  return (
    <TouchableOpacity
      style={[styles.button, isRed && styles.buttonRed, style]}
      onPress={onPress}
      activeOpacity={0.78}
      accessibilityRole="button"
    >
      <Text style={[styles.text, isRed && styles.textRed]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    borderColor: '#345641',
    borderWidth: 2,
    borderRadius: 50,
    alignSelf: 'center',
    paddingVertical: 13,
    paddingHorizontal: 28,
    marginBottom: 5,
    minWidth: 112,
    maxWidth: '100%',
    alignItems: 'center',
  },
  buttonRed: {
    borderColor: '#AF0012',
  },
  text: {
    color: '#345641',
    fontSize: 18,
    lineHeight: 23,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: -2,
  },
  textRed: {
    color: '#AF0012',
  },
});



/* Kilder
 * TouchableOpacity - https://reactnative.dev/docs/touchableopacity
 * alignSelf - https://reactnative.dev/docs/layout-props 
*/


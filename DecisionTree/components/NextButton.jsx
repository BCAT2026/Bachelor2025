import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function NextButton({ onPress = () => {}, text = 'Neste', feedbackType }) {
  const isRed = feedbackType === 'red';

  return (
    <TouchableOpacity
      style={[styles.button, isRed && styles.buttonRed]}
      onPress={onPress}
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
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonRed: {
    borderColor: '#AF0012',
  },
  text: {
    color: '#345641',
    fontSize: 20,
    fontFamily: 'Poppins_400Regular',
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


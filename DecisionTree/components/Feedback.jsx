import { StyleSheet, Image, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'expo-router'
import { ThemedText } from './ThemedText'
import NextButton from './NextButton'
import ExitButton from './ExitButton'
import ParallaxScrollView from './ParallaxScrollView'

export default function Feedback({ feedbackType = 'green', message = '', onNext }) {
  const { t } = useTranslation()
  const router = useRouter()

  const feedbackMap = {
    red: {
      color: '#AF0012',
      icon: require('../assets/images/warning_red.png'),
      accessibilityLabel: t('ALT_REDICON'),
    },
    yellow: {
      color: '#ECB01F',
      icon: require('../assets/images/warning_yellow.png'),
      accessibilityLabel: t('ALT_YELLOWICON'),
    },
    green: {
      color: null,
      icon: null,
      accessibilityLabel: null,
    },
  }

  const { color, icon, accessibilityLabel } = feedbackMap[feedbackType]
  const showFeedback = feedbackType !== 'green'
  const isRed = feedbackType === 'red'

  const title = t(`FEEDBACK_TITLE.${feedbackType}`)
  const finalMessage = message || t('DEFAULT_FEEDBACK_MESSAGE')

  const handlePress = () => {
    onNext()
  }

  return (
    <ParallaxScrollView noPadding>
      <View style={styles.container}>

        {/* TOPP */}
        {showFeedback && (
          <View style={styles.top}>
            <View style={styles.lineWrapper}>
              <View style={[styles.curvedLine, { backgroundColor: color }]} />
              <Image source={icon} style={styles.icon} accessibilityLabel={accessibilityLabel} />
            </View>
          </View>
        )}

        {/* MIDT */}
        <View style={styles.middle}>
          {showFeedback && (
            <>
              <ThemedText type="title" style={styles.title}>
                {title}
              </ThemedText>
              <View style={styles.textWrapper}>
                <ThemedText type="default" style={styles.text}>
                  {finalMessage}
                </ThemedText>
              </View>
            </>
          )}
        </View>

        {/* BUNN */}
        <View style={styles.bottom}>
          <NextButton
            onPress={handlePress}
            text={t('NEXT')}
            feedbackType={feedbackType}
          />

          {isRed && (
            <View style={{ marginTop: 16 }}>
              <ExitButton
                onPress={() => router.replace({ pathname: '/', params: { reset: 'true' } })}
                text={t('EXIT')}
              />
            </View>
          )}
        </View>
        
      </View>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  top: {
    marginTop: 80,
    marginBottom: 40,
    alignItems: 'center',
  },
  lineWrapper: {
    position: 'relative',
    width: '100%',
  },
  curvedLine: {
    width: '100%',
    height: 10,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -7 },
    shadowRadius: 5,
    elevation: 4,
  },
  icon: {
    position: 'absolute',
    right: 24,
    top: -28,
    width: 65,
    height: 65,
    resizeMode: 'contain',
  },
  middle: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
    marginBottom: 16,
  },
  textWrapper: {
    width: '100%',
    maxWidth: '95%',
    alignSelf: 'center',
  },
  text: {
    textAlign: 'left',
    marginBottom: 40,
    fontSize: 16,
  },
  bottom: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
})


import { StyleSheet, Image, Platform, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'expo-router'
import { ThemedText } from './ThemedText'
import NextButton from './NextButton'
import ExitButton from './ExitButton'
import ParallaxScrollView from './ParallaxScrollView'
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout'
import MarkdownLinkText from './MarkdownLinkText'

export default function Feedback({ feedbackType = 'green', message = '', onNext, onExit }) {
  const { t } = useTranslation()
  const router = useRouter()
  const { scale } = useResponsiveLayout()

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

  const handleExit = async () => {
    await onExit?.()
    router.replace({ pathname: '/', params: { reset: 'true' } })
  }

  return (
    <ParallaxScrollView noPadding>
      {showFeedback && (
        <View style={styles.lineWrapper}>
          <View style={[styles.curvedLine, { backgroundColor: color }]} />
          <Image
            source={icon}
            style={[styles.icon, {
              width: scale(65, 50, 76),
              height: scale(65, 50, 76),
            }]}
          />
        </View>
      )}

      <View style={styles.scrollContent}>
        {showFeedback && (
          <>
            <ThemedText type="title" style={[styles.title, { fontSize: scale(24, 20, 28) }]}>
              {title}
            </ThemedText>

            <View style={styles.textWrapper}>
              <MarkdownLinkText
                text={finalMessage}
                style={[styles.text, { fontSize: scale(16, 15, 18), lineHeight: scale(25, 23, 28) }]}
              />
            </View>
          </>
        )}

        <NextButton
          onPress={handlePress}
          text={t('NEXT')}
          feedbackType={feedbackType}
        />

        {/* Avsluttknapp som kun vises ved rød tilbakemelding */}
        {isRed && (
          <View style={{ marginTop: 16 }}>
            <ExitButton
              onPress={handleExit}
              text={t('EXIT')}
            />
          </View>
        )}
      </View>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  lineWrapper: {
    position: 'relative',
    marginTop: 60,
    marginBottom: 40,
  },
  curvedLine: {
    width: '100%',
    height: 10,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    ...Platform.select({
      web: {
        boxShadow: '0 -7px 5px rgba(0, 0, 0, 0.1)',
      },
      default: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: -7 },
        shadowRadius: 5,
        elevation: 4,
      },
    }),
  },
  icon: {
    position: 'absolute',
    right: 24,
    top: -28,
    width: 65,
    height: 65,
    resizeMode: 'contain',
  },
  scrollContent: {
    paddingHorizontal: 24,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 31,
  },
  textWrapper: {
    width: '100%',
    maxWidth: '95%',
    alignSelf: 'center',
  },
  text: {
    textAlign: 'left',
    marginBottom: 40,
  },
})

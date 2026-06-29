import { logEvent } from './logEvent'

export async function stopPointLog(
  question: string,
  stoppunkt: string
) {
  try {
    return await logEvent({
      type: 'progress',
      question,
      stoppunkt,
    })
  } catch (error) {
    console.error('Feil ved logging av stoppunkt:', error)
    return false
  }
}
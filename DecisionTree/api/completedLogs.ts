import { logEvent } from './logEvent'

export async function completedLogs(
  question: string,
  stoppunkt: string
) {
  try {
    return await logEvent({
      type: 'completed',
      question,
      stoppunkt,
    })
  } catch (error) {
    console.error('Feil ved logging av fullføring:', error)
    return false
  }
}
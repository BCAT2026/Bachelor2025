type LogEvent = {
  type: 'progress' | 'completed'
  question: string
  stoppunkt: string
}

export async function logEvent(event: LogEvent) {
  const response = await fetch('/api/log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  })

  if (!response.ok) {
    throw new Error(`Loggserveren svarte med status ${response.status}`)
  }

  return true
}
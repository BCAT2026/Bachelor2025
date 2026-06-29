import { createClient } from '@sanity/client'

type LogRequest = {
  type?: unknown
  question?: unknown
  stoppunkt?: unknown
}

const MAX_REQUEST_LENGTH = 4096
const MAX_QUESTION_LENGTH = 1000
const STOP_POINT_PATTERN = /^q(?:[1-9]|[12]\d|3[0-7])$/

function jsonResponse(body: object, status: number) {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
    },
  })
}

export async function POST(request: Request) {
  const token = process.env.SANITY_WRITE_TOKEN

  if (!token) {
    console.error('SANITY_WRITE_TOKEN mangler på serveren')

    return jsonResponse(
      { error: 'Logging er ikke konfigurert' },
      503
    )
  }

  let body: LogRequest

  try {
    const rawBody = await request.text()

    if (rawBody.length > MAX_REQUEST_LENGTH) {
      return jsonResponse(
        { error: 'Forespørselen er for stor' },
        413
      )
    }

    body = JSON.parse(rawBody)
  } catch {
    return jsonResponse({ error: 'Ugyldig JSON' }, 400)
  }

  const hasValidType =
    body.type === 'progress' ||
    body.type === 'completed'

  const hasValidQuestion =
    typeof body.question === 'string' &&
    body.question.length > 0 &&
    body.question.length <= MAX_QUESTION_LENGTH

  const hasValidStopPoint =
    typeof body.stoppunkt === 'string' &&
    STOP_POINT_PATTERN.test(body.stoppunkt)

  if (
    !hasValidType ||
    !hasValidQuestion ||
    !hasValidStopPoint
  ) {
    return jsonResponse(
      { error: 'Ugyldige loggdata' },
      400
    )
  }

  if (
    body.type === 'completed' &&
    body.stoppunkt !== 'q37'
  ) {
    return jsonResponse(
      { error: 'Ugyldig fullføringspunkt' },
      400
    )
  }

  const sanity = createClient({
    projectId: 'f5fg02cy',
    dataset: 'production',
    apiVersion: '2026-03-01',
    token,
    useCdn: false,
  })

  try {
    await sanity.create({
      _type:
        body.type === 'progress'
          ? 'progressLog'
          : 'completedLog',
      question: body.question,
      stoppunkt: body.stoppunkt,
      timestamp: new Date().toISOString(),
    })

    return jsonResponse({ ok: true }, 201)
  } catch (error) {
    console.error('Sanity-mutasjonen feilet', error)

    return jsonResponse(
      { error: 'Logging feilet' },
      502
    )
  }
}
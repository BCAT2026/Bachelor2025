import { type SchemaTypeDefinition } from 'sanity'
import progressLog from './progressLog'
import completedLog from './completedLog'

export const schemaTypes: SchemaTypeDefinition[] = [
  progressLog,
  completedLog,
]

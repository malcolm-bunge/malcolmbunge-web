import { type SchemaTypeDefinition } from 'sanity'
import { sprintStatusType } from './sprintStatus'
import { logEntryType } from './logEntry'
import { article } from './article'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [sprintStatusType, logEntryType, article],
}

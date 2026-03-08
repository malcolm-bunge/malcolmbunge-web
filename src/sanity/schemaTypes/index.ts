import { type SchemaTypeDefinition } from 'sanity'
import { sprintStatusType } from './sprintStatus'
import { logEntryType } from './logEntry'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [sprintStatusType, logEntryType],
}

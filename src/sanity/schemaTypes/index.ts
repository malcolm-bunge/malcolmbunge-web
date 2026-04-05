import { type SchemaTypeDefinition } from 'sanity'
import { sprintStatusType } from './sprintStatus'
import { logEntryType } from './logEntry'
import { article } from './article'
import { aboutPage } from './aboutPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [sprintStatusType, logEntryType, article, aboutPage],
}

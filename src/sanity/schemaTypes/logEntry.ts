import { defineType, defineField } from 'sanity'

export const logEntryType = defineType({
  name: 'logEntry',
  title: 'Log Entry',
  type: 'document',
  fields: [
    defineField({
      name: 'entryDate',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],
  orderings: [
    {
      title: 'Date, Newest First',
      name: 'dateDesc',
      by: [{ field: 'entryDate', direction: 'desc' }],
    },
  ],
})

import {defineField, defineType} from 'sanity'

export const logEntry = defineType({
  name: 'logEntry',
  title: 'Raw Log Entry',
  type: 'document',
  fields: [
    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
      description: 'e.g., "04 March 2026"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first. Use for sorting.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'date',
      subtitle: 'content',
    },
  },
})

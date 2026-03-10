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
  ],
  orderings: [
    {
      title: 'Date, Newest First',
      name: 'dateDesc',
      by: [{ field: 'entryDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'entryDate',
      subtitle: 'content',
    },
    prepare({ title, subtitle }) {
      const formattedDate = title
        ? new Intl.DateTimeFormat('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }).format(new Date(title + 'T00:00:00'))
        : 'No date'
      return {
        title: formattedDate,
        subtitle: subtitle
          ? subtitle.length > 80
            ? subtitle.slice(0, 80) + '...'
            : subtitle
          : 'No content',
      }
    },
  },
})

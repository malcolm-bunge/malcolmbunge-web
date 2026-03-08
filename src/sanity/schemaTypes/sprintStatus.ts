import { defineType, defineField } from 'sanity'

export const sprintStatusType = defineType({
  name: 'sprintStatus',
  title: 'Sprint Status',
  type: 'document',
  fields: [
    defineField({
      name: 'sprintName',
      title: 'Sprint Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'deadline',
      title: 'Deadline',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'technicalStatus',
      title: 'Technical Status',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'strategicObjective',
      title: 'Strategic Objective',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'isCurrent',
      title: 'Is Current Sprint',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})

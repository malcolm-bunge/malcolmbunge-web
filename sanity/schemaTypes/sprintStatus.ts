import {defineField, defineType} from 'sanity'

export const sprintStatus = defineType({
  name: 'sprintStatus',
  title: 'Sprint Status (Live Feed)',
  type: 'document',
  fields: [
    defineField({
      name: 'sprintNumber',
      title: 'Sprint Number',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'deadline',
      title: 'Deadline',
      type: 'string',
      description: 'e.g., "19.03.2026"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'technicalStatus',
      title: 'Technical Status',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'strategicObjective',
      title: 'Strategic Objective',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'dateUpdated',
      title: 'Date Updated',
      type: 'string',
      description: 'e.g., "05 March 2026"',
      validation: (rule) => rule.required(),
    }),
  ],
})

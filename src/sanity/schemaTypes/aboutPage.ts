import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'About Me',
    }),
    defineField({
      name: 'homepageIntro',
      title: 'Homepage Intro',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Short intro shown on the homepage, above the articles. Experiment with typography here.',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{type: 'block'}],
      description: 'The main bio content (rich text)',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title ?? 'About Page'}
    },
  },
})

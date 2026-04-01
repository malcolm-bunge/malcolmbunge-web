import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Short preview of the article (appears in listings)',
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'originalUrl',
      title: 'Original URL',
      type: 'url',
      description: 'Link to the original Substack article (optional)',
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      description: 'Estimated reading time in minutes',
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'vgWortPixelUrl',
      title: 'VG Wort Pixel URL',
      type: 'url',
      description: 'Automatically set via webhook. Do not edit manually.',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'publishedAt',
      image: 'image',
    },
    prepare({title, date, image}) {
      return {
        title,
        subtitle: date ? new Date(date).toLocaleDateString('en-GB') : 'No date',
        media: image,
      }
    },
  },
})

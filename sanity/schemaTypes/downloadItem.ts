import {defineField, defineType} from 'sanity'
import {DownloadIcon} from '@sanity/icons'

export const downloadItem = defineType({
  name: 'downloadItem',
  title: 'Download',
  type: 'document',
  icon: DownloadIcon,
  fields: [
    defineField({name: 'driveFileId', title: 'Drive File ID', type: 'string'}),
    defineField({name: 'name', title: 'File Name', type: 'string'}),
    defineField({name: 'mimeType', title: 'MIME Type', type: 'string'}),
    defineField({name: 'fileSize', title: 'File Size (bytes)', type: 'number'}),
    defineField({name: 'downloadUrl', title: 'Download URL', type: 'url'}),
    defineField({name: 'modifiedTime', title: 'Modified Time', type: 'string'}),
  ],
  preview: {
    select: {title: 'name', subtitle: 'mimeType'},
  },
})

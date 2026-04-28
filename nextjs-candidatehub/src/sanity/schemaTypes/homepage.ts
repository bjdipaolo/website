import {defineField, defineType} from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'Used internally to identify this document (e.g., "Main Homepage")',
      initialValue: 'Main Homepage',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      description: 'The main big text at the top of the page',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text',
      description: 'The paragraph below the main headline',
    }),
    defineField({
      name: 'ctaText',
      title: 'Primary Button Text',
      type: 'string',
    }),
    defineField({
      name: 'markisCards',
      title: 'Meet Markis Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'description', type: 'text', title: 'Description'},
          ]
        }
      ]
    }),
    defineField({
      name: 'outcomes',
      title: 'Outcomes Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'stat', type: 'string', title: 'Statistic (e.g. 85%)'},
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'description', type: 'text', title: 'Description'},
          ]
        }
      ]
    }),
  ],
})

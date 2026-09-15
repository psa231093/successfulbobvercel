import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'homepageTestimonials',
  title: 'Homepage Testimonials',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Testimonials',
      type: 'array',
      description:
        'Add a quote and portrait for each person. Drag the items to change their order. Remove all items to hide the section.',
      of: [
        defineArrayMember({
          name: 'testimonial',
          title: 'Testimonial',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'role', title: 'Title and company', type: 'string'}),
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'text',
              rows: 5,
              description: 'Enter the quote without surrounding quotation marks.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'photo',
              title: 'Portrait',
              type: 'image',
              options: {hotspot: true},
              description:
                'Upload a square portrait. The person’s name is used as the accessible image description.',
            }),
          ],
          preview: {select: {title: 'name', subtitle: 'role', media: 'photo'}},
        }),
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Homepage Testimonials'})},
})

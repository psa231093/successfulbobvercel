import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const SINGLETON = 'workshopSettings'
const SINGLETONS = [SINGLETON, 'homepageTestimonials']

export default defineConfig({
  name: 'default',
  title: 'Succesfulbob',

  projectId: '7926mumv',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Homepage Testimonials')
              .id('homepageTestimonials')
              .child(S.document().schemaType('homepageTestimonials').documentId('homepageTestimonials').title('Homepage Testimonials')),
            S.divider(),
            // Pinned to one document id so a second copy can never exist.
            S.listItem()
              .title('Workshop Settings')
              .id(SINGLETON)
              .child(S.document().schemaType(SINGLETON).documentId(SINGLETON).title('Workshop Settings')),
            S.divider(),
            S.documentTypeListItem('workshop').title('Workshop'),
            S.divider(),
            // Singular, matching the names the editor guides already use.
            S.documentTypeListItem('post').title('Post'),
            S.documentTypeListItem('category').title('Category'),
            S.documentTypeListItem('author').title('Author'),
          ]),
    }),
    visionTool(),
  ],

  // Without this the singleton can be duplicated or deleted, and the page would
  // then read an arbitrary copy with no visible cause.
  document: {
    actions: (prev, {schemaType}) =>
      SINGLETONS.includes(schemaType)
        ? prev.filter(({action}) => action !== 'duplicate' && action !== 'delete' && action !== 'unpublish')
        : prev,
  },

  schema: {
    types: schemaTypes,
    // workshopSession is an object used inside workshop; it should never appear
    // as a top-level "create new" option.
    templates: (prev) => prev.filter((t) => t.schemaType !== 'workshopSession' && !SINGLETONS.includes(t.schemaType)),
  },
})

import { config, collection, fields } from '@keystatic/core';

const blogSchema = {
  title: fields.slug({ name: { label: 'Title' } }),
  description: fields.text({
    label: 'Description',
    multiline: true,
    description: 'Shown in blog index cards and meta description.',
  }),
  date: fields.date({
    label: 'Publish Date',
    defaultValue: { kind: 'today' },
  }),
  author: fields.text({
    label: 'Author',
    defaultValue: 'Ground Control Team',
  }),
  category: fields.select({
    label: 'Category',
    options: [
      { label: 'Security',       value: 'security'       },
      { label: 'Compliance',     value: 'compliance'     },
      { label: 'DNS',            value: 'dns'            },
      { label: 'Email Security', value: 'email-security' },
      { label: 'Product',        value: 'product'        },
    ],
    defaultValue: 'security',
  }),
  translationKey: fields.text({
    label: 'Translation Key',
    description: 'Unique key shared across all language versions of this article. E.g. "dns-security-101".',
  }),
  draft: fields.checkbox({
    label: 'Draft',
    description: 'Draft posts are not shown on the blog.',
    defaultValue: false,
  }),
  coverImage: fields.image({
    label: 'Cover Image',
    directory: 'public/images/blog',
    publicPath: '/images/blog',
  }),
} as const;

export default config({
  storage: {
    kind: 'local',
  },

  ui: {
    brand: {
      name: 'Ground Control — Blog CMS',
    },
    navigation: {
      'English': ['blogEn'],
      'Italiano': ['blogIt'],
      'Français': ['blogFr'],
    },
  },

  collections: {
    blogEn: collection({
      label: 'Blog — English',
      slugField: 'title',
      path: 'src/content/blog/en/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        ...blogSchema,
        lang: fields.text({ label: 'Language', defaultValue: 'en' }),
        content: fields.mdx({
          label: 'Content',
          components: {},
        }),
      },
    }),

    blogIt: collection({
      label: 'Blog — Italiano',
      slugField: 'title',
      path: 'src/content/blog/it/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        ...blogSchema,
        lang: fields.text({ label: 'Language', defaultValue: 'it' }),
        content: fields.mdx({
          label: 'Contenuto',
          components: {},
        }),
      },
    }),

    blogFr: collection({
      label: 'Blog — Français',
      slugField: 'title',
      path: 'src/content/blog/fr/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        ...blogSchema,
        lang: fields.text({ label: 'Langue', defaultValue: 'fr' }),
        content: fields.mdx({
          label: 'Contenu',
          components: {},
        }),
      },
    }),
  },
});

export const languages = {
  en: 'English',
  it: 'Italiano',
  fr: 'Français',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

export const ui = {
  en: {
    'nav.blog': 'Blog',
    'blog.index.title': 'Blog',
    'blog.index.description': 'Security insights, compliance guides, and product updates from the Ground Control team.',
    'blog.readMore': 'Read article →',
    'blog.backToBlog': '← Back to Blog',
    'blog.publishedOn': 'Published',
    'blog.by': 'by',
    'blog.category': 'Category',
    'blog.readIn': 'Read in',
    'blog.alsoAvailable': 'Also available in',
    'blog.noPostsFound': 'No articles published yet.',
    'blog.minuteRead': 'min read',
  },
  it: {
    'nav.blog': 'Blog',
    'blog.index.title': 'Blog',
    'blog.index.description': 'Approfondimenti sulla sicurezza, guide alla conformità e aggiornamenti sui prodotti dal team di Ground Control.',
    'blog.readMore': 'Leggi l\'articolo →',
    'blog.backToBlog': '← Torna al blog',
    'blog.publishedOn': 'Pubblicato',
    'blog.by': 'da',
    'blog.category': 'Categoria',
    'blog.readIn': 'Leggi in',
    'blog.alsoAvailable': 'Disponibile anche in',
    'blog.noPostsFound': 'Nessun articolo pubblicato.',
    'blog.minuteRead': 'min di lettura',
  },
  fr: {
    'nav.blog': 'Blog',
    'blog.index.title': 'Blog',
    'blog.index.description': 'Analyses de sécurité, guides de conformité et actualités produit par l\'équipe Ground Control.',
    'blog.readMore': 'Lire l\'article →',
    'blog.backToBlog': '← Retour au blog',
    'blog.publishedOn': 'Publié le',
    'blog.by': 'par',
    'blog.category': 'Catégorie',
    'blog.readIn': 'Lire en',
    'blog.alsoAvailable': 'Aussi disponible en',
    'blog.noPostsFound': 'Aucun article publié.',
    'blog.minuteRead': 'min de lecture',
  },
} as const;

export type UiKey = keyof typeof ui.en;

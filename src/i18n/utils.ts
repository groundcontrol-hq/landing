import { ui, defaultLang, languages } from './ui';
import type { Lang, UiKey } from './ui';

export { languages, defaultLang };
export type { Lang };

export const SUPPORTED_LANGS = Object.keys(languages) as Lang[];

/** Returns a translation function scoped to the given language. */
export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return (ui[lang] as Record<string, string>)[key] ?? (ui[defaultLang] as Record<string, string>)[key] ?? key;
  };
}

/** Extracts the language segment from a blog entry ID like "en/my-post". */
export function getLangFromId(id: string): Lang {
  const lang = id.split('/')[0] as Lang;
  return SUPPORTED_LANGS.includes(lang) ? lang : defaultLang;
}

/** Extracts the slug (without lang prefix) from a blog entry ID like "en/my-post". */
export function getSlugFromId(id: string): string {
  return id.split('/').slice(1).join('/');
}

/** Builds the URL for a blog post given its entry ID. */
export function getBlogPostUrl(id: string): string {
  const lang = getLangFromId(id);
  const slug = getSlugFromId(id);
  return `/blog/${lang}/${slug}`;
}

/** Builds the URL for the blog index in a given language. */
export function getBlogIndexUrl(lang: Lang): string {
  return `/blog/${lang}`;
}

/** Human-readable label for a language code. */
export function getLangLabel(lang: Lang): string {
  return languages[lang];
}

/** Formats a date for display, respecting the locale. */
export function formatDate(date: Date, lang: Lang): string {
  const localeMap: Record<Lang, string> = {
    en: 'en-GB',
    it: 'it-IT',
    fr: 'fr-FR',
  };
  return date.toLocaleDateString(localeMap[lang], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// WSG 3.8: Lazy-load non-active locale — only import the detected language on startup
import { createI18n } from 'vue-i18n'

function detectLocale(): string {
  const nav = navigator.language
  if (nav.startsWith('it')) return 'it'
  if (nav.startsWith('es')) return 'es'
  return 'en'
}

const localeLoaders: Record<string, () => Promise<Record<string, unknown>>> = {
  it: () => import('./locales/it.json').then(m => m.default),
  es: () => import('./locales/es.json').then(m => m.default),
  en: () => import('./locales/en.json').then(m => m.default),
}

const detectedLocale = detectLocale()

// Start loading the active locale immediately (non-blocking)
const activeMessagesPromise = localeLoaders[detectedLocale]!()

// Create i18n with empty messages — populated before app mount via initI18n()
const i18n = createI18n({
  legacy: false,
  locale: detectedLocale,
  fallbackLocale: 'en',
  messages: {},
  missingWarn: false,
  fallbackWarn: false,
})

/**
 * Initialize i18n with the detected locale's messages.
 * Must be called (and awaited) before app.mount().
 */
export async function initI18n(): Promise<void> {
  const messages = await activeMessagesPromise
  i18n.global.setLocaleMessage(detectedLocale, messages)
  // Re-enable warnings now that messages are loaded
  i18n.global.missingWarn = true
  i18n.global.fallbackWarn = true
}

/**
 * Lazy-load a locale's messages if not already available.
 * Call this when the user switches language.
 */
export async function loadLocale(locale: string): Promise<void> {
  if (i18n.global.availableLocales.includes(locale)) return
  const loader = localeLoaders[locale] ?? localeLoaders.en!
  const messages = await loader()
  i18n.global.setLocaleMessage(locale, messages)
}

export default i18n

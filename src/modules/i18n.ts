import type { Locale } from 'vue-i18n'
import { createI18n } from 'vue-i18n'
import type { UserModule } from '~/types'

const i18n = createI18n({
  legacy: false,
  locale: '',
  messages: {},
})

const localesMap = Object.fromEntries(
  Object.entries(import.meta.glob('../../locales/*.json'))
    .map(([path, loadLocale]) => [path.match(/([\w-]*)\.json$/)?.[1], loadLocale]),
) as Record<Locale, () => Promise<{ default: Record<string, string> }>>

export const availableLocales = Object.keys(localesMap)

const loadedLanguages: string[] = []

function setI18nLanguage(lang: Locale) {
  i18n.global.locale.value = lang as any
  if (typeof document !== 'undefined')
    document.querySelector('html')?.setAttribute('lang', lang)
  return lang
}

export async function loadLanguageAsync(lang: string): Promise<Locale> {
  // 如果是同一语言
  if (i18n.global.locale.value === lang)
    return setI18nLanguage(lang)

  // 如果语言已经加载
  if (loadedLanguages.includes(lang))
    return setI18nLanguage(lang)

  // 如果语言还没有加载
  const messages = await localesMap[lang]()
  i18n.global.setLocaleMessage(lang, messages.default)
  loadedLanguages.push(lang)
  return setI18nLanguage(lang)
}

export const install: UserModule = (app) => {
  app.use(i18n)
  loadLanguageAsync('zh-CN')
}

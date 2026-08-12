import { ref, computed } from 'vue'
import messages from '../i18n/messages.js'

const STORAGE_KEY = 'nativa-locale'

function getInitialLocale() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'es') return stored
  } catch (_) {}
  const lang = typeof navigator !== 'undefined' ? navigator.language : 'es'
  return lang.startsWith('es') ? 'es' : 'en'
}

const locale = ref(getInitialLocale())

export function useI18n() {
  const t = computed(() => (key) => {
    const dict = messages[locale.value]
    return (dict && dict[key]) ?? key
  })

  function setLocale(lang) {
    if (lang !== 'en' && lang !== 'es') return
    locale.value = lang
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch (_) {}
  }

  return { locale, t, setLocale }
}

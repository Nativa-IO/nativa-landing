import { ref, onMounted, computed } from 'vue'

const defaults = {
  version: '1.0.0',
  macos: '',
  windows: '',
}

/** @returns {string} */
function normalizeUrl(raw) {
  const url = (raw ?? '').trim()
  return url.length > 0 ? url : ''
}

export function useDownloads() {
  const downloads = ref({ ...defaults })
  const ready = ref(false)

  onMounted(async () => {
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}downloads.json`)
      if (res.ok) {
        const data = await res.json()
        downloads.value = {
          version: data.version ?? defaults.version,
          macos: normalizeUrl(data.macos),
          windows: normalizeUrl(data.windows),
        }
      }
    } catch (_) {
      /* use defaults */
    }
    ready.value = true
  })

  const version = computed(() => downloads.value.version)

  const macUrl = computed(() => downloads.value.macos)
  const windowsUrl = computed(() => downloads.value.windows)

  const macReady = computed(() => macUrl.value.length > 0)
  const windowsReady = computed(() => windowsUrl.value.length > 0)

  return {
    ready,
    version,
    macUrl,
    windowsUrl,
    macReady,
    windowsReady,
  }
}

<template>
  <header class="site-header">
    <div class="header-shell">
      <router-link to="/" class="brand" aria-label="Nativa">
        <img :src="brandMarkUrl" alt="" class="brand-symbol">
        <span>Nativa</span>
      </router-link>

      <nav class="main-nav" :aria-label="labels.navigation">
        <a href="#vida">{{ labels.how }}</a>
        <a href="#plataforma">{{ labels.product }}</a>
        <a href="#formas">Cloud / Atlas</a>
      </nav>

      <div class="header-actions">
        <div class="language-switch" :aria-label="labels.language">
          <button type="button" :class="{ active: locale === 'es' }" @click="setLocale('es')">ES</button>
          <button type="button" :class="{ active: locale === 'en' }" @click="setLocale('en')">EN</button>
        </div>
        <a class="header-cta" :href="downloadUrl" rel="noopener noreferrer">
          {{ hasDownload ? labels.download : labels.explore }}
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../composables/useI18n'
import { useDownloads } from '../composables/useDownloads'

const { locale, setLocale } = useI18n()
const { macUrl, windowsUrl, macReady, windowsReady } = useDownloads()
const brandMarkUrl = `${import.meta.env.BASE_URL}brand/nativa-mark.svg`

const labels = computed(() => locale.value === 'es'
  ? { navigation: 'Navegación principal', language: 'Idioma', how: 'Cómo funciona', product: 'Producto', download: 'Descargar', explore: 'Conocer Nativa' }
  : { navigation: 'Main navigation', language: 'Language', how: 'How it works', product: 'Product', download: 'Download', explore: 'Meet Nativa' })

const hasDownload = computed(() => macReady.value || windowsReady.value)
const downloadUrl = computed(() => macUrl.value || windowsUrl.value || '#vida')
</script>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 50;
  border-bottom: 1px solid rgba(17,17,15,0.1);
  background: rgba(241,239,233,0.86);
  color: #11110f;
  backdrop-filter: blur(18px) saturate(1.2);
}

.header-shell {
  display: grid;
  width: min(1240px, calc(100% - 48px));
  height: 72px;
  margin: 0 auto;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 28px;
}

.brand {
  display: inline-flex;
  align-items: center;
  justify-self: start;
  gap: 10px;
  color: inherit;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.025em;
  text-decoration: none;
}

.brand-symbol { width: 34px; height: 34px; object-fit: contain; }

.main-nav { display: flex; align-items: center; gap: 30px; }
.main-nav a { color: #55534d; font-size: 13px; font-weight: 540; text-decoration: none; transition: color 160ms ease; }
.main-nav a:hover { color: #11110f; }

.header-actions { display: flex; align-items: center; justify-self: end; gap: 14px; }
.language-switch { display: inline-flex; padding: 3px; border: 1px solid rgba(17,17,15,0.11); border-radius: 999px; background: rgba(255,255,255,0.4); }
.language-switch button { width: 34px; height: 28px; border: 0; border-radius: 999px; background: transparent; color: #77746b; cursor: pointer; font: inherit; font-size: 10px; font-weight: 700; }
.language-switch button.active { background: white; color: #11110f; box-shadow: 0 2px 10px -6px rgba(17,17,15,0.5); }
.header-cta { display: inline-flex; min-height: 38px; align-items: center; padding: 0 17px; border-radius: 999px; background: #11110f; color: white; font-size: 12px; font-weight: 650; text-decoration: none; transition: transform 160ms ease, background-color 160ms ease; }
.header-cta:hover { transform: translateY(-1px); background: #292823; }

@media (max-width: 860px) {
  .header-shell { grid-template-columns: 1fr auto; }
  .main-nav { display: none; }
}

@media (max-width: 520px) {
  .header-shell { width: calc(100% - 28px); height: 64px; gap: 12px; }
  .brand > span:last-child { display: none; }
  .header-actions { gap: 8px; }
  .header-cta { padding: 0 14px; }
}
</style>

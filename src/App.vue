<template>
  <div class="min-h-screen flex flex-col bg-[#f1efe9]">
    <AppHeader />
    <main class="flex-1">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { watch } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import { useI18n } from './composables/useI18n'

const { locale } = useI18n()

watch(locale, (lang) => {
  document.documentElement.lang = lang
  document.title = lang === 'es'
    ? 'Nativa | El trabajo de software, unido'
    : 'Nativa | Software work, together'
}, { immediate: true })
</script>

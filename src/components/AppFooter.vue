<template>
  <footer class="site-footer">
    <div class="footer-shell">
      <div class="footer-brand">
        <img :src="brandMarkUrl" alt="" class="footer-mark">
        <div>
          <strong>Nativa</strong>
          <p>{{ labels.tagline }}</p>
        </div>
      </div>
      <div class="footer-links">
        <a href="#vida">{{ labels.how }}</a>
        <a href="#plataforma">{{ labels.product }}</a>
        <a href="#formas">Cloud / Atlas</a>
      </div>
      <p class="footer-meta">© 2026 Nativa</p>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../composables/useI18n'

const { locale } = useI18n()
const brandMarkUrl = `${import.meta.env.BASE_URL}brand/nativa-mark.svg`
const labels = computed(() => locale.value === 'es'
  ? { tagline: 'Software creado con IA, listo para la vida real.', how: 'Cómo funciona', product: 'Producto' }
  : { tagline: 'AI-built software, ready for real life.', how: 'How it works', product: 'Product' })
</script>

<style scoped>
.site-footer { padding: 54px 0 42px; border-top: 1px solid rgba(17,17,15,0.12); background: #f1efe9; color: #11110f; }
.footer-shell { display: grid; width: min(1240px, calc(100% - 48px)); margin: 0 auto; grid-template-columns: 1fr auto auto; align-items: center; gap: 54px; }
.footer-brand { display: flex; align-items: center; gap: 12px; }
.footer-mark { width: 30px; height: 30px; object-fit: contain; }
.footer-brand strong { display: block; font-size: 14px; }
.footer-brand p { margin: 3px 0 0; color: #77746c; font-size: 12px; }
.footer-links { display: flex; gap: 24px; }
.footer-links a { color: #5e5c55; font-size: 12px; text-decoration: none; }
.footer-links a:hover { color: #11110f; }
.footer-meta { margin: 0; color: #8b8981; font-size: 11px; }
@media (max-width: 760px) { .footer-shell { grid-template-columns: 1fr; gap: 30px; } .footer-links { flex-wrap: wrap; } }
</style>

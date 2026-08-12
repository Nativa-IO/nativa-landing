<template>
  <section class="relative pt-32 pb-20 overflow-hidden">
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none" aria-hidden="true">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.15)_0%,transparent_70%)]" />
    </div>
    <div
      class="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style="background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px); background-size: 64px 64px; mask-image: radial-gradient(ellipse 70% 50% at 50% 0%, black, transparent); -webkit-mask-image: radial-gradient(ellipse 70% 50% at 50% 0%, black, transparent);"
    />

    <div class="relative mx-auto max-w-[1200px] px-6 text-left">
      <div class="animate-fade-up" style="animation-delay: 0s">
        <span class="inline-block font-mono text-[11px] text-purple-400 uppercase tracking-[0.2em] border border-white/[0.1] rounded-full px-4 py-1.5 bg-purple-500/[0.08]">
          {{ t('hero.kicker') }}
        </span>
      </div>

      <h1 class="mt-8 text-[clamp(30px,4.2vw,46px)] font-medium tracking-[-0.02em] leading-[1.2] max-w-[28ch] text-[#e8e4de] animate-fade-up" style="animation-delay: 0.08s">
        {{ t('hero.title') }}
      </h1>

      <p class="mt-5 text-[16px] text-[#8a8a8a] max-w-[560px] leading-[1.65] animate-fade-up" style="animation-delay: 0.16s">
        {{ t('hero.subtitle') }}
      </p>

      <div id="descargar" class="mt-8 flex flex-wrap gap-3 animate-fade-up" style="animation-delay: 0.24s">
        <a
          :href="macReady ? macUrl : '#descargar'"
          :class="btnClass(true, macReady)"
          rel="noopener noreferrer"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2L3 9v12h18V9l-9-7zm0 2.18l6 4.67v9.15H6V8.85l6-4.67z"/></svg>
          {{ t('hero.downloadMac') }}
        </a>
        <a
          :href="windowsReady ? windowsUrl : '#descargar'"
          :class="btnClass(false, windowsReady)"
          rel="noopener noreferrer"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 5.5L10.5 3v7.5L3 12.5V5.5zm10.5 0L21 3v7.5l-7.5 3V5.5zM10.5 13.5L3 18v-6l7.5 1.5v0zm1.5 0l7.5 3v-6l-7.5-1.5v4.5z"/></svg>
          {{ t('hero.downloadWindows') }}
        </a>
      </div>

      <p
        v-if="ready && !macReady && !windowsReady"
        class="mt-3 text-[12px] text-[#6a6a6a] max-w-md"
      >
        {{ t('hero.downloadSoon') }}
      </p>
      <p v-else-if="ready && version" class="mt-3 text-[12px] font-mono text-[#6a6a6a]">
        v{{ version }} · macOS & Windows
      </p>

      <div class="mt-16 animate-scale-in group" style="animation-delay: 0.36s; perspective: 1200px">
        <div class="relative rounded-2xl overflow-hidden border-[0.5px] border-white/[0.08] shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_32px_100px_-24px_rgba(0,0,0,0.7)] transition-all duration-500 group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_40px_120px_-20px_rgba(0,0,0,0.8),0_0_100px_-20px_rgba(168,85,247,0.1)] group-hover:-translate-y-1" style="transform: rotateX(2deg)">
          <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(168,85,247,0.08)_0%,transparent_60%)] pointer-events-none z-10" />
          <img src="/Module_Endpoint_Preview.png" :alt="t('hero.altStage')" class="w-full block bg-black" loading="lazy">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from '../composables/useI18n'
import { useDownloads } from '../composables/useDownloads'

const { t } = useI18n()
const { ready, version, macUrl, windowsUrl, macReady, windowsReady } = useDownloads()

function btnClass(primary, enabled) {
  const base =
    'inline-flex items-center gap-2 px-5 py-2.5 text-[14px] font-medium rounded-lg transition-all duration-200'
  if (!enabled) {
    return `${base} text-[#6a6a6a] bg-white/[0.04] border border-white/[0.08] cursor-default opacity-70`
  }
  if (primary) {
    return `${base} text-black bg-[#e8e4de] hover:bg-white hover:-translate-y-px shadow-lg`
  }
  return `${base} text-[#e8e4de] bg-white/[0.06] border border-white/[0.1] hover:bg-white/[0.1] hover:border-white/[0.16] hover:-translate-y-px`
}
</script>

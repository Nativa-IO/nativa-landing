<template>
  <section class="ownership-manifesto relative border-t border-white/[0.1] bg-[#080808]">
    <div class="mx-auto max-w-[1200px] px-6 py-20 lg:py-28">
      <!-- The Hook: massive gradient headline -->
      <h2 class="manifesto-hook text-[clamp(32px,5vw,56px)] font-extrabold tracking-[-0.04em] leading-[1.1] text-left max-w-4xl">
        {{ t('manifesto.hook') }}
      </h2>

      <!-- Full-width block: The Architecture of Freedom (text left, image right) -->
      <div class="mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div class="order-2 lg:order-1 text-left">
          <span class="font-mono text-[10px] text-purple-400 uppercase tracking-widest">
            {{ t('manifesto.blockTitle') }}
          </span>
          <h3 class="mt-3 text-[clamp(24px,3.5vw,32px)] font-extrabold tracking-[-0.03em] text-[#e8e4de] leading-tight">
            {{ t('manifesto.blockHeadline') }}
          </h3>
          <ul class="mt-6 space-y-5">
            <li class="flex gap-3">
              <span class="text-purple-400 mt-0.5">●</span>
              <span class="text-[#e0e0dc] text-[15px] leading-[1.6]">{{ t('manifesto.zeroLockin') }}</span>
            </li>
            <li class="flex gap-3">
              <span class="text-purple-400 mt-0.5">●</span>
              <span class="text-[#e0e0dc] text-[15px] leading-[1.6]">{{ t('manifesto.localSovereignty') }}</span>
            </li>
            <li class="flex gap-3">
              <span class="text-purple-400 mt-0.5">●</span>
              <span class="text-[#e0e0dc] text-[15px] leading-[1.6]">{{ t('manifesto.orchestrated') }}</span>
            </li>
          </ul>
          <p class="mt-8 text-[#6a6a6a] text-[15px] leading-[1.7] border-l-2 border-white/10 pl-5">
            {{ t('manifesto.copy') }}
          </p>
        </div>
        <div class="order-1 lg:order-2">
          <div class="rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl">
            <img
              src="/Configure_Stack_Preview.png"
              :alt="t('manifesto.altImage')"
              class="w-full block"
              loading="lazy"
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
</script>

<style scoped>
.ownership-manifesto {
  border-top-width: 0.5px;
}

.manifesto-hook {
  background: linear-gradient(180deg, #f0eeea 0%, #8a8a8a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>

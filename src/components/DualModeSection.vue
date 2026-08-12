<template>
  <section class="relative py-32">
    <div class="mx-auto max-w-[1200px] px-6">
      <div class="text-center mb-16">
        <span class="inline-block font-mono text-[11px] text-purple-400 uppercase tracking-[0.2em] border border-white/[0.1] rounded-full px-4 py-1.5 bg-purple-500/[0.08] mb-6">
          {{ t('dual.kicker') }}
        </span>
        <h2 class="text-[clamp(28px,4vw,44px)] font-medium tracking-[-0.02em] leading-[1.15] text-[#e8e4de]">
          {{ t('dual.title') }}
        </h2>
        <p class="mt-5 text-[#8a8a8a] text-[17px] leading-[1.65] max-w-lg mx-auto">
          {{ t('dual.subtitle') }}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div
          ref="vibeRef"
          class="group relative rounded-2xl border-[0.5px] border-white/[0.08] bg-[#0a0a0a] p-8 flex flex-col justify-between transition-all duration-300 hover:border-white/[0.14] hover:bg-[#0d0d0d] opacity-0 translate-y-5"
          :class="{ 'animate-card-in': vibeVisible }"
        >
          <div>
            <div class="flex items-center gap-3 mb-4">
              <div class="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
              <span class="font-mono text-xs text-purple-400 uppercase tracking-widest">{{ t('dual.vibeLabel') }}</span>
            </div>
            <h3 class="text-[20px] font-medium tracking-[-0.01em] mb-3 text-[#e8e4de]">
              {{ t('dual.vibeTitle') }}
            </h3>
            <p class="text-[#6a6a6a] text-[15px] leading-relaxed">
              {{ t('dual.vibeDesc') }}
            </p>
          </div>
          <div class="mt-6 rounded-xl overflow-hidden border-[0.5px] border-white/[0.08] transition-all duration-300 group-hover:border-white/[0.12]">
            <img src="/ChatUI_Preview.png" :alt="t('dual.altChat')" class="w-full block" loading="lazy">
          </div>
        </div>

        <div
          ref="engineRef"
          class="group relative rounded-2xl border-[0.5px] border-white/[0.08] bg-[#0a0a0a] p-8 flex flex-col justify-between transition-all duration-300 hover:border-white/[0.14] hover:bg-[#0d0d0d] opacity-0 translate-y-5"
          :class="{ 'animate-card-in': engineVisible }"
          style="animation-delay: 0.08s"
        >
          <div>
            <div class="flex items-center gap-3 mb-4">
              <div class="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              <span class="font-mono text-xs text-emerald-400 uppercase tracking-widest">{{ t('dual.engineLabel') }}</span>
            </div>
            <h3 class="text-[20px] font-medium tracking-[-0.01em] mb-3 text-[#e8e4de]">
              {{ t('dual.engineTitle') }}
            </h3>
            <p class="text-[#6a6a6a] text-[15px] leading-relaxed">
              {{ t('dual.engineDesc') }}
            </p>
          </div>
          <div class="mt-6 rounded-xl overflow-hidden border-[0.5px] border-white/[0.08] transition-all duration-300 group-hover:border-white/[0.12]">
            <img src="/Session_Preview.png" :alt="t('dual.altSession')" class="w-full block" loading="lazy">
          </div>
        </div>
      </div>

      <div class="mt-8 flex justify-center">
        <div class="inline-flex items-center gap-3 px-6 py-3 rounded-full border-[0.5px] border-white/[0.08] bg-[#0a0a0a]">
          <div class="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
          <span class="font-mono text-xs text-zinc-400 tracking-wider">
            {{ t('dual.schex') }} <span class="text-[#e8e4de] font-medium">{{ t('dual.schexEngine') }}</span>
          </span>
          <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()

const vibeRef = ref(null)
const engineRef = ref(null)
const vibeVisible = ref(false)
const engineVisible = ref(false)

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === vibeRef.value) vibeVisible.value = true
          if (entry.target === engineRef.value) engineVisible.value = true
        }
      })
    },
    { rootMargin: '0px 0px -60px 0px', threshold: 0.15 }
  )
  if (vibeRef.value) observer.observe(vibeRef.value)
  if (engineRef.value) observer.observe(engineRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.animate-card-in { animation: card-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes card-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

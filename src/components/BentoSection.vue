<template>
  <section class="relative py-32">
    <div class="mx-auto max-w-[1200px] px-6">
      <div class="text-left mb-14">
        <span class="inline-block font-mono text-[11px] text-purple-400 uppercase tracking-[0.2em] border border-white/[0.1] rounded-full px-4 py-1.5 bg-purple-500/[0.08] mb-6">
          {{ t('bento.kicker') }}
        </span>
        <h2 class="text-[clamp(28px,4vw,44px)] font-medium tracking-[-0.02em] leading-[1.15] text-[#e8e4de]">
          {{ t('bento.title') }}
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div
          ref="cardMain"
          class="bento-card md:col-span-8 group relative rounded-2xl border border-white/10 bg-[#090909] p-8 flex flex-col opacity-0 translate-y-5"
          :class="{ 'animate-card-in': cardMainVisible }"
        >
          <span class="font-mono text-[10px] text-purple-400 uppercase tracking-widest mb-3">{{ t('bento.traceabilityLabel') }}</span>
          <h3 class="text-xl font-extrabold tracking-[-0.02em] text-[#e8e4de] mb-2">{{ t('bento.traceabilityTitle') }}</h3>
          <p class="text-[#6a6a6a] text-sm leading-relaxed max-w-md">{{ t('bento.traceabilityDesc') }}</p>
          <div class="mt-6 bento-hero">
            <img src="/Session_Preview.png" :alt="t('bento.altSession')" class="w-full rounded-xl border border-white/5 shadow-2xl" loading="lazy">
          </div>
        </div>

        <div
          ref="card2"
          class="bento-card md:col-span-4 group relative rounded-2xl border border-white/10 bg-[#090909] p-8 flex flex-col opacity-0 translate-y-5"
          :class="{ 'animate-card-in': card2Visible }"
          style="animation-delay: 0.06s"
        >
          <span class="font-mono text-[10px] text-purple-400 uppercase tracking-widest mb-3">{{ t('bento.visualLabel') }}</span>
          <h3 class="text-xl font-extrabold tracking-[-0.02em] text-[#e8e4de] mb-2">{{ t('bento.visualTitle') }}</h3>
          <p class="text-[#6a6a6a] text-sm leading-relaxed">{{ t('bento.visualDesc') }}</p>
          <div class="mt-6 bento-hero">
            <img src="/Run_Flow_Preview.png" :alt="t('bento.altRunFlow')" class="w-full rounded-lg border border-white/5 shadow-2xl" loading="lazy">
          </div>
        </div>

        <div
          ref="card3"
          class="bento-card md:col-span-4 group relative rounded-2xl border border-white/10 bg-[#090909] p-8 flex flex-col opacity-0 translate-y-5"
          :class="{ 'animate-card-in': card3Visible }"
          style="animation-delay: 0.1s"
        >
          <span class="font-mono text-[10px] text-purple-400 uppercase tracking-widest mb-3">{{ t('bento.stackLabel') }}</span>
          <h3 class="text-xl font-extrabold tracking-[-0.02em] text-[#e8e4de] mb-2">{{ t('bento.stackTitle') }}</h3>
          <p class="text-[#6a6a6a] text-sm leading-relaxed">{{ t('bento.stackDesc') }}</p>
          <div class="mt-6 bento-hero">
            <img src="/Module_Endpoint_Preview.png" :alt="t('bento.altEndpoints')" class="w-full rounded-lg border border-white/5 shadow-2xl" loading="lazy">
          </div>
        </div>

        <div
          ref="card4"
          class="bento-card md:col-span-4 group relative rounded-2xl border border-white/10 bg-[#090909] p-8 flex flex-col opacity-0 translate-y-5"
          :class="{ 'animate-card-in': card4Visible }"
          style="animation-delay: 0.14s"
        >
          <span class="font-mono text-[10px] text-purple-400 uppercase tracking-widest mb-3">{{ t('bento.localLabel') }}</span>
          <h3 class="text-xl font-extrabold tracking-[-0.02em] text-[#e8e4de] mb-2">{{ t('bento.localTitle') }}</h3>
          <p class="text-[#6a6a6a] text-sm leading-relaxed">{{ t('bento.localDesc') }}</p>
          <div class="mt-6 flex-1 flex items-center justify-center min-h-[140px] rounded-lg border border-dashed border-white/10 bg-white/[0.02]">
            <span class="font-mono text-[11px] text-purple-400 tracking-wider">{{ t('bento.localPlaceholder') }}</span>
          </div>
        </div>

        <div
          ref="card5"
          class="bento-card md:col-span-4 group relative rounded-2xl border border-white/10 bg-[#090909] p-8 flex flex-col opacity-0 translate-y-5"
          :class="{ 'animate-card-in': card5Visible }"
          style="animation-delay: 0.18s"
        >
          <span class="font-mono text-[10px] text-purple-400 uppercase tracking-widest mb-3">{{ t('bento.zeroLabel') }}</span>
          <h3 class="text-xl font-extrabold tracking-[-0.02em] text-[#e8e4de] mb-2">{{ t('bento.zeroTitle') }}</h3>
          <p class="text-[#6a6a6a] text-sm leading-relaxed">{{ t('bento.zeroDesc') }}</p>
          <div class="mt-6 bento-hero">
            <img src="/Configure_Stack_Preview.png" :alt="t('bento.altConfigure')" class="w-full rounded-lg border border-white/5 shadow-2xl" loading="lazy">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()

const cardMain = ref(null)
const card2 = ref(null)
const card3 = ref(null)
const card4 = ref(null)
const card5 = ref(null)

const cardMainVisible = ref(false)
const card2Visible = ref(false)
const card3Visible = ref(false)
const card4Visible = ref(false)
const card5Visible = ref(false)

const cards = [
  { ref: cardMain, visible: cardMainVisible },
  { ref: card2, visible: card2Visible },
  { ref: card3, visible: card3Visible },
  { ref: card4, visible: card4Visible },
  { ref: card5, visible: card5Visible },
]

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const idx = cards.findIndex((c) => c.ref.value === entry.target)
        if (idx !== -1) cards[idx].visible.value = true
      })
    },
    { rootMargin: '0px 0px -60px 0px', threshold: 0.12 }
  )
  cards.forEach((c) => {
    if (c.ref.value) observer.observe(c.ref.value)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.bento-card { transition: border-color 0.25s ease, background-color 0.25s ease, box-shadow 0.4s ease, transform 0.25s ease; }
.bento-card:hover { border-color: rgba(255, 255, 255, 0.14); background-color: #0c0c0c; box-shadow: 0 0 0 1px rgba(255,255,255,0.06), 0 20px 50px -20px rgba(0,0,0,0.5), 0 0 60px -15px rgba(168,85,247,0.12); transform: translateY(-2px); }
.bento-card:hover .bento-hero img { border-color: rgba(255, 255, 255, 0.08); box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.4); }
.bento-hero { overflow: hidden; }
.bento-hero img { transition: border-color 0.25s ease, box-shadow 0.25s ease; }
.animate-card-in { animation: card-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes card-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
</style>

<template>
  <section class="relative py-32 border-t border-white/[0.06]">
    <div class="mx-auto max-w-[1200px] px-6">
      <div class="text-left mb-16">
        <span class="inline-block font-mono text-[11px] text-purple-400 uppercase tracking-[0.2em] border border-white/[0.1] rounded-full px-4 py-1.5 bg-purple-500/[0.08] mb-6">
          {{ t('problem.kicker') }}
        </span>
        <h2 class="text-[clamp(28px,4vw,44px)] font-medium tracking-[-0.02em] leading-[1.15] text-[#e8e4de] max-w-[20ch]">
          {{ t('problem.title') }}
        </h2>
        <p class="mt-5 text-[#8a8a8a] text-[17px] leading-[1.65] max-w-2xl">
          {{ t('problem.subtitle') }}
        </p>
      </div>

      <div
        ref="block1"
        class="manifesto-block grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center rounded-2xl border border-white/10 bg-[#090909] p-8 lg:p-12 mb-6 opacity-0 translate-y-5"
        :class="{ 'animate-block-in': block1Visible }"
      >
        <div class="order-2 lg:order-1">
          <span class="font-mono text-[10px] text-purple-400 uppercase tracking-widest">{{ t('problem.block1Label') }}</span>
          <h3 class="mt-3 text-[clamp(22px,3vw,28px)] font-extrabold tracking-[-0.02em] text-[#e8e4de] leading-tight">
            {{ t('problem.block1Title') }}
          </h3>
          <p class="mt-5 text-[#8a8a8a] text-[16px] leading-[1.7]">
            {{ t('problem.block1Desc') }}
          </p>
        </div>
        <div class="order-1 lg:order-2 manifesto-hero">
          <img src="/Session_Preview.png" :alt="t('problem.altSession')" class="w-full rounded-xl border border-white/5 shadow-2xl" loading="lazy">
        </div>
      </div>

      <div
        ref="block2"
        class="manifesto-block grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center rounded-2xl border border-white/10 bg-[#090909] p-8 lg:p-12 opacity-0 translate-y-5"
        :class="{ 'animate-block-in': block2Visible }"
        style="animation-delay: 0.1s"
      >
        <div class="manifesto-hero">
          <img src="/Configure_Stack_Preview.png" :alt="t('problem.altStack')" class="w-full rounded-xl border border-white/5 shadow-2xl" loading="lazy">
        </div>
        <div>
          <span class="font-mono text-[10px] text-purple-400 uppercase tracking-widest">{{ t('problem.block2Label') }}</span>
          <h3 class="mt-3 text-[clamp(22px,3vw,28px)] font-extrabold tracking-[-0.02em] text-[#e8e4de] leading-tight">
            {{ t('problem.block2Title') }}
          </h3>
          <p class="mt-5 text-[#8a8a8a] text-[16px] leading-[1.7]">
            {{ t('problem.block2Desc') }}
          </p>
        </div>
      </div>

      <div class="mt-16 pt-12 border-t border-white/[0.06]">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div>
            <h4 class="font-mono text-[10px] text-purple-400 uppercase tracking-widest mb-2">{{ t('problem.problemTitle') }}</h4>
            <p class="text-[#6a6a6a] text-sm leading-relaxed">{{ t('problem.problemDesc') }}</p>
          </div>
          <div>
            <h4 class="font-mono text-[10px] text-purple-400 uppercase tracking-widest mb-2">{{ t('problem.solutionTitle') }}</h4>
            <p class="text-[#6a6a6a] text-sm leading-relaxed">{{ t('problem.solutionDesc') }}</p>
          </div>
          <div>
            <h4 class="font-mono text-[10px] text-purple-400 uppercase tracking-widest mb-2">{{ t('problem.resultTitle') }}</h4>
            <p class="text-[#6a6a6a] text-sm leading-relaxed">{{ t('problem.resultDesc') }}</p>
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

const block1 = ref(null)
const block2 = ref(null)
const block1Visible = ref(false)
const block2Visible = ref(false)

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === block1.value) block1Visible.value = true
          if (entry.target === block2.value) block2Visible.value = true
        }
      })
    },
    { rootMargin: '0px 0px -80px 0px', threshold: 0.1 }
  )
  if (block1.value) observer.observe(block1.value)
  if (block2.value) observer.observe(block2.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.manifesto-block { transition: border-color 0.25s ease, background-color 0.25s ease, box-shadow 0.4s ease; }
.manifesto-block:hover { border-color: rgba(255, 255, 255, 0.14); background-color: #0c0c0c; box-shadow: 0 0 0 1px rgba(255,255,255,0.06), 0 24px 60px -24px rgba(0,0,0,0.5), 0 0 60px -15px rgba(168,85,247,0.08); }
.manifesto-block:hover .manifesto-hero img { border-color: rgba(255, 255, 255, 0.08); }
.manifesto-hero img { transition: border-color 0.25s ease, box-shadow 0.25s ease; }
.animate-block-in { animation: block-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes block-in { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
</style>

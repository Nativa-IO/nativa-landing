<template>
  <div class="content-page">
    <div class="content-grid" aria-hidden="true" />

    <section class="content-hero">
      <div class="shell">
        <p class="eyebrow">Content</p>
        <h1>{{ copy.title }}</h1>
        <p class="intro">{{ copy.intro }}</p>
      </div>
    </section>

    <section class="decks-section">
      <div class="shell decks-grid">
        <router-link to="/content/vision" class="deck-card deck-card-idea">
          <div class="slide-preview slide-idea" aria-hidden="true">
            <img :src="asset('og.png')" alt="">
          </div>
          <div class="deck-copy">
            <div>
              <p class="deck-label">{{ copy.presentation }}</p>
              <h2>{{ copy.ideaTitle }}</h2>
              <p>{{ copy.ideaBody }}</p>
            </div>
            <span class="status status-ready">{{ copy.open }}</span>
          </div>
        </router-link>

        <article class="deck-card deck-card-model">
          <div class="slide-preview slide-model" aria-hidden="true">
            <div class="model-cover-copy">
              <span>Nativa</span>
              <strong>Business<br>model.</strong>
              <small>De una necesidad compartida<br>a un negocio sostenible.</small>
            </div>
            <div class="model-network">
              <i class="network-line line-a" /><i class="network-line line-b" /><i class="network-line line-c" />
              <span class="network-dot dot-a" /><span class="network-dot dot-b" /><span class="network-dot dot-c" />
              <div class="network-card card-value"><b>Valor</b><i /><i /></div>
              <div class="network-card card-client"><b>Cliente</b><i /><i /></div>
              <div class="network-card card-revenue"><b>Ingreso</b><i /><i /></div>
              <div class="network-person person-a">C</div>
              <div class="network-person person-b">E</div>
              <div class="network-person person-c">N</div>
            </div>
            <span class="organic-circle organic-orange" />
            <span class="organic-circle organic-yellow" />
            <span class="organic-leaf leaf-a" /><span class="organic-leaf leaf-b" />
          </div>
          <div class="deck-copy">
            <div>
              <p class="deck-label">{{ copy.presentation }}</p>
              <h2>Business model</h2>
              <p>{{ copy.modelBody }}</p>
            </div>
            <span class="status">{{ copy.status }}</span>
          </div>
        </article>
      </div>
    </section>

    <section class="content-note">
      <div class="shell note-layout">
        <p class="eyebrow">{{ copy.nextLabel }}</p>
        <p>{{ copy.nextBody }}</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../composables/useI18n'

const { locale } = useI18n()

const content = {
  es: {
    title: 'Las ideas detrás de Nativa, contadas como presentaciones.',
    intro: 'Un espacio para ordenar el relato del producto, explicar por qué existe y mostrar cómo puede convertirse en un negocio sostenible.',
    presentation: 'Presentación',
    ideaSlide: 'El trabajo de software necesita una nueva forma de colaborar.',
    ideaTitle: 'La idea de Nativa',
    ideaBody: 'El problema, la visión y la forma en que Nativa reúne a todas las personas que participan en construir software.',
    modelBody: 'La oportunidad, los clientes, la propuesta de valor y las decisiones que sostienen el crecimiento de Nativa.',
    status: 'En preparación',
    open: 'Abrir deck →',
    nextLabel: 'Siguiente paso',
    nextBody: 'La presentación de visión ya se puede recorrer. El siguiente recuadro será el business model y, después, cada deck podrá descargarse o compartirse desde aquí.',
  },
  en: {
    title: 'The ideas behind Nativa, told as presentations.',
    intro: 'A place to shape the product story, explain why it exists, and show how it can become a sustainable business.',
    presentation: 'Presentation',
    ideaSlide: 'Software work needs a new way to collaborate.',
    ideaTitle: 'The idea behind Nativa',
    ideaBody: 'The problem, the vision, and how Nativa brings together everyone involved in building software.',
    modelBody: 'The opportunity, customers, value proposition, and decisions that support Nativa’s growth.',
    status: 'In progress',
    open: 'Open deck →',
    nextLabel: 'Next step',
    nextBody: 'The vision presentation is ready to explore. The business model comes next, and each deck will later be available to download or share from here.',
  },
}

const copy = computed(() => content[locale.value] ?? content.es)
const asset = (path) => `${import.meta.env.BASE_URL}${path}`
</script>

<style scoped>
.content-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: #f1efe9;
  color: #11110f;
}

.content-grid {
  position: absolute;
  inset: 0 0 auto;
  height: 720px;
  background-image:
    linear-gradient(rgba(17,17,15,.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(17,17,15,.045) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: linear-gradient(to bottom, black 10%, transparent 92%);
  pointer-events: none;
}

.shell { position: relative; width: min(1240px, calc(100% - 48px)); margin: 0 auto; }
.eyebrow { margin: 0; color: #6f46d9; font-family: var(--font-mono); font-size: 11px; font-weight: 650; letter-spacing: .16em; text-transform: uppercase; }

.content-hero { padding: 170px 0 88px; }
.content-hero h1 { max-width: 940px; margin: 24px 0 0; font-family: var(--font-display); font-size: clamp(58px, 6.3vw, 88px); font-weight: 500; letter-spacing: -.038em; line-height: 1; }
.intro { max-width: 680px; margin: 30px 0 0; color: #67665f; font-size: 18px; line-height: 1.68; }

.decks-section { padding: 20px 0 130px; }
.decks-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 22px; }
.deck-card { overflow: hidden; border: 1px solid rgba(17,17,15,.13); border-radius: 24px; background: rgba(250,249,245,.76); color: inherit; text-decoration: none; box-shadow: 0 24px 70px -52px rgba(17,17,15,.5); transition: transform 180ms ease, box-shadow 180ms ease; }
.deck-card-idea:hover { transform: translateY(-4px); box-shadow: 0 34px 80px -48px rgba(17,17,15,.55); }
.slide-preview { position: relative; aspect-ratio: 16 / 9; overflow: hidden; border-bottom: 1px solid rgba(17,17,15,.12); background: #f6f0e4; }
.slide-idea img { display: block; width: 100%; height: 100%; object-fit: cover; }

.slide-model {
  padding: clamp(24px, 3vw, 40px);
  background:
    radial-gradient(circle at 22% 20%, rgba(191,154,90,.06), transparent 24%),
    radial-gradient(circle at 78% 78%, rgba(26,107,111,.05), transparent 26%),
    #f6f0e4;
}
.slide-model::after { position: absolute; inset: 0; content: ''; opacity: .16; background-image: radial-gradient(circle, rgba(90,74,50,.35) .55px, transparent .7px); background-size: 4px 4px; mix-blend-mode: multiply; pointer-events: none; }
.model-cover-copy { position: relative; z-index: 4; width: 46%; }
.model-cover-copy span { display: block; margin-bottom: clamp(28px, 4vw, 58px); font-size: clamp(16px, 2.1vw, 26px); font-weight: 800; letter-spacing: -.035em; }
.model-cover-copy strong { display: block; font-family: var(--font-display); font-size: clamp(38px, 5.4vw, 72px); font-weight: 500; letter-spacing: -.045em; line-height: .84; }
.model-cover-copy small { display: block; margin-top: clamp(18px, 2.8vw, 34px); color: #5f5a51; font-size: clamp(8px, 1.1vw, 13px); line-height: 1.45; }
.model-network { position: absolute; z-index: 3; inset: 9% 2% 4% 45%; }
.network-line { position: absolute; display: block; height: 1px; background: #24231f; transform-origin: left center; }
.line-a { top: 27%; left: 9%; width: 66%; transform: rotate(15deg); }
.line-b { top: 53%; left: 22%; width: 65%; transform: rotate(-22deg); }
.line-c { top: 75%; left: 14%; width: 70%; transform: rotate(8deg); }
.network-dot { position: absolute; z-index: 2; width: 17px; height: 17px; border-radius: 50%; background: #00aeb7; }
.dot-a { top: 20%; left: 11%; }
.dot-b { top: 48%; left: 51%; background: #f05a28; }
.dot-c { right: 12%; bottom: 12%; background: #90a825; transform: rotate(45deg); border-radius: 2px; }
.network-card { position: absolute; z-index: 2; width: 30%; min-width: 78px; padding: 10px; border: 1px solid rgba(71,62,48,.12); background: rgba(251,247,238,.92); box-shadow: 0 10px 24px -18px rgba(34,31,25,.65); }
.network-card b { display: block; margin-bottom: 9px; font-size: clamp(7px, .9vw, 11px); }
.network-card i { display: block; width: 78%; height: 3px; margin-top: 5px; border-radius: 10px; background: #d2c6b1; }
.network-card i:last-child { width: 52%; }
.card-value { top: 4%; left: 32%; }
.card-client { top: 38%; right: 4%; }
.card-revenue { bottom: 4%; left: 24%; }
.network-person { position: absolute; z-index: 3; display: grid; width: clamp(34px, 5vw, 58px); height: clamp(34px, 5vw, 58px); place-items: center; border-radius: 50%; background: #d6e8e5; color: #155e64; font-family: var(--font-display); font-size: clamp(13px, 1.6vw, 21px); font-weight: 600; box-shadow: 0 8px 20px -16px #111; }
.person-a { top: 0; right: 9%; }
.person-b { top: 43%; left: 3%; background: #dce3ef; color: #285595; }
.person-c { right: 0; bottom: 8%; background: #f2d7e4; color: #9c245f; }
.organic-circle { position: absolute; z-index: 1; display: block; border-radius: 50%; }
.organic-orange { top: -18%; right: -7%; width: 24%; aspect-ratio: 1; background: #f05a28; }
.organic-yellow { bottom: -25%; left: -8%; width: 30%; aspect-ratio: 1; background: #eead2d; }
.organic-leaf { position: absolute; z-index: 2; bottom: -14%; left: 3%; width: 9%; height: 38%; border-radius: 100% 0; background: #247854; transform: rotate(32deg); transform-origin: bottom center; }
.leaf-b { left: 11%; height: 32%; transform: rotate(52deg); background: #3c8d64; }

.deck-copy { display: flex; min-height: 250px; align-items: flex-end; justify-content: space-between; gap: 28px; padding: 30px; }
.deck-copy > div { max-width: 440px; }
.deck-label { margin: 0; color: #6f46d9; font-family: var(--font-mono); font-size: 9px; font-weight: 650; letter-spacing: .15em; text-transform: uppercase; }
.deck-copy h2 { margin: 12px 0 0; font-family: var(--font-display); font-size: 38px; font-weight: 500; letter-spacing: -.03em; line-height: 1; }
.deck-copy div > p:last-child { margin: 18px 0 0; color: #67665f; font-size: 14px; line-height: 1.65; }
.status { flex: 0 0 auto; padding: 8px 12px; border: 1px solid rgba(17,17,15,.13); border-radius: 999px; color: #67665f; font-size: 11px; font-weight: 650; }
.status-ready { border-color: #11110f; background: #11110f; color: white; }

.content-note { padding: 86px 0 100px; background: #121210; color: #f8f6ef; }
.note-layout { display: grid; grid-template-columns: .35fr 1fr; gap: 90px; align-items: start; }
.note-layout > p:last-child { max-width: 760px; margin: 0; font-family: var(--font-display); font-size: clamp(34px, 4vw, 52px); font-weight: 500; letter-spacing: -.025em; line-height: 1.08; }

@media (max-width: 860px) {
  .decks-grid { grid-template-columns: 1fr; }
  .content-hero h1 { font-size: clamp(54px, 12vw, 78px); }
  .note-layout { grid-template-columns: 1fr; gap: 34px; }
}

@media (max-width: 560px) {
  .shell { width: calc(100% - 32px); }
  .content-hero { padding: 132px 0 70px; }
  .content-hero h1 { font-size: 52px; }
  .intro { font-size: 16px; }
  .model-cover-copy span { margin-bottom: 24px; }
  .deck-copy { min-height: 0; align-items: flex-start; flex-direction: column; padding: 24px; }
}
</style>

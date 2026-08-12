<template>
  <div class="deck-view" @touchstart.passive="startTouch" @touchend.passive="endTouch">
    <div class="deck-backdrop" aria-hidden="true" />

    <div class="deck-topbar">
      <router-link to="/content" class="back-link">← Content</router-link>
      <span>La visión de Nativa</span>
      <span>{{ slideNumber }} / {{ slides.length }}</span>
    </div>

    <main class="deck-shell">
      <Transition :name="transitionName" mode="out-in">
        <section :key="currentSlide" class="slide-stage" :class="`slide-${currentSlide + 1}`">
          <template v-if="currentSlide === 0">
            <div class="slide-kicker">01 · Un cambio de época</div>
            <div class="opening-grid">
              <div>
                <h1>El software cambió de un día para otro.</h1>
                <p class="lead">Más personas pueden iniciar y modificar un producto. La mesa creció; las responsabilidades no desaparecieron.</p>
              </div>
              <div class="change-board">
                <p>Quienes participan</p>
                <div class="participant-roster" aria-label="CEO, diseño, programación, seguridad, operación y expertos">
                  <div class="participant-role role-ceo"><span>01</span><strong>CEO</strong></div>
                  <div class="participant-role role-design"><span>02</span><strong>Diseño</strong></div>
                  <div class="participant-role role-code"><span>03</span><strong>Programación</strong></div>
                  <div class="participant-role role-security"><span>04</span><strong>Seguridad</strong></div>
                  <div class="participant-role role-ops"><span>05</span><strong>Operación</strong></div>
                  <div class="participant-role role-expert"><span>06</span><strong>Expertos</strong></div>
                </div>
                <div class="same-practices">
                  <small>Lo que sigue siendo necesario</small>
                  <strong>Desarrollo · mantenimiento · seguridad · gobernanza</strong>
                </div>
              </div>
            </div>
            <p class="slide-thesis">Cambió quién construye. Las prácticas de ingeniería siguen siendo las mismas.</p>
          </template>

          <template v-else-if="currentSlide === 1">
            <div class="slide-kicker">02 · La transición</div>
            <div class="cheap-code-grid">
              <div>
                <p class="overline">Código funcional</p>
                <div class="price-change"><s>Caro</s><span>→</span><strong>Casi gratis</strong></div>
                <h2>El código se volvió barato. El software no.</h2>
              </div>
              <blockquote>
                <span>“</span>
                <p>Free as in puppies.</p>
                <small>Adquirirlo es fácil. Cuidarlo es el compromiso.</small>
              </blockquote>
            </div>
            <div class="after-code">
              <span>Escribir</span><i />
              <strong>Operar</strong><i />
              <strong>Proteger</strong><i />
              <strong>Evolucionar</strong>
            </div>
            <p class="slide-thesis">Construir la primera versión es solo el inicio. La fricción aparece en todo lo que viene después.</p>
          </template>

          <template v-else-if="currentSlide === 2">
            <div class="slide-heading-row">
              <div>
                <div class="slide-kicker">03 · El ciclo real</div>
                <h2>El software nunca está terminado.</h2>
              </div>
              <div class="segmented-control" role="group" aria-label="Comparar el ciclo de software">
                <button :class="{ active: lifecycleMode === 'linear' }" @click="lifecycleMode = 'linear'">Como se imagina</button>
                <button :class="{ active: lifecycleMode === 'real' }" @click="lifecycleMode = 'real'">Como ocurre</button>
              </div>
            </div>

            <div class="lifecycle-canvas" :class="`lifecycle-${lifecycleMode}`">
              <div class="life-node requirements"><span>01</span><strong>Requerimientos</strong><small>Qué necesitamos</small></div>
              <i class="life-arrow arrow-one">→</i>
              <div class="life-node design"><span>02</span><strong>Diseño</strong><small>Cómo funcionará</small></div>
              <i class="life-arrow arrow-two">→</i>
              <div class="life-node build"><span>03</span><strong>Construcción</strong><small>Primera versión</small></div>
              <i class="life-arrow arrow-three">→</i>
              <div class="life-node maintain"><span>04</span><strong>Mantenimiento</strong><small>Nuevas necesidades</small></div>
              <div v-if="lifecycleMode === 'real'" class="loop-line"><span>El producto aprende y vuelve a cambiar</span></div>
              <div v-else class="finish-line"><span>Versión 1</span><strong>“Final”</strong></div>
            </div>
            <p class="slide-thesis">La versión 1 no es la versión final. Construcción y mantenimiento forman un loop que nunca deja de evolucionar.</p>
          </template>

          <template v-else-if="currentSlide === 3">
            <div class="slide-kicker">04 · La nueva mesa</div>
            <div class="people-layout">
              <div class="before-panel">
                <p>Antes</p>
                <div class="single-person"><span>⌁</span><strong>Ingeniería</strong></div>
                <small>El contexto vivía principalmente dentro del equipo técnico.</small>
              </div>
              <div class="shift-arrow">→</div>
              <div class="now-panel">
                <p>Ahora</p>
                <div class="people-orbit">
                  <div class="product-center">El producto</div>
                  <span class="person ceo">CEO</span>
                  <span class="person designer">Diseño</span>
                  <span class="person developer">Programación</span>
                  <span class="person expert">Experto</span>
                  <span class="person security">Seguridad</span>
                </div>
              </div>
            </div>
            <h2 class="people-title">Más participación crea mejores productos. Sin coordinación, también crea más fricción.</h2>
          </template>

          <template v-else-if="currentSlide === 4">
            <div class="slide-heading-row problems-heading">
              <div>
                <div class="slide-kicker">05 · La problemática</div>
                <h2>El código es una parte. El sistema completo exige cinco cosas más.</h2>
              </div>
              <p>Patrones observados en entrevistas y proyectos que intentaron construir aplicaciones para sus empresas.</p>
            </div>
            <div class="problem-grid">
              <article v-for="problem in problems" :key="problem.number" :class="`problem-${problem.number}`">
                <span>{{ problem.number }}</span>
                <h3>{{ problem.title }}</h3>
                <p>{{ problem.body }}</p>
              </article>
            </div>
          </template>

          <template v-else-if="currentSlide === 5">
            <div class="slide-kicker">06 · Lo que cambió</div>
            <div class="not-new-grid">
              <div class="old-needs">
                <p>Necesidades de siempre</p>
                <ul>
                  <li>Proteger información</li>
                  <li>Controlar versiones</li>
                  <li>Operar infraestructura</li>
                  <li>Coordinar personas</li>
                </ul>
              </div>
              <div class="amplifier" aria-hidden="true">
                <span>×</span>
                <i /><i /><i />
              </div>
              <div class="new-risk">
                <p>Una nueva escala</p>
                <h2>Más velocidad amplifica el costo de cada error.</h2>
                <small>Los modelos pueden crear más cambios, acceder a más contexto y repetir decisiones equivocadas a una velocidad inédita.</small>
              </div>
            </div>
            <p class="slide-thesis">Nativa no inventa problemas nuevos. Hace que las prácticas que siempre importaron puedan sobrevivir a esta nueva velocidad.</p>
          </template>

          <template v-else>
            <div class="slide-heading-row architecture-heading">
              <div>
                <div class="slide-kicker">07 · Cómo funciona</div>
                <h2>La misma experiencia. La red que tú elijas.</h2>
              </div>
              <div class="segmented-control infra-control" role="group" aria-label="Elegir dónde vive la infraestructura">
                <button :class="{ active: infraMode === 'cloud' }" @click="infraMode = 'cloud'">Nativa Cloud</button>
                <button :class="{ active: infraMode === 'client' }" @click="infraMode = 'client'">Tu infraestructura</button>
              </div>
            </div>

            <div class="architecture-layout">
              <div class="desktop-side">
                <p class="diagram-label">Tu app de escritorio</p>
                <div class="desktop-shot">
                  <img :src="asset('product/vision-desktop.png')" alt="Aplicación de escritorio de Nativa conectada al mapa de infraestructura">
                </div>
              </div>
              <div class="connection" aria-hidden="true"><i /><span>conexión segura</span><i /></div>
              <div class="network-boundary" :class="`network-${infraMode}`">
                <div class="network-label">
                  <span>{{ infraMode === 'cloud' ? 'Red de Nativa' : 'Red de tu empresa' }}</span>
                  <small>{{ infraMode === 'cloud' ? 'Administrada por Nativa' : 'Bajo tus políticas y control' }}</small>
                </div>
                <div class="nativa-builder">
                  <img :src="asset('brand/nativa-mark.svg')" alt="">
                  <span>{{ infraMode === 'cloud' ? 'Nativa opera' : 'Nativa configura aquí' }}</span>
                </div>
                <div class="server-map">
                  <div class="server vault"><span>▣</span><strong>Vault</strong><small>Secretos</small></div>
                  <div class="server workbench"><span>◇</span><strong>Workbench</strong><small>Construcción y pruebas</small></div>
                  <div class="server storage"><span>□</span><strong>Storage</strong><small>Documentos</small></div>
                  <div class="server production"><span>↗</span><strong>Producción</strong><small>Usuarios reales</small></div>
                </div>
              </div>
            </div>
            <p class="architecture-caption">{{ infraMode === 'cloud' ? 'Nativa monta y mantiene la infraestructura dentro de su red.' : 'Nativa monta los mismos componentes dentro de tu red; los datos y políticas permanecen contigo.' }}</p>
          </template>
        </section>
      </Transition>
    </main>

    <div class="deck-controls">
      <button type="button" :disabled="currentSlide === 0" aria-label="Slide anterior" @click="previousSlide">←</button>
      <div class="progress-dots" aria-label="Progreso de la presentación">
        <button v-for="(_, index) in slides" :key="index" type="button" :class="{ active: index === currentSlide }" :aria-label="`Ir al slide ${index + 1}`" @click="goToSlide(index)" />
      </div>
      <button type="button" :disabled="currentSlide === slides.length - 1" aria-label="Siguiente slide" @click="nextSlide">→</button>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const slides = Array.from({ length: 7 })
const currentSlide = ref(0)
const lifecycleMode = ref('linear')
const infraMode = ref('cloud')
const direction = ref('forward')
let touchStartX = 0

const problems = [
  { number: '01', title: 'Seguridad y gobernanza', body: 'Crecer sin debilitar permisos, políticas ni la protección de la información.' },
  { number: '02', title: 'Versionamiento', body: 'Cada producto cambia. Necesita historia, ambientes y una forma segura de avanzar o regresar.' },
  { number: '03', title: 'Aislamiento', body: 'Ahora también hay que decidir qué información pueden ver los modelos y cuál debe permanecer fuera de su alcance.' },
  { number: '04', title: 'Infraestructura', body: 'El código necesita lugares para correr, probarse, evolucionar y llegar a usuarios reales.' },
  { number: '05', title: 'Colaboración', body: 'Personas distintas necesitan compartir contexto, revisar decisiones y trabajar sin bloquearse.' },
]

const slideNumber = computed(() => String(currentSlide.value + 1).padStart(2, '0'))
const transitionName = computed(() => direction.value === 'forward' ? 'slide-forward' : 'slide-back')
const asset = (path) => `${import.meta.env.BASE_URL}${path}`

function goToSlide(index) {
  if (index === currentSlide.value || index < 0 || index >= slides.length) return
  direction.value = index > currentSlide.value ? 'forward' : 'back'
  currentSlide.value = index
}

function nextSlide() { goToSlide(currentSlide.value + 1) }
function previousSlide() { goToSlide(currentSlide.value - 1) }
function handleKey(event) {
  if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') nextSlide()
  if (event.key === 'ArrowLeft' || event.key === 'PageUp') previousSlide()
}
function startTouch(event) { touchStartX = event.changedTouches[0]?.clientX ?? 0 }
function endTouch(event) {
  const distance = (event.changedTouches[0]?.clientX ?? 0) - touchStartX
  if (Math.abs(distance) < 48) return
  distance < 0 ? nextSlide() : previousSlide()
}

onMounted(() => window.addEventListener('keydown', handleKey))
onBeforeUnmount(() => window.removeEventListener('keydown', handleKey))
</script>

<style scoped>
.deck-view {
  --paper: #f1efe9;
  --ink: #11110f;
  --muted: #68665e;
  --purple: #7954d8;
  position: relative;
  min-height: 100vh;
  padding: 96px 0 100px;
  overflow: hidden;
  background: var(--paper);
  color: var(--ink);
}

.deck-backdrop { position: absolute; inset: 0; background-image: linear-gradient(rgba(17,17,15,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,15,.04) 1px, transparent 1px); background-size: 48px 48px; mask-image: linear-gradient(to bottom, black, transparent 82%); pointer-events: none; }
.deck-topbar { position: relative; display: grid; width: min(1340px, calc(100% - 48px)); margin: 0 auto 16px; grid-template-columns: 1fr auto 1fr; align-items: center; color: #6c6961; font-family: var(--font-mono); font-size: 10px; letter-spacing: .12em; text-transform: uppercase; }
.deck-topbar > span:last-child { justify-self: end; }
.back-link { color: inherit; text-decoration: none; }
.back-link:hover { color: var(--ink); }
.deck-shell { position: relative; width: min(1340px, calc(100% - 48px)); margin: 0 auto; }
.slide-stage { position: relative; aspect-ratio: 16 / 9; min-height: 690px; padding: clamp(40px, 4vw, 68px); overflow: hidden; border: 1px solid rgba(17,17,15,.13); border-radius: 26px; background: #faf9f5; box-shadow: 0 36px 100px -60px rgba(17,17,15,.55); }
.slide-kicker { color: var(--purple); font-family: var(--font-mono); font-size: 10px; font-weight: 650; letter-spacing: .16em; text-transform: uppercase; }
.slide-stage h1, .slide-stage h2, .slide-stage h3, .slide-stage p { margin-top: 0; }
.slide-stage h1 { max-width: 700px; margin-bottom: 26px; font-family: var(--font-display); font-size: clamp(60px, 6.2vw, 92px); font-weight: 500; letter-spacing: -.04em; line-height: .96; }
.slide-stage h2 { font-family: var(--font-display); font-size: clamp(48px, 5vw, 74px); font-weight: 500; letter-spacing: -.038em; line-height: .98; }
.lead { max-width: 610px; color: var(--muted); font-size: 18px; line-height: 1.65; }
.slide-thesis { position: absolute; right: clamp(40px, 4vw, 68px); bottom: 38px; left: clamp(40px, 4vw, 68px); margin: 0; padding-top: 18px; border-top: 1px solid rgba(17,17,15,.14); font-size: 15px; font-weight: 650; }

.opening-grid { display: grid; grid-template-columns: 1.1fr .9fr; gap: 70px; margin-top: 40px; align-items: center; }
.change-board { padding: 0 0 0 34px; border-left: 1px solid rgba(17,17,15,.18); }
.change-board > p { margin-bottom: 18px; color: #6f46d9; font-family: var(--font-mono); font-size: 10px; font-weight: 650; letter-spacing: .13em; text-transform: uppercase; }
.participant-roster { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 28px; }
.participant-role { display: grid; padding: 13px 0 11px; border-top: 1px solid rgba(17,17,15,.13); grid-template-columns: 28px 1fr; align-items: baseline; }
.participant-role span { color: #8b887f; font-family: var(--font-mono); font-size: 8px; }
.participant-role strong { font-family: var(--font-display); font-size: 24px; font-weight: 500; letter-spacing: -.025em; line-height: 1; }
.role-design span { color: #cf3d84; }
.role-code span { color: #7954d8; }
.role-security span { color: #16838a; }
.role-ops span { color: #54943d; }
.role-expert span { color: #c47a18; }
.same-practices { margin-top: 28px; padding-top: 22px; border-top: 1px solid rgba(17,17,15,.18); }
.same-practices small, .same-practices strong { display: block; }
.same-practices small { margin-bottom: 8px; color: var(--muted); font-size: 11px; }
.same-practices strong { font-family: var(--font-display); font-size: 26px; font-weight: 500; line-height: 1.1; }

.slide-2 { background: #121210; color: #f7f5ef; }
.slide-2 .slide-kicker { color: #bba4ff; }
.cheap-code-grid { display: grid; grid-template-columns: 1.1fr .9fr; gap: 74px; margin-top: 62px; align-items: center; }
.overline { margin-bottom: 14px; color: #a8a59c; font-family: var(--font-mono); font-size: 10px; letter-spacing: .15em; text-transform: uppercase; }
.price-change { display: flex; align-items: center; gap: 18px; margin-bottom: 38px; font-size: 17px; }
.price-change s { color: #89867e; }
.price-change strong { padding: 8px 13px; border-radius: 999px; background: #d6f0df; color: #146f3b; font-size: 13px; }
.cheap-code-grid h2 { max-width: 650px; margin-bottom: 0; }
.cheap-code-grid blockquote { position: relative; margin: 0; padding: 36px; border: 1px solid rgba(255,255,255,.13); border-radius: 24px; background: #1d1d1a; }
.cheap-code-grid blockquote > span { color: #ff6b2c; font-family: var(--font-display); font-size: 84px; line-height: .4; }
.cheap-code-grid blockquote p { margin: 28px 0 22px; font-family: var(--font-display); font-size: clamp(44px, 4.5vw, 66px); line-height: .95; }
.cheap-code-grid blockquote small { color: #aaa79e; font-size: 13px; line-height: 1.6; }
.after-code { display: flex; margin-top: 54px; align-items: center; gap: 15px; color: #aaa79e; font-family: var(--font-mono); font-size: 10px; letter-spacing: .12em; text-transform: uppercase; }
.after-code strong { color: #f7f5ef; }
.after-code i { width: 32px; height: 1px; background: #4a4943; }
.slide-2 .slide-thesis { border-color: rgba(255,255,255,.13); }

.slide-heading-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 44px; }
.slide-heading-row h2 { max-width: 790px; margin: 18px 0 0; }
.segmented-control { display: inline-flex; flex: 0 0 auto; padding: 4px; border: 1px solid rgba(17,17,15,.13); border-radius: 999px; background: #ebe7de; }
.segmented-control button { min-height: 38px; padding: 0 16px; border: 0; border-radius: 999px; background: transparent; color: #706d65; cursor: pointer; font: inherit; font-size: 11px; font-weight: 650; }
.segmented-control button.active { background: #11110f; color: white; box-shadow: 0 5px 16px -10px rgba(17,17,15,.7); }
.lifecycle-canvas { position: relative; display: grid; margin-top: 76px; grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr; gap: 16px; align-items: center; }
.life-node { position: relative; min-height: 152px; padding: 22px; border: 1px solid rgba(17,17,15,.14); border-radius: 18px; background: #f1eee7; transition: transform 360ms ease, background-color 360ms ease; }
.life-node span { color: var(--purple); font-family: var(--font-mono); font-size: 9px; }
.life-node strong, .life-node small { display: block; }
.life-node strong { margin-top: 28px; font-family: var(--font-display); font-size: 24px; font-weight: 500; }
.life-node small { margin-top: 6px; color: var(--muted); font-size: 11px; }
.life-arrow { color: #87837a; font-style: normal; }
.lifecycle-real .build, .lifecycle-real .maintain { background: #e8defe; transform: translateY(-12px); }
.loop-line { position: absolute; right: 0; bottom: -66px; width: calc(50% - 24px); height: 52px; border-right: 2px solid #7954d8; border-bottom: 2px solid #7954d8; border-left: 2px solid #7954d8; border-radius: 0 0 22px 22px; animation: loopGlow 1.8s ease-in-out infinite; }
.loop-line::before { position: absolute; top: -16px; left: -7px; content: '↑'; color: #7954d8; font-weight: 800; }
.loop-line span { position: absolute; right: 24px; bottom: 12px; color: #6b48c5; font-family: var(--font-mono); font-size: 9px; letter-spacing: .08em; text-transform: uppercase; }
.finish-line { position: absolute; right: 0; bottom: -60px; display: flex; align-items: center; gap: 12px; padding: 12px 16px; border: 1px solid rgba(17,17,15,.13); border-radius: 12px; background: white; }
.finish-line span { color: var(--muted); font-size: 10px; }
.finish-line strong { font-size: 12px; }
@keyframes loopGlow { 50% { border-color: #ec3f95; } }

.slide-4 { background: #e7e3db; }
.people-layout { display: grid; grid-template-columns: .7fr auto 1.3fr; gap: 40px; margin-top: 56px; align-items: center; }
.before-panel, .now-panel { min-height: 390px; padding: 30px; border: 1px solid rgba(17,17,15,.13); border-radius: 24px; background: rgba(250,249,245,.62); }
.before-panel > p, .now-panel > p { font-family: var(--font-mono); font-size: 10px; letter-spacing: .14em; text-transform: uppercase; }
.single-person { display: grid; width: 170px; height: 170px; margin: 56px auto 30px; place-items: center; border-radius: 50%; background: #11110f; color: white; }
.single-person span, .single-person strong { display: block; text-align: center; }
.single-person span { font-size: 30px; }
.single-person strong { font-size: 13px; }
.before-panel small { display: block; max-width: 300px; margin: 0 auto; color: var(--muted); line-height: 1.55; text-align: center; }
.shift-arrow { color: #7d7870; font-size: 28px; }
.people-orbit { position: relative; height: 315px; }
.product-center { position: absolute; top: 50%; left: 50%; display: grid; width: 130px; height: 130px; place-items: center; transform: translate(-50%,-50%); border-radius: 50%; background: #11110f; color: white; font-family: var(--font-display); font-size: 22px; text-align: center; }
.person { position: absolute; display: grid; min-width: 86px; height: 86px; padding: 10px; place-items: center; border: 1px solid rgba(17,17,15,.14); border-radius: 50%; background: #faf9f5; font-size: 11px; font-weight: 700; box-shadow: 0 18px 40px -30px rgba(17,17,15,.7); }
.person.ceo { top: 4px; left: 16%; background: #f2d7e4; }
.person.designer { top: 0; right: 14%; background: #d8eceb; }
.person.developer { top: 42%; right: 1%; background: #e8defe; }
.person.expert { bottom: 0; right: 24%; background: #f3dfb8; }
.person.security { bottom: 2%; left: 15%; background: #d8e7f6; }
.people-title { max-width: 980px; margin: 34px 0 0 !important; font-size: clamp(34px, 3.4vw, 50px) !important; }

.problems-heading h2 { max-width: 860px; font-size: clamp(42px, 4.4vw, 62px); }
.problems-heading > p { max-width: 320px; margin: 26px 0 0; color: var(--muted); font-size: 13px; line-height: 1.6; }
.problem-grid { display: grid; margin-top: 44px; grid-template-columns: repeat(6, 1fr); gap: 14px; }
.problem-grid article { min-height: 230px; padding: 24px; border: 1px solid rgba(17,17,15,.13); border-radius: 18px; background: #eeeae2; }
.problem-grid article:nth-child(-n+3) { grid-column: span 2; }
.problem-grid article:nth-child(n+4) { grid-column: span 3; min-height: 190px; }
.problem-grid article > span { color: var(--purple); font-family: var(--font-mono); font-size: 9px; }
.problem-grid h3 { margin: 30px 0 12px; font-family: var(--font-display); font-size: 26px; font-weight: 500; line-height: 1.02; }
.problem-grid p { margin-bottom: 0; color: var(--muted); font-size: 12px; line-height: 1.55; }
.problem-03 { background: #e8defe !important; }
.problem-04 { background: #d8eceb !important; }
.problem-05 { background: #f3dfb8 !important; }

.slide-6 { background: #121210; color: #f8f6ef; }
.slide-6 .slide-kicker { color: #bba4ff; }
.not-new-grid { display: grid; grid-template-columns: 1fr .24fr 1.2fr; gap: 36px; margin-top: 60px; align-items: center; }
.old-needs, .new-risk { min-height: 390px; padding: 36px; border: 1px solid rgba(255,255,255,.13); border-radius: 24px; background: #1c1c19; }
.old-needs > p, .new-risk > p { color: #aaa79e; font-family: var(--font-mono); font-size: 10px; letter-spacing: .14em; text-transform: uppercase; }
.old-needs ul { margin: 72px 0 0; padding: 0; list-style: none; }
.old-needs li { padding: 13px 0; border-top: 1px solid rgba(255,255,255,.11); font-size: 16px; }
.new-risk { background: #7954d8; }
.new-risk > p, .new-risk small { color: rgba(255,255,255,.7); }
.new-risk h2 { margin: 70px 0 26px; font-size: clamp(44px, 4.5vw, 62px); }
.new-risk small { display: block; max-width: 500px; font-size: 13px; line-height: 1.65; }
.amplifier { display: grid; place-items: center; }
.amplifier span { display: grid; width: 64px; height: 64px; place-items: center; border: 1px solid rgba(255,255,255,.2); border-radius: 50%; color: #f4c735; font-family: var(--font-display); font-size: 38px; }
.amplifier i { width: 1px; height: 30px; background: rgba(255,255,255,.16); }
.slide-6 .slide-thesis { border-color: rgba(255,255,255,.13); }

.architecture-heading h2 { max-width: 760px; font-size: clamp(44px, 4.5vw, 64px); }
.infra-control { margin-top: 6px; }
.architecture-layout { display: grid; margin-top: 30px; grid-template-columns: .92fr 88px 1.08fr; gap: 20px; align-items: center; }
.diagram-label { margin-bottom: 10px; color: var(--muted); font-family: var(--font-mono); font-size: 9px; letter-spacing: .13em; text-transform: uppercase; }
.desktop-shot { aspect-ratio: 16 / 10; padding: 7px; overflow: hidden; border: 1px solid rgba(17,17,15,.15); border-radius: 16px; background: #151513; box-shadow: 0 22px 50px -34px rgba(17,17,15,.65); }
.desktop-shot img { display: block; width: 100%; height: 100%; object-fit: contain; border-radius: 10px; }
.connection { display: flex; align-items: center; gap: 6px; color: var(--muted); font-family: var(--font-mono); font-size: 8px; line-height: 1.2; text-align: center; }
.connection i { width: 20px; height: 1px; flex: 0 0 auto; background: #7954d8; }
.network-boundary { position: relative; min-height: 350px; padding: 22px; overflow: hidden; border: 2px dashed #8d5cff; border-radius: 22px; background: #eee9fa; transition: background-color 360ms ease, border-color 360ms ease; }
.network-client { border-color: #167b7f; background: #e1efed; }
.network-label span, .network-label small { display: block; }
.network-label span { font-size: 13px; font-weight: 750; }
.network-label small { margin-top: 3px; color: var(--muted); font-size: 10px; }
.nativa-builder { position: absolute; top: 18px; right: 20px; display: flex; align-items: center; gap: 8px; animation: builderMove 2.6s ease-in-out infinite; }
.nativa-builder img { width: 30px; height: 30px; object-fit: contain; }
.nativa-builder span { padding: 6px 9px; border-radius: 999px; background: #11110f; color: white; font-size: 8px; font-weight: 700; }
.server-map { position: relative; display: grid; margin-top: 28px; grid-template-columns: repeat(2, 1fr); gap: 12px; }
.server-map::before { position: absolute; inset: 50% 12% auto; height: 1px; content: ''; background: rgba(17,17,15,.18); }
.server { position: relative; min-height: 102px; padding: 16px; border: 1px solid rgba(17,17,15,.14); border-radius: 14px; background: rgba(250,249,245,.88); z-index: 1; }
.server > span { color: #7954d8; font-size: 17px; }
.server strong, .server small { display: block; }
.server strong { margin-top: 10px; font-size: 12px; }
.server small { margin-top: 3px; color: var(--muted); font-size: 9px; }
.network-client .server > span { color: #167b7f; }
.architecture-caption { max-width: 760px; margin: 22px 0 0; color: var(--muted); font-size: 13px; line-height: 1.55; }
@keyframes builderMove { 50% { transform: translateY(8px); } }

.deck-controls { position: fixed; z-index: 20; right: 0; bottom: 20px; left: 0; display: flex; width: max-content; margin: 0 auto; align-items: center; gap: 16px; padding: 8px; border: 1px solid rgba(17,17,15,.14); border-radius: 999px; background: rgba(250,249,245,.9); box-shadow: 0 18px 50px -30px rgba(17,17,15,.65); backdrop-filter: blur(18px); }
.deck-controls > button { width: 38px; height: 38px; border: 0; border-radius: 50%; background: #11110f; color: white; cursor: pointer; font-size: 16px; }
.deck-controls > button:disabled { background: #d7d3ca; color: #8b887f; cursor: default; }
.progress-dots { display: flex; gap: 7px; }
.progress-dots button { width: 7px; height: 7px; padding: 0; border: 0; border-radius: 99px; background: #c0bcb3; cursor: pointer; transition: width 180ms ease, background-color 180ms ease; }
.progress-dots button.active { width: 24px; background: #7954d8; }

.slide-forward-enter-active, .slide-forward-leave-active, .slide-back-enter-active, .slide-back-leave-active { transition: opacity 220ms ease, transform 260ms ease; }
.slide-forward-enter-from { opacity: 0; transform: translateX(36px); }
.slide-forward-leave-to { opacity: 0; transform: translateX(-36px); }
.slide-back-enter-from { opacity: 0; transform: translateX(-36px); }
.slide-back-leave-to { opacity: 0; transform: translateX(36px); }

@media (max-width: 1000px) {
  .slide-stage { aspect-ratio: auto; min-height: 760px; }
  .opening-grid, .cheap-code-grid { gap: 36px; }
  .architecture-layout { grid-template-columns: .85fr 42px 1.15fr; gap: 12px; }
  .connection span { display: none; }
}

@media (max-width: 760px) {
  .deck-view { padding: 82px 0 96px; }
  .deck-topbar, .deck-shell { width: calc(100% - 24px); }
  .deck-topbar { grid-template-columns: 1fr auto; }
  .deck-topbar > span:nth-child(2) { display: none; }
  .slide-stage { min-height: 0; padding: 30px 22px 84px; border-radius: 20px; }
  .slide-stage h1 { font-size: 54px; }
  .slide-stage h2 { font-size: 46px; }
  .slide-thesis { position: static; margin-top: 38px; }
  .opening-grid, .cheap-code-grid, .people-layout, .not-new-grid, .architecture-layout { grid-template-columns: 1fr; }
  .change-board, .cheap-code-grid blockquote { margin-top: 8px; }
  .after-code { flex-wrap: wrap; }
  .slide-heading-row { flex-direction: column; }
  .segmented-control { align-self: stretch; }
  .segmented-control button { flex: 1; }
  .lifecycle-canvas { margin-top: 44px; grid-template-columns: 1fr; }
  .life-arrow { transform: rotate(90deg); text-align: center; }
  .loop-line, .finish-line { position: static; width: 100%; margin-top: 10px; }
  .loop-line { height: 54px; }
  .people-layout { gap: 18px; }
  .shift-arrow { transform: rotate(90deg); text-align: center; }
  .problem-grid { grid-template-columns: 1fr; }
  .problem-grid article:nth-child(n) { grid-column: auto; min-height: 0; }
  .amplifier { transform: rotate(90deg); }
  .connection { justify-content: center; transform: rotate(90deg); }
  .network-boundary { min-height: 390px; }
  .architecture-caption { margin-top: 30px; }
}

@media (prefers-reduced-motion: reduce) {
  .slide-forward-enter-active, .slide-forward-leave-active, .slide-back-enter-active, .slide-back-leave-active { transition: none; }
  .nativa-builder, .loop-line { animation: none; }
}
</style>

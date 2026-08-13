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
            <div class="waterfall-opening">
              <div class="waterfall-copy">
                <div class="slide-kicker">01 · Un cambio de época</div>
                <h1>El software cambió de un día para otro.</h1>
                <p class="lead">Más personas pueden iniciar y modificar un producto. Empezar requiere menos ceremonia; sostener lo construido sigue exigiendo disciplina.</p>
                <div class="participant-stream">
                  <small>Ahora construyen</small>
                  <p><span>CEO</span><i /> <span>Diseño</span><i /> <span>Programación</span><i /> <span>Seguridad</span><i /> <span>Operación</span><i /> <span>Expertos</span></p>
                </div>
              </div>
              <div class="waterfall-visual" aria-label="Cascada desde prácticas que ya no son necesarias hacia responsabilidades que permanecen">
                <div class="waterfall-source">
                  <small>Podemos empezar sin</small>
                  <s>Requerimientos al 100%</s>
                  <s>Diseño cerrado</s>
                </div>
                <div class="waterfall-ribbons" aria-hidden="true"><i /><i /><i /><i /><i /></div>
                <div class="waterfall-pool">
                  <small>Sigue siendo necesario</small>
                  <strong class="pool-maintain">Mantenimiento</strong>
                  <strong class="pool-security">Seguridad</strong>
                  <strong class="pool-governance">Gobernanza</strong>
                  <strong class="pool-coordinate">Coordinación</strong>
                </div>
              </div>
            </div>
            <p class="slide-thesis">Podemos empezar antes. No podemos dejar de cuidar lo que construimos.</p>
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
              <p class="lifecycle-story">{{ lifecycleMode === 'linear' ? 'Una idea avanza hasta convertirse en una primera versión.' : 'Cada versión descubre nuevas necesidades y vuelve a entrar al ciclo.' }}</p>
              <div class="life-node requirements"><span>01</span><strong>Requerimientos</strong><small>Qué necesitamos</small></div>
              <i class="life-arrow arrow-one">→</i>
              <div class="life-node design"><span>02</span><strong>Diseño</strong><small>Cómo funcionará</small></div>
              <i class="life-arrow arrow-two">→</i>
              <div class="life-node build"><span>03</span><strong>Construcción</strong><small>Convertirlo en código</small></div>
              <i class="life-arrow arrow-three">→</i>
              <div class="life-node maintain" :class="{ 'first-version': lifecycleMode === 'linear' }">
                <span>04</span>
                <strong>{{ lifecycleMode === 'linear' ? 'Primera versión' : 'Mantenimiento' }}</strong>
                <small>{{ lifecycleMode === 'linear' ? 'Parece el final' : 'Nuevas necesidades' }}</small>
              </div>
              <div v-if="lifecycleMode === 'real'" class="loop-line"><span>Feedback · cambios · aprendizaje</span></div>
              <div v-else class="finish-line"><span>La idea imaginada</span><strong>✓ Listo</strong></div>
            </div>
            <p class="slide-thesis">La versión 1 no es la versión final. Construcción y mantenimiento forman un loop que nunca deja de evolucionar.</p>
          </template>

          <template v-else-if="currentSlide === 3">
            <div class="slide-heading-row problems-heading">
              <div>
                <div class="slide-kicker">04 · La problemática</div>
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

          <template v-else-if="currentSlide === 4">
            <div class="slide-kicker">05 · Lo que cambió</div>
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

          <template v-else-if="currentSlide === 5">
            <div class="benefits-layout">
              <div class="benefits-copy">
                <div class="slide-kicker">06 · La promesa de Nativa</div>
                <h2>Más velocidad,<br>sin perder control.</h2>
                <p>Nativa convierte cambios aislados en un producto que todo el equipo puede entender, probar y hacer crecer.</p>
              </div>

              <div class="benefits-orbit" aria-label="Cinco beneficios de Nativa">
                <div class="benefit-center" aria-hidden="true">
                  <img :src="asset('brand/nativa-mark.svg')" alt="">
                  <strong>Nativa</strong>
                  <span>un solo sistema</span>
                </div>
                <article v-for="benefit in benefits" :key="benefit.number" class="benefit-item">
                  <span>{{ benefit.number }}</span>
                  <h3>{{ benefit.title }}</h3>
                  <p>{{ benefit.body }}</p>
                </article>
              </div>
            </div>
            <p class="slide-thesis">Nativa no reemplaza las prácticas que hacen confiable al software. Las vuelve accesibles para todos los que ahora pueden construirlo.</p>
          </template>

          <template v-else>
            <div class="slide-heading-row architecture-heading">
              <div>
                <div class="slide-kicker">07 · Cómo funciona</div>
                <h2>Desde tu escritorio, Nativa conecta todo.</h2>
              </div>
              <div class="segmented-control infra-control" role="group" aria-label="Elegir dónde vive la infraestructura">
                <button :class="{ active: infraMode === 'cloud' }" @click="infraMode = 'cloud'">Operada por Nativa</button>
                <button :class="{ active: infraMode === 'client' }" @click="infraMode = 'client'">En tu empresa</button>
              </div>
            </div>

            <div class="architecture-layout">
              <div class="desktop-side">
                <p class="diagram-label">Nativa Desktop</p>
                <div class="mini-laptop">
                  <div class="laptop-screen">
                    <span class="laptop-camera" aria-hidden="true" />
                    <img :src="asset('product/vision-desktop.png')" alt="Nativa Desktop mostrando el mapa de infraestructura">
                  </div>
                  <div class="laptop-base" aria-hidden="true"><i /></div>
                </div>
                <p class="laptop-caption">Pides un cambio desde tu computadora.</p>
              </div>

              <div class="connection-rail" aria-hidden="true">
                <span>conexión cifrada</span>
                <i />
              </div>

              <div class="network-boundary" :class="`network-${infraMode}`">
                <div class="network-label">
                  <span class="network-emblem" aria-hidden="true">{{ infraMode === 'cloud' ? 'N' : '⌂' }}</span>
                  <div>
                    <strong>{{ infraMode === 'cloud' ? 'Nativa Cloud' : 'Red de tu empresa' }}</strong>
                    <small>{{ infraMode === 'cloud' ? 'Nativa la crea, conecta y opera' : 'Tus datos y políticas permanecen aquí' }}</small>
                  </div>
                </div>

                <div class="network-owner">{{ infraMode === 'cloud' ? 'Red Nativa' : 'Propiedad del cliente' }}</div>

                <div class="nativa-hub">
                  <img :src="asset('brand/nativa-mark.svg')" alt="">
                  <span>{{ infraMode === 'cloud' ? 'Nativa opera aquí' : 'Nativa instala aquí' }}</span>
                </div>

                <div class="route route-vault" aria-hidden="true"><i /></div>
                <div class="route route-workbench" aria-hidden="true"><i /></div>
                <div class="route route-storage" aria-hidden="true"><i /></div>
                <div class="route route-production" aria-hidden="true"><i /></div>

                <div class="server-node vault">
                  <div class="server-orb"><span>V</span></div>
                  <strong>Vault</strong><small>Secretos</small>
                </div>
                <div class="server-node workbench">
                  <div class="server-orb"><span>W</span></div>
                  <strong>Workbench</strong><small>Construcción y pruebas</small>
                </div>
                <div class="server-node storage">
                  <div class="server-orb"><span>S</span></div>
                  <strong>Storage</strong><small>Documentos</small>
                </div>
                <div class="server-node production">
                  <div class="server-orb"><span>P</span></div>
                  <strong>Producción</strong><small>Usuarios reales</small>
                </div>
              </div>
            </div>
            <p class="architecture-caption">{{ infraMode === 'cloud' ? 'La infraestructura vive en Nativa. Nosotros aprovisionamos, conectamos y operamos cada componente.' : 'La infraestructura vive contigo. Nativa instala los mismos componentes dentro de tu red, sin sacar tus datos de ella.' }}</p>
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

const benefits = [
  { number: '01', title: 'Construir juntos', body: 'Clientes, expertos y equipo trabajan sobre el mismo producto.' },
  { number: '02', title: 'Cambiar sin miedo', body: 'Cada propuesta vive aislada hasta ser revisada y aprobada.' },
  { number: '03', title: 'Conservar contexto', body: 'Decisiones, documentos y aprendizajes permanecen con el proyecto.' },
  { number: '04', title: 'Proteger lo sensible', body: 'Datos, permisos y secretos se mantienen bajo tus políticas.' },
  { number: '05', title: 'Llegar a producción', body: 'Validación, historia y publicación forman un solo flujo.' },
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

.slide-1 { border-color: rgba(255,255,255,.08); background: radial-gradient(circle at 86% 12%, rgba(0,184,200,.16), transparent 26%), radial-gradient(circle at 74% 78%, rgba(121,84,216,.2), transparent 34%), #10110f; color: #f7f3ea; }
.slide-1 .slide-kicker { color: #bca5ff; }
.slide-1 .lead { color: #aaa79e; }
.slide-1 .slide-thesis { border-color: rgba(255,255,255,.14); }
.waterfall-opening { display: grid; min-height: 520px; grid-template-columns: 1.08fr .92fr; gap: clamp(36px, 5vw, 76px); align-items: center; }
.waterfall-copy h1 { margin-top: 34px; }
.participant-stream { margin-top: 42px; }
.participant-stream small { display: block; margin-bottom: 12px; color: #858279; font-family: var(--font-mono); font-size: 8px; font-weight: 650; letter-spacing: .13em; text-transform: uppercase; }
.participant-stream p { display: flex; max-width: 580px; flex-wrap: wrap; align-items: center; gap: 8px; color: #e8e4db; font-family: var(--font-display); font-size: 19px; line-height: 1.25; }
.participant-stream i { width: 4px; height: 4px; border-radius: 50%; background: #ec3f95; }
.participant-stream i:nth-of-type(2) { background: #00b8c8; }
.participant-stream i:nth-of-type(3) { background: #f4c735; }
.participant-stream i:nth-of-type(4) { background: #7954d8; }
.participant-stream i:nth-of-type(5) { background: #58ae4d; }
.waterfall-visual { position: relative; height: 500px; }
.waterfall-source { position: absolute; z-index: 4; top: 8px; right: 0; left: 0; text-align: center; }
.waterfall-source small { display: block; margin-bottom: 10px; color: #a19e95; font-family: var(--font-mono); font-size: 8px; letter-spacing: .12em; text-transform: uppercase; }
.waterfall-source s { margin: 0 8px; color: #d8d4ca; font-family: var(--font-display); font-size: 16px; text-decoration-color: #ff6b62; text-decoration-thickness: 1.5px; }
.waterfall-ribbons { position: absolute; z-index: 2; top: 75px; left: 50%; width: 180px; height: 292px; transform: translateX(-50%); }
.waterfall-ribbons i { position: absolute; top: 0; display: block; width: 34px; height: 280px; border-radius: 48% 52% 60% 40% / 7% 9% 91% 93%; background: linear-gradient(180deg, #00b8c8, #1469bd 45%, #7954d8); filter: drop-shadow(0 18px 22px rgba(0,0,0,.2)); animation: waterfallFlow 2.8s ease-in-out infinite; }
.waterfall-ribbons i:nth-child(1) { left: 2px; height: 246px; transform: rotate(5deg); }
.waterfall-ribbons i:nth-child(2) { top: 13px; left: 35px; height: 272px; background: linear-gradient(180deg, #1469bd, #7954d8 52%, #ec3f95); animation-delay: -.5s; }
.waterfall-ribbons i:nth-child(3) { top: 4px; left: 70px; height: 286px; background: linear-gradient(180deg, #ec3f95, #ff6b2c 54%, #f4c735); animation-delay: -1s; }
.waterfall-ribbons i:nth-child(4) { top: 18px; left: 105px; height: 258px; background: linear-gradient(180deg, #ff6b2c, #f4c735 50%, #58ae4d); animation-delay: -1.5s; }
.waterfall-ribbons i:nth-child(5) { left: 138px; height: 238px; transform: rotate(-5deg); background: linear-gradient(180deg, #f4c735, #58ae4d 56%, #00b8c8); animation-delay: -2s; }
.waterfall-pool { position: absolute; z-index: 3; right: 2%; bottom: 4px; left: 2%; height: 154px; border-radius: 50%; background: radial-gradient(ellipse at center, rgba(0,184,200,.44), rgba(20,105,189,.3) 36%, rgba(121,84,216,.18) 60%, transparent 72%); }
.waterfall-pool::before { position: absolute; top: 20px; right: 9%; left: 9%; height: 1px; content: ''; background: linear-gradient(90deg, transparent, rgba(255,255,255,.65), transparent); box-shadow: 0 18px 0 rgba(255,255,255,.18), 0 38px 0 rgba(255,255,255,.1); }
.waterfall-pool small { position: absolute; top: 38px; left: 50%; width: max-content; transform: translateX(-50%); color: #dbd7ce; font-family: var(--font-mono); font-size: 7px; letter-spacing: .12em; text-transform: uppercase; }
.waterfall-pool strong { position: absolute; color: white; font-family: var(--font-display); font-size: 18px; font-weight: 500; letter-spacing: -.02em; text-shadow: 0 2px 12px rgba(0,0,0,.3); }
.pool-maintain { bottom: 33px; left: 4%; }
.pool-security { right: 7%; bottom: 33px; }
.pool-governance { bottom: 4px; left: 26%; }
.pool-coordinate { right: 22%; bottom: 4px; }
@keyframes waterfallFlow { 50% { transform: translateY(8px) scaleY(1.025); filter: drop-shadow(0 24px 28px rgba(0,0,0,.28)); } }

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
.lifecycle-canvas { position: relative; display: grid; margin-top: 38px; padding: 68px 30px 94px; overflow: hidden; border: 1px solid rgba(17,17,15,.12); border-radius: 26px; grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr; gap: 14px; align-items: center; background: #fff; box-shadow: 0 28px 70px -58px rgba(17,17,15,.52); }
.lifecycle-canvas::before { position: absolute; z-index: 0; top: 53%; right: 7%; left: 7%; height: 2px; content: ''; background: linear-gradient(90deg, #e8c56f, #df8db7, #9b7ce5, #69b8b7); opacity: .52; }
.lifecycle-story { position: absolute; top: 20px; left: 30px; margin: 0; color: var(--muted); font-family: var(--font-mono); font-size: 9px; letter-spacing: .08em; text-transform: uppercase; }
.life-node { position: relative; z-index: 2; min-height: 158px; padding: 20px; border: 1px solid rgba(17,17,15,.1); border-radius: 20px; background: #f6eedf; box-shadow: 0 18px 40px -34px rgba(17,17,15,.45); transition: transform 360ms ease, background-color 360ms ease, color 360ms ease, box-shadow 360ms ease; }
.life-node.design { background: #f4e1eb; }
.life-node.build { background: #e9e1fa; }
.life-node.maintain { background: #dcefee; }
.life-node span { display: grid; width: 28px; height: 28px; place-items: center; border-radius: 50%; background: rgba(255,255,255,.72); color: var(--purple); font-family: var(--font-mono); font-size: 8px; }
.life-node strong, .life-node small { display: block; }
.life-node strong { margin-top: 25px; font-family: var(--font-display); font-size: 24px; font-weight: 500; line-height: .98; }
.life-node small { margin-top: 6px; color: var(--muted); font-size: 11px; }
.life-arrow { position: relative; z-index: 3; display: grid; width: 34px; height: 34px; place-items: center; border: 1px solid rgba(17,17,15,.1); border-radius: 50%; background: white; color: #6f46d9; font-style: normal; box-shadow: 0 8px 20px -16px rgba(17,17,15,.7); }
.lifecycle-real .build, .lifecycle-real .maintain { transform: translateY(-8px); box-shadow: 0 25px 45px -32px rgba(86,55,157,.55); }
.first-version { transform: scale(1.055); border-color: #11110f; background: #11110f !important; color: white; box-shadow: 0 24px 50px -32px rgba(17,17,15,.8); }
.first-version span { background: rgba(255,255,255,.14); color: white; }
.first-version small { color: rgba(255,255,255,.62); }
.loop-line { position: absolute; z-index: 1; right: 30px; bottom: 22px; width: calc(50% - 44px); height: 54px; border-right: 2px solid #7954d8; border-bottom: 2px solid #7954d8; border-left: 2px solid #7954d8; border-radius: 0 0 24px 24px; animation: loopGlow 1.8s ease-in-out infinite; }
.loop-line::before { position: absolute; top: -17px; left: -7px; content: '↑'; color: #7954d8; font-weight: 800; }
.loop-line span { position: absolute; right: 18px; bottom: 12px; color: #6b48c5; font-family: var(--font-mono); font-size: 8px; letter-spacing: .08em; text-transform: uppercase; }
.finish-line { position: absolute; z-index: 3; right: 30px; bottom: 24px; display: flex; align-items: center; gap: 12px; padding: 10px 14px; border: 1px solid #9ac9a7; border-radius: 999px; background: #e1f1e5; }
.finish-line span { color: #4f6655; font-size: 9px; }
.finish-line strong { color: #176b39; font-size: 11px; }
@keyframes loopGlow { 50% { border-color: #ec3f95; } }

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

.slide-5 { background: #121210; color: #f8f6ef; }
.slide-5 .slide-kicker { color: #bba4ff; }
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
.slide-5 .slide-thesis { border-color: rgba(255,255,255,.13); }

.slide-6 { border-color: rgba(255,255,255,.1); background: radial-gradient(circle at 78% 48%, rgba(0,184,200,.14), transparent 27%), radial-gradient(circle at 48% 5%, rgba(236,63,149,.12), transparent 28%), radial-gradient(circle at 8% 92%, rgba(244,199,53,.1), transparent 24%), #17131f; color: #f8f5ee; }
.slide-6 .slide-kicker { color: #c8b6ff; }
.slide-6 .slide-thesis { border-color: rgba(255,255,255,.14); }
.benefits-layout { display: grid; min-height: 510px; grid-template-columns: .72fr 1.28fr; gap: clamp(30px, 4vw, 72px); align-items: center; }
.benefits-copy h2 { max-width: 520px; margin: 28px 0 24px; font-size: clamp(52px, 5.2vw, 76px); }
.benefits-copy > p { max-width: 440px; margin: 0; color: #b7b0bf; font-size: 15px; line-height: 1.7; }
.benefits-orbit { position: relative; min-height: 510px; }
.benefits-orbit::before, .benefits-orbit::after { position: absolute; top: 50%; left: 50%; content: ''; border: 1px solid rgba(255,255,255,.13); border-radius: 50%; transform: translate(-50%, -50%); }
.benefits-orbit::before { width: 330px; height: 330px; }
.benefits-orbit::after { width: 455px; height: 455px; border-color: rgba(200,182,255,.08); }
.benefit-center { position: absolute; z-index: 3; top: 50%; left: 50%; display: grid; width: 154px; height: 154px; place-items: center; align-content: center; border-radius: 50%; background: #f7f3e9; color: #151217; box-shadow: 0 0 0 12px rgba(121,84,216,.12), 0 28px 70px -24px rgba(0,0,0,.7); transform: translate(-50%, -50%); }
.benefit-center img { width: 54px; height: 54px; object-fit: contain; }
.benefit-center strong, .benefit-center span { display: block; }
.benefit-center strong { margin-top: 8px; font-family: var(--font-display); font-size: 20px; line-height: 1; }
.benefit-center span { margin-top: 5px; color: #777078; font-family: var(--font-mono); font-size: 7px; letter-spacing: .12em; text-transform: uppercase; }
.benefit-item { position: absolute; z-index: 4; width: 180px; }
.benefit-item > span { color: #f4c735; font-family: var(--font-mono); font-size: 8px; letter-spacing: .12em; }
.benefit-item h3 { margin: 8px 0 7px; font-family: var(--font-display); font-size: 23px; font-weight: 500; letter-spacing: -.025em; line-height: 1; }
.benefit-item p { margin: 0; color: #aaa3b1; font-size: 10px; line-height: 1.5; }
.benefit-item:nth-child(2) { top: 3%; left: 4%; }
.benefit-item:nth-child(3) { top: 5%; right: 0; }
.benefit-item:nth-child(4) { top: 44%; right: -2%; }
.benefit-item:nth-child(5) { right: 10%; bottom: 0; }
.benefit-item:nth-child(6) { bottom: 2%; left: 0; }
.benefit-item:nth-child(2) > span { color: #00b8c8; }
.benefit-item:nth-child(3) > span { color: #ec3f95; }
.benefit-item:nth-child(4) > span { color: #ff7a34; }
.benefit-item:nth-child(5) > span { color: #58ae4d; }
.benefit-item:nth-child(6) > span { color: #bba4ff; }

.architecture-heading h2 { max-width: 760px; font-size: clamp(44px, 4.5vw, 64px); }
.infra-control { margin-top: 6px; }
.architecture-layout { position: relative; display: grid; min-height: 350px; margin-top: 22px; grid-template-columns: .72fr 1.28fr; gap: clamp(62px, 7vw, 94px); align-items: center; }
.desktop-side { position: relative; z-index: 4; }
.diagram-label { margin-bottom: 12px; color: var(--muted); font-family: var(--font-mono); font-size: 8px; letter-spacing: .14em; text-align: center; text-transform: uppercase; }
.mini-laptop { width: min(360px, 100%); margin: 0 auto; perspective: 900px; }
.laptop-screen { position: relative; padding: 9px 9px 12px; border: 1px solid #3e3f43; border-radius: 17px 17px 10px 10px; background: linear-gradient(145deg, #26272a, #0f1012); box-shadow: 0 28px 54px -30px rgba(17,17,15,.8), inset 0 0 0 1px rgba(255,255,255,.06); transform: rotateY(2deg); transform-origin: right center; }
.laptop-screen::after { position: absolute; inset: 9px 9px 12px; content: ''; border-radius: 8px; background: linear-gradient(120deg, rgba(255,255,255,.08), transparent 28%); pointer-events: none; }
.laptop-camera { position: absolute; z-index: 2; top: 3px; left: 50%; width: 3px; height: 3px; border-radius: 50%; background: #707179; transform: translateX(-50%); }
.laptop-screen img { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; border-radius: 8px; }
.laptop-base { position: relative; width: 112%; height: 18px; margin: -1px 0 0 -6%; border-radius: 2px 2px 18px 18px; background: linear-gradient(180deg, #dedfe1, #919398 58%, #c8c9cc); box-shadow: 0 15px 25px -18px rgba(17,17,15,.8); clip-path: polygon(5% 0, 95% 0, 100% 70%, 97% 100%, 3% 100%, 0 70%); }
.laptop-base i { position: absolute; top: 1px; left: 50%; width: 21%; height: 4px; border-radius: 0 0 7px 7px; background: #74767b; transform: translateX(-50%); }
.laptop-caption { margin: 17px 0 0; color: var(--muted); font-size: 10px; text-align: center; }
.connection-rail { position: absolute; z-index: 5; top: 54%; left: 28%; width: 21%; height: 1px; background: linear-gradient(90deg, rgba(121,84,216,.2), #7954d8 45%, rgba(121,84,216,.32)); }
.connection-rail span { position: absolute; top: -23px; left: 50%; width: max-content; color: #716b79; font-family: var(--font-mono); font-size: 7px; letter-spacing: .1em; text-transform: uppercase; transform: translateX(-50%); }
.connection-rail i { position: absolute; top: -3px; left: 0; width: 48px; height: 7px; border-radius: 99px; background: linear-gradient(90deg, transparent, #9e83ee 35%, #f8f4ff 70%, transparent); filter: drop-shadow(0 0 7px #7954d8); animation: signalTravel 2.8s ease-in-out infinite; }
.network-boundary { position: relative; min-height: 350px; overflow: hidden; border: 1.5px dashed #8d69e8; border-radius: 54px 84px 48px 72px; background: radial-gradient(circle at 12% 52%, rgba(121,84,216,.2), transparent 24%), radial-gradient(circle at 82% 76%, rgba(236,63,149,.1), transparent 31%), #eee9f8; box-shadow: 0 28px 70px -50px rgba(73,47,133,.62); transition: background 420ms ease, border-color 420ms ease, border-radius 420ms ease; }
.network-boundary::before { position: absolute; inset: 12px; content: ''; border: 1px solid rgba(121,84,216,.1); border-radius: 45px 72px 42px 62px; pointer-events: none; }
.network-boundary::after { position: absolute; right: 22px; bottom: -8px; content: 'NATIVA CLOUD'; color: rgba(121,84,216,.055); font-family: var(--font-display); font-size: 56px; font-weight: 700; letter-spacing: -.04em; white-space: nowrap; }
.network-client { border-color: #228b88; border-radius: 36px 74px 58px 48px; background: radial-gradient(circle at 12% 52%, rgba(22,123,127,.18), transparent 24%), radial-gradient(circle at 85% 15%, rgba(244,199,53,.12), transparent 28%), #e3efec; box-shadow: 0 28px 70px -50px rgba(22,123,127,.56); }
.network-client::before { border-color: rgba(22,123,127,.13); }
.network-client::after { content: 'TU EMPRESA'; color: rgba(22,123,127,.06); }
.network-label { position: absolute; z-index: 6; top: 20px; left: 22px; display: flex; align-items: center; gap: 10px; }
.network-label div, .network-label strong, .network-label small { display: block; }
.network-label strong { font-size: 12px; }
.network-label small { margin-top: 3px; color: var(--muted); font-size: 8px; }
.network-emblem { display: grid; width: 34px; height: 34px; place-items: center; border-radius: 50%; background: #7954d8; color: white; font-family: var(--font-display); font-size: 14px; font-weight: 750; box-shadow: 0 8px 22px -12px #7954d8; }
.network-client .network-emblem { background: #167b7f; box-shadow: 0 8px 22px -12px #167b7f; }
.network-owner { position: absolute; z-index: 6; top: 29px; right: 25px; color: #7954d8; font-family: var(--font-mono); font-size: 7px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
.network-client .network-owner { color: #167b7f; }
.nativa-hub { position: absolute; z-index: 6; top: 53%; left: 8%; width: 88px; text-align: center; transform: translateY(-50%); }
.nativa-hub img { display: block; width: 58px; height: 58px; margin: 0 auto; padding: 7px; object-fit: contain; border-radius: 50%; background: #faf8f2; box-shadow: 0 0 0 8px rgba(121,84,216,.12), 0 16px 28px -18px rgba(17,17,15,.65); animation: hubGlow 2.8s ease-in-out infinite; }
.network-client .nativa-hub img { box-shadow: 0 0 0 8px rgba(22,123,127,.12), 0 16px 28px -18px rgba(17,17,15,.65); }
.nativa-hub span { display: block; margin-top: 9px; color: #332d3c; font-size: 8px; font-weight: 750; }
.route { position: absolute; z-index: 2; top: 53%; left: 15%; height: 1px; background: linear-gradient(90deg, #8f73dd, rgba(143,115,221,.24)); transform-origin: left center; }
.network-client .route { background: linear-gradient(90deg, #218783, rgba(33,135,131,.2)); }
.route i { position: absolute; top: -4px; left: 0; width: 8px; height: 8px; border: 2px solid white; border-radius: 50%; background: #7954d8; box-shadow: 0 0 10px 4px rgba(121,84,216,.46); opacity: 0; animation: routeTravel 5.6s ease-in-out infinite; }
.network-client .route i { background: #167b7f; box-shadow: 0 0 10px 4px rgba(22,123,127,.4); }
.route-vault { width: 29%; transform: rotate(-27deg); }
.route-workbench { width: 72%; transform: rotate(-7deg); }
.route-storage { width: 28%; transform: rotate(29deg); }
.route-production { width: 70%; transform: rotate(12deg); }
.route-workbench i { animation-delay: .7s; }
.route-storage i { animation-delay: 1.4s; }
.route-production i { animation-delay: 2.1s; }
.server-node { position: absolute; z-index: 5; width: 124px; }
.server-node strong, .server-node small { display: block; }
.server-node strong { margin-top: 8px; font-size: 10px; }
.server-node small { margin-top: 2px; color: var(--muted); font-size: 8px; }
.server-orb { display: grid; width: 52px; height: 52px; place-items: center; border: 1px solid rgba(121,84,216,.2); border-radius: 50%; background: rgba(250,249,245,.94); color: #7954d8; box-shadow: 0 12px 24px -18px rgba(17,17,15,.6); animation: serverWake 5.6s ease-in-out infinite; }
.server-orb span { font-family: var(--font-mono); font-size: 10px; font-weight: 800; }
.server-node.vault { top: 84px; left: 39%; }
.server-node.workbench { top: 111px; right: 3%; }
.server-node.storage { bottom: 27px; left: 36%; }
.server-node.production { right: 7%; bottom: 24px; }
.workbench .server-orb { color: #1469bd; animation-delay: .7s; }
.storage .server-orb { color: #00a3a9; animation-delay: 1.4s; }
.production .server-orb { color: #328a42; animation-delay: 2.1s; }
.architecture-caption { max-width: 820px; margin: 16px 0 0; color: var(--muted); font-size: 11px; line-height: 1.55; }
@keyframes signalTravel { 0% { left: 0; opacity: 0; } 12% { opacity: 1; } 76% { left: calc(100% - 48px); opacity: 1; } 100% { left: calc(100% - 48px); opacity: 0; } }
@keyframes routeTravel { 0%, 10% { left: 0; opacity: 0; } 16% { opacity: 1; } 38% { left: calc(100% - 8px); opacity: 1; } 44%, 100% { left: calc(100% - 8px); opacity: 0; } }
@keyframes serverWake { 0%, 30%, 100% { border-color: rgba(121,84,216,.2); background: rgba(250,249,245,.94); box-shadow: 0 12px 24px -18px rgba(17,17,15,.6); transform: scale(1); } 38%, 50% { border-color: currentColor; background: white; box-shadow: 0 0 0 8px rgba(121,84,216,.11), 0 0 28px 4px rgba(121,84,216,.38); transform: scale(1.08); } }
@keyframes hubGlow { 50% { transform: scale(1.05); filter: brightness(1.06); } }

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
  .waterfall-opening, .cheap-code-grid { gap: 36px; }
  .benefits-layout { gap: 24px; grid-template-columns: .66fr 1.34fr; }
  .benefit-item { width: 155px; }
  .architecture-layout { grid-template-columns: .7fr 1.3fr; gap: 54px; }
  .connection-rail { left: 27%; width: 22%; }
  .connection-rail span { display: none; }
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
  .waterfall-opening, .cheap-code-grid, .not-new-grid, .benefits-layout, .architecture-layout { grid-template-columns: 1fr; }
  .waterfall-opening { min-height: 0; }
  .waterfall-visual { height: 510px; margin-top: 10px; }
  .cheap-code-grid blockquote { margin-top: 8px; }
  .after-code { flex-wrap: wrap; }
  .slide-heading-row { flex-direction: column; }
  .segmented-control { align-self: stretch; }
  .segmented-control button { flex: 1; }
  .lifecycle-canvas { margin-top: 44px; grid-template-columns: 1fr; }
  .life-arrow { transform: rotate(90deg); text-align: center; }
  .loop-line, .finish-line { position: static; width: 100%; margin-top: 10px; }
  .loop-line { height: 54px; }
  .problem-grid { grid-template-columns: 1fr; }
  .problem-grid article:nth-child(n) { grid-column: auto; min-height: 0; }
  .amplifier { transform: rotate(90deg); }
  .benefits-orbit { display: grid; min-height: 0; margin-top: 24px; grid-template-columns: 1fr 1fr; gap: 24px 18px; }
  .benefits-orbit::before, .benefits-orbit::after { display: none; }
  .benefit-center { position: relative; top: auto; left: auto; width: 132px; height: 132px; grid-column: 1 / -1; justify-self: center; transform: none; }
  .benefit-item:nth-child(n) { position: static; width: auto; }
  .benefit-item h3 { font-size: 21px; }
  .benefit-item p { font-size: 11px; }
  .architecture-layout { gap: 0; margin-top: 34px; }
  .mini-laptop { width: min(360px, 94%); }
  .connection-rail { position: relative; top: auto; left: auto; width: 70px; margin: 34px 0; justify-self: center; transform: rotate(90deg); }
  .network-boundary { min-height: 500px; }
  .network-owner { display: none; }
  .nativa-hub { left: 3%; }
  .server-node.vault { top: 94px; left: 38%; }
  .server-node.workbench { top: 184px; right: 0; }
  .server-node.storage { bottom: 82px; left: 34%; }
  .server-node.production { right: 2%; bottom: 14px; }
  .route-vault { width: 37%; transform: rotate(-38deg); }
  .route-workbench { width: 77%; transform: rotate(-9deg); }
  .route-storage { width: 34%; transform: rotate(30deg); }
  .route-production { width: 75%; transform: rotate(18deg); }
  .architecture-caption { margin-top: 30px; }
}

@media (prefers-reduced-motion: reduce) {
  .slide-forward-enter-active, .slide-forward-leave-active, .slide-back-enter-active, .slide-back-leave-active { transition: none; }
  .connection-rail i, .route i, .server-orb, .nativa-hub img, .loop-line { animation: none; }
}
</style>

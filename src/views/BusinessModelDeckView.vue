<template>
  <div class="business-deck-view" @touchstart.passive="startTouch" @touchend.passive="endTouch">
    <div class="business-backdrop" aria-hidden="true" />

    <div class="business-topbar">
      <router-link to="/content" class="business-back">← Content</router-link>
      <span>Business model de Nativa</span>
      <span>{{ slideNumber }} / {{ slides.length }}</span>
    </div>

    <main class="business-shell">
      <Transition :name="transitionName" mode="out-in">
        <section :key="currentSlide" class="business-slide" :class="'business-slide-' + (currentSlide + 1)">
          <template v-if="currentSlide === 0">
            <div class="slide-heading mode-heading">
              <div>
                <p class="slide-kicker">01 · Dos tipos de cliente</p>
                <h1>La misma plataforma.<br>Dos decisiones de infraestructura.</h1>
              </div>
              <p class="heading-note">La diferencia no es el tamaño del cliente. Es quién opera la infraestructura y dónde deben vivir los datos.</p>
            </div>

            <div class="mode-routes">
              <article class="mode-route cloud-route">
                <p class="route-label">Nativa Cloud</p>
                <h2>“Quiero empezar<br>y que Nativa se encargue.”</h2>
                <ul>
                  <li>Infraestructura administrada</li>
                  <li>Configuración automática</li>
                  <li>Lista para usar desde el primer día</li>
                </ul>
                <span class="route-owner">Operada por Nativa</span>
              </article>

              <div class="route-origin" aria-hidden="true">
                <span class="origin-line origin-left" />
                <span class="origin-line origin-right" />
                <div class="origin-mark"><img :src="asset('brand/nativa-mark.svg')" alt=""></div>
                <small>Una plataforma</small>
              </div>

              <article class="mode-route atlas-route">
                <p class="route-label">Nativa Atlas</p>
                <h2>“Quiero Nativa dentro<br>de mi organización.”</h2>
                <ul>
                  <li>Servidores y políticas propios</li>
                  <li>Datos dentro de su perímetro</li>
                  <li>Implementación acompañada</li>
                </ul>
                <span class="route-owner">Operada por el cliente</span>
              </article>
            </div>

            <p class="slide-footer-note"><i /> Cloud monetiza velocidad administrada. Atlas monetiza control.</p>
          </template>

          <template v-else-if="currentSlide === 1">
            <div class="slide-heading tiers-heading">
              <div>
                <p class="slide-kicker">02 · Tiers de Cloud</p>
                <h2>Cloud empieza pequeño y gana eficiencia al crecer.</h2>
              </div>
              <p class="assumption-note"><strong>{{ businessModelMeta.disclaimer }}</strong><br>{{ businessModelMeta.currency }} / mes · {{ businessModelMeta.updatedAt }}</p>
            </div>

            <p class="mobile-scroll-hint">Desliza para comparar todos los costos →</p>
            <div class="tier-ledger" role="table" aria-label="Tiers y costos de Nativa Cloud">
              <div class="tier-row tier-header" role="row">
                <span>Plan</span><span>Precio</span><span>Equipo</span><span>Costo variable</span><span>Costo / usuario activo</span><span>Margen</span>
              </div>
              <div v-for="tier in cloudTierRows" :key="tier.id" class="tier-row" :class="'tier-' + tier.id" role="row">
                <div class="tier-name"><small>{{ tier.purpose }}</small><strong>{{ tier.name }}</strong></div>
                <strong class="tier-price">{{ money(tier.monthlyPrice) }}<small>/ mes</small></strong>
                <span class="tier-team"><b>{{ tier.includedMembers }}</b> incluidos<br><small>{{ tier.activeMembers }} activos estimados</small></span>
                <span class="tier-cost"><b>{{ money(tier.totalCost, 1) }}</b><i :style="{ width: tier.costWidth + '%' }" /></span>
                <strong class="tier-unit">{{ money(tier.costPerActive, 2) }}</strong>
                <span class="tier-margin" :class="{ negative: tier.margin === null }">{{ tier.margin === null ? 'Adquisición' : tier.margin + '%' }}</span>
              </div>
            </div>

            <div class="cost-composition">
              <p><span class="dot infra-dot" /> Infraestructura</p>
              <p><span class="dot platform-dot" /> Servicios y consumo</p>
              <p><span class="dot service-dot" /> Operación y cobro</p>
              <strong>Costo por usuario activo = costo variable del plan ÷ usuarios activos estimados</strong>
            </div>
          </template>

          <template v-else-if="currentSlide === 2">
            <div class="slide-heading atlas-heading">
              <div>
                <p class="slide-kicker">03 · El cliente Atlas</p>
                <h2>Atlas no se vende por asiento.<br>Se vende por control.</h2>
              </div>
              <p class="heading-note">Para organizaciones que necesitan conservar sistemas, datos y permisos dentro de sus propias políticas.</p>
            </div>

            <div class="atlas-perimeter">
              <div class="perimeter-label">Perímetro de la organización</div>
              <article v-for="role in atlasRoles" :key="role.number" class="atlas-role">
                <span>{{ role.number }}</span>
                <h3>{{ role.title }}</h3>
                <p>{{ role.body }}</p>
              </article>
              <div class="atlas-center">
                <img :src="asset('brand/nativa-mark.svg')" alt="">
                <strong>Nativa Atlas</strong>
                <small>Instalada dentro</small>
              </div>
            </div>

            <div class="atlas-commercial" aria-label="Hipótesis comercial Atlas">
              <p>Hipótesis comercial</p>
              <div v-for="item in atlasCommercialModel" :key="item.label">
                <span>{{ item.label }}</span>
                <strong>{{ money(item.value) }}</strong>
                <small>{{ item.cadence }}</small>
              </div>
            </div>
          </template>

          <template v-else-if="currentSlide === 3">
            <div class="slide-heading projection-heading">
              <div>
                <p class="slide-kicker">04 · Próximos seis meses</p>
                <h2>No existe una sola proyección.<br>Existen supuestos.</h2>
              </div>
              <div class="scenario-switch" role="group" aria-label="Escenario de proyección">
                <button v-for="(scenario, key) in projectionScenarios" :key="key" type="button" :class="{ active: projectionMode === key }" @click="projectionMode = key">
                  {{ scenario.label }}
                </button>
              </div>
            </div>

            <div class="projection-layout">
              <div class="projection-summary">
                <p>{{ activeScenario.description }}</p>
                <div class="summary-metric summary-primary">
                  <span>Ingreso acumulado</span>
                  <strong>{{ compactMoney(projectionSummary.cumulative) }}</strong>
                </div>
                <div class="summary-pair">
                  <div><span>MRR de salida</span><strong>{{ compactMoney(projectionSummary.exitMrr) }}</strong></div>
                  <div><span>Margen bruto</span><strong>{{ activeScenario.grossMargin }}%</strong></div>
                </div>
                <div class="summary-pair">
                  <div><span>Cloud</span><strong>{{ projectionSummary.cloud }}</strong><small>cuentas</small></div>
                  <div><span>Atlas</span><strong>{{ projectionSummary.atlas }}</strong><small>contratos</small></div>
                </div>
              </div>

              <div class="projection-chart" aria-label="Ingresos mensuales proyectados">
                <div class="chart-guides" aria-hidden="true"><i /><i /><i /></div>
                <div v-for="row in projectionRows" :key="row.month" class="chart-column">
                  <strong>{{ compactMoney(row.total) }}</strong>
                  <div class="bar-space">
                    <div class="revenue-bar" :style="{ height: row.height + '%' }">
                      <i v-if="row.onboarding" class="onboarding-segment" :style="{ height: row.onboardingShare + '%' }" />
                      <i class="recurring-segment" :style="{ height: (100 - row.onboardingShare) + '%' }" />
                    </div>
                  </div>
                  <span>{{ row.month }}</span>
                  <small>{{ row.cloud }} C · {{ row.atlas }} A</small>
                </div>
              </div>
            </div>

            <div class="projection-legend">
              <span><i class="legend-recurring" /> Ingreso recurrente</span>
              <span><i class="legend-onboarding" /> Implementación Atlas</span>
              <p>Supuestos: ARPA Cloud {{ money(projectionAssumptions.cloudArpa) }} · MRR Atlas {{ money(projectionAssumptions.atlasMrr) }} · implementación {{ money(projectionAssumptions.atlasImplementation) }}</p>
            </div>
          </template>

          <template v-else-if="currentSlide === 4">
            <div class="slide-heading revenue-heading">
              <div>
                <p class="slide-kicker">05 · Ingresos futuros</p>
                <h2>El ingreso no termina<br>en la suscripción.</h2>
              </div>
              <p class="heading-note">Primero monetizamos el núcleo. Después, la operación que crece alrededor.</p>
            </div>

            <div class="revenue-roadmap">
              <div class="roadmap-line" aria-hidden="true"><i /></div>
              <article v-for="idea in futureRevenueIdeas" :key="idea.number" class="revenue-stop">
                <span class="stop-number">{{ idea.number }}</span>
                <small>{{ idea.horizon }}</small>
                <h3>{{ idea.title }}</h3>
                <p>{{ idea.body }}</p>
              </article>
            </div>

            <div class="revenue-expansion">
              <span>Cliente inicial</span><i />
              <strong>Más capacidad</strong><i />
              <strong>Más confianza</strong><i />
              <strong>Más gobernanza</strong>
            </div>
          </template>

          <template v-else>
            <div class="slide-heading costs-heading">
              <div>
                <p class="slide-kicker">06 · Estructura de costos</p>
                <h2>Una base fija.<br>Uso que crece con el cliente.</h2>
              </div>
              <p class="assumption-note light"><strong>{{ businessModelMeta.disclaimer }}</strong><br>{{ businessModelMeta.currency }} / mes</p>
            </div>

            <div class="costs-layout">
              <section class="fixed-ledger">
                <div class="cost-section-title"><span>Fijos</span><strong>{{ compactMoney(totalFixedCost) }} / mes</strong></div>
                <div v-for="item in fixedCosts" :key="item.label" class="fixed-row">
                  <span>{{ item.label }}</span>
                  <i><b :style="{ width: fixedWidth(item.amount) + '%' }" /></i>
                  <strong>{{ compactMoney(item.amount) }}</strong>
                </div>
                <p>Construyen la plataforma antes de sumar una cuenta más.</p>
              </section>

              <section class="variable-ledger">
                <div class="cost-section-title"><span>Variables</span><strong>Siguen el uso</strong></div>
                <div v-for="item in variableCosts" :key="item.label" class="variable-row">
                  <div><span>{{ item.label }}</span><small>{{ item.detail }}</small></div>
                  <strong>{{ item.unit.includes('%') ? item.amount + '%' : money(item.amount, item.amount < 100 ? 1 : 0) }}</strong>
                  <small>{{ item.unit }}</small>
                </div>
                <p>Cloud busca densidad. Atlas desplaza infraestructura, pero conserva acompañamiento.</p>
              </section>
            </div>

            <div class="economics-equation">
              <div><span>Ingreso</span><strong>Suscripción + licencia + implementación</strong></div>
              <b>−</b>
              <div><span>Costo variable</span><strong>Uso + operación por cliente</strong></div>
              <b>=</b>
              <div class="equation-result"><span>Contribución</span><strong>Financia la base fija</strong></div>
              <p>Mezcla de equilibrio ilustrativa: <strong>5 Atlas + 358 Cloud</strong></p>
            </div>
          </template>
        </section>
      </Transition>
    </main>

    <div class="business-controls">
      <button type="button" :disabled="currentSlide === 0" aria-label="Slide anterior" @click="previousSlide">←</button>
      <div class="business-progress" aria-label="Progreso de la presentación">
        <button v-for="(_, index) in slides" :key="index" type="button" :class="{ active: index === currentSlide }" :aria-label="'Ir al slide ' + (index + 1)" @click="goToSlide(index)" />
      </div>
      <button type="button" :disabled="currentSlide === slides.length - 1" aria-label="Siguiente slide" @click="nextSlide">→</button>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  atlasCommercialModel,
  atlasRoles,
  businessModelMeta,
  cloudTiers,
  fixedCosts,
  futureRevenueIdeas,
  projectionAssumptions,
  projectionScenarios,
  variableCosts,
} from '../data/businessModel'

const slides = Array.from({ length: 6 })
const currentSlide = ref(0)
const direction = ref('forward')
const projectionMode = ref('base')
let touchStartX = 0

const slideNumber = computed(() => String(currentSlide.value + 1).padStart(2, '0'))
const transitionName = computed(() => direction.value === 'forward' ? 'business-forward' : 'business-back')
const asset = (path) => `${import.meta.env.BASE_URL}${path}`

const cloudTierRows = computed(() => {
  const rows = cloudTiers.map((tier) => {
    const totalCost = Object.values(tier.cost).reduce((sum, value) => sum + value, 0)
    const margin = tier.monthlyPrice === 0 ? null : Math.round(((tier.monthlyPrice - totalCost) / tier.monthlyPrice) * 100)
    return {
      ...tier,
      totalCost,
      margin,
      costPerActive: totalCost / tier.activeMembers,
    }
  })
  const maximum = Math.max(...rows.map((tier) => tier.totalCost))
  return rows.map((tier) => ({ ...tier, costWidth: (tier.totalCost / maximum) * 100 }))
})

const activeScenario = computed(() => projectionScenarios[projectionMode.value])
const projectionRows = computed(() => {
  const scenario = activeScenario.value
  const rows = projectionAssumptions.months.map((month, index) => {
    const cloud = scenario.cloudAccounts[index]
    const atlas = scenario.atlasAccounts[index]
    const recurring = cloud * projectionAssumptions.cloudArpa + atlas * projectionAssumptions.atlasMrr
    const onboarding = scenario.newAtlas[index] * projectionAssumptions.atlasImplementation
    const total = recurring + onboarding
    return { month, cloud, atlas, recurring, onboarding, total }
  })
  const maximum = Math.max(...rows.map((row) => row.total))
  return rows.map((row) => ({
    ...row,
    height: Math.max(3, (row.total / maximum) * 100),
    onboardingShare: row.total ? (row.onboarding / row.total) * 100 : 0,
  }))
})

const projectionSummary = computed(() => {
  const rows = projectionRows.value
  const finalRow = rows[rows.length - 1]
  return {
    cumulative: rows.reduce((sum, row) => sum + row.total, 0),
    exitMrr: finalRow.recurring,
    cloud: finalRow.cloud,
    atlas: finalRow.atlas,
  }
})

const totalFixedCost = computed(() => fixedCosts.reduce((sum, item) => sum + item.amount, 0))
const maximumFixedCost = computed(() => Math.max(...fixedCosts.map((item) => item.amount)))

function money(value, digits = 0) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: businessModelMeta.currency,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value)
}

function compactMoney(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: businessModelMeta.currency,
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

function fixedWidth(amount) { return (amount / maximumFixedCost.value) * 100 }

function goToSlide(index) {
  if (index === currentSlide.value || index < 0 || index >= slides.length) return
  direction.value = index > currentSlide.value ? 'forward' : 'back'
  currentSlide.value = index
}

function nextSlide() { goToSlide(currentSlide.value + 1) }
function previousSlide() { goToSlide(currentSlide.value - 1) }
function handleKey(event) {
  const tag = event.target?.tagName
  if ((tag === 'BUTTON' || tag === 'A') && (event.key === ' ' || event.key === 'Enter')) return
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
.business-deck-view {
  --paper: #ece9e1;
  --ink: #10110f;
  --muted: #6f6d66;
  --cloud: #8057dc;
  --atlas: #148d91;
  position: relative;
  min-height: 100vh;
  padding: 96px 0 100px;
  overflow: hidden;
  background: var(--paper);
  color: var(--ink);
}

.business-backdrop { position: absolute; inset: 0; background-image: linear-gradient(rgba(17,17,15,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,15,.04) 1px, transparent 1px); background-size: 48px 48px; mask-image: linear-gradient(to bottom, black, transparent 84%); pointer-events: none; }
.business-topbar { position: relative; display: grid; width: min(1340px, calc(100% - 48px)); margin: 0 auto 16px; grid-template-columns: 1fr auto 1fr; align-items: center; color: #6c6961; font-family: var(--font-mono); font-size: 10px; letter-spacing: .12em; text-transform: uppercase; }
.business-topbar > span:last-child { justify-self: end; }
.business-back { color: inherit; text-decoration: none; }
.business-back:hover { color: var(--ink); }
.business-shell { position: relative; width: min(1340px, calc(100% - 48px)); margin: 0 auto; }
.business-slide { position: relative; aspect-ratio: 16 / 9; min-height: 690px; padding: clamp(40px, 4vw, 64px); overflow: hidden; border: 1px solid rgba(17,17,15,.13); border-radius: 26px; background: #f8f6ef; box-shadow: 0 36px 100px -60px rgba(17,17,15,.55); }
.business-slide h1, .business-slide h2, .business-slide h3, .business-slide p { margin-top: 0; }
.slide-kicker { margin-bottom: 16px; color: var(--cloud); font-family: var(--font-mono); font-size: 9px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; }
.slide-heading { position: relative; z-index: 5; display: flex; justify-content: space-between; gap: 48px; align-items: flex-start; }
.slide-heading h1, .slide-heading h2 { max-width: 900px; margin: 0; font-family: var(--font-display); font-size: clamp(46px, 4.7vw, 68px); font-weight: 500; letter-spacing: -.04em; line-height: .94; }
.heading-note, .assumption-note { max-width: 330px; margin: 8px 0 0; color: var(--muted); font-size: 12px; line-height: 1.65; }
.assumption-note { font-family: var(--font-mono); font-size: 8px; letter-spacing: .08em; text-align: right; text-transform: uppercase; }
.assumption-note strong { color: var(--ink); }
.slide-footer-note { position: absolute; right: clamp(40px, 4vw, 64px); bottom: 30px; left: clamp(40px, 4vw, 64px); display: flex; margin: 0; align-items: center; gap: 12px; font-size: 13px; font-weight: 700; }
.slide-footer-note i { display: block; width: 40px; height: 2px; background: linear-gradient(90deg, var(--cloud), #ec3f95, #f4c735, var(--atlas)); }

/* Slide 1 */
.business-slide-1 { border-color: rgba(255,255,255,.08); background: radial-gradient(circle at 7% 90%, rgba(128,87,220,.24), transparent 31%), radial-gradient(circle at 93% 86%, rgba(20,141,145,.24), transparent 31%), #111211; color: #f7f4eb; }
.business-slide-1::before { position: absolute; inset: 44% 50% -30% -16%; content: ''; border-radius: 50%; background: rgba(128,87,220,.08); transform: rotate(8deg); }
.business-slide-1::after { position: absolute; inset: 44% -16% -30% 50%; content: ''; border-radius: 50%; background: rgba(20,141,145,.08); transform: rotate(-8deg); }
.business-slide-1 .slide-kicker { color: #c9b7ff; }
.business-slide-1 .heading-note { color: #aaa79e; }
.mode-heading h1 { max-width: 820px; }
.mode-routes { position: relative; z-index: 3; display: grid; margin-top: 40px; grid-template-columns: 1fr 170px 1fr; gap: 16px; align-items: center; }
.mode-route { min-height: 300px; padding: 32px 34px 24px; border-top: 1px solid rgba(255,255,255,.2); }
.mode-route h2 { margin: 24px 0 26px; font-family: var(--font-display); font-size: clamp(29px, 2.7vw, 39px); font-weight: 500; letter-spacing: -.025em; line-height: 1.03; }
.route-label { margin: 0; color: #c9b7ff; font-family: var(--font-mono); font-size: 9px; font-weight: 700; letter-spacing: .15em; text-transform: uppercase; }
.atlas-route .route-label { color: #72d0ca; }
.mode-route ul { margin: 0; padding: 0; color: #b8b5ad; list-style: none; }
.mode-route li { padding: 6px 0; font-size: 11px; }
.mode-route li::before { margin-right: 9px; color: #a98aff; content: '—'; }
.atlas-route li::before { color: #54bcb8; }
.route-owner { display: inline-block; margin-top: 18px; color: #dfd9eb; font-size: 10px; font-weight: 700; }
.route-origin { position: relative; display: grid; height: 210px; place-items: center; align-content: center; }
.origin-mark { position: relative; z-index: 3; display: grid; width: 76px; height: 76px; place-items: center; border-radius: 50%; background: #f6f2e9; box-shadow: 0 0 0 12px rgba(255,255,255,.045), 0 20px 50px -25px #000; }
.origin-mark img { width: 44px; height: 44px; object-fit: contain; }
.route-origin small { position: relative; z-index: 3; margin-top: 15px; color: #8d8a83; font-family: var(--font-mono); font-size: 7px; letter-spacing: .12em; text-transform: uppercase; }
.origin-line { position: absolute; z-index: 1; top: 50%; width: 100px; height: 2px; }
.origin-left { right: 62%; background: linear-gradient(90deg, transparent, #a98aff); transform: rotate(-13deg); transform-origin: right center; }
.origin-right { left: 62%; background: linear-gradient(90deg, #54bcb8, transparent); transform: rotate(13deg); transform-origin: left center; }

/* Slide 2 */
.business-slide-2 { background: radial-gradient(circle at 92% 10%, rgba(244,199,53,.13), transparent 23%), #f5f0e5; }
.tiers-heading h2 { max-width: 850px; }
.mobile-scroll-hint { display: none; }
.tier-ledger { margin-top: 42px; border-top: 1px solid rgba(17,17,15,.18); }
.tier-row { display: grid; min-height: 112px; padding: 17px 12px; grid-template-columns: 1.15fr .82fr 1.02fr 1.05fr 1.25fr .72fr; gap: 18px; align-items: center; border-bottom: 1px solid rgba(17,17,15,.13); }
.tier-header { min-height: 36px; padding-top: 0; padding-bottom: 8px; color: #77736b; font-family: var(--font-mono); font-size: 7px; letter-spacing: .11em; text-transform: uppercase; }
.tier-name small, .tier-name strong { display: block; }
.tier-name small { margin-bottom: 5px; color: var(--muted); font-size: 9px; }
.tier-name strong { font-family: var(--font-display); font-size: 30px; font-weight: 500; line-height: 1; }
.tier-price { font-family: var(--font-display); font-size: 31px; font-weight: 500; }
.tier-price small { margin-left: 4px; color: var(--muted); font-family: var(--font-sans); font-size: 8px; font-weight: 500; }
.tier-team { font-size: 11px; line-height: 1.35; }
.tier-team b { font-size: 16px; }
.tier-team small { color: var(--muted); font-size: 8px; }
.tier-cost { display: flex; flex-direction: column; gap: 8px; font-size: 13px; }
.tier-cost i { display: block; height: 4px; border-radius: 99px; background: linear-gradient(90deg, #8057dc, #ec3f95, #f4c735); }
.tier-unit { color: #5741a7; font-family: var(--font-display); font-size: 29px; font-weight: 500; }
.tier-margin { justify-self: start; padding: 6px 9px; border-radius: 99px; background: #d9eddd; color: #196c3d; font-size: 10px; font-weight: 800; }
.tier-margin.negative { background: #ece1cc; color: #8b5b12; }
.tier-pro { background: rgba(128,87,220,.055); }
.tier-business { background: rgba(20,141,145,.055); }
.cost-composition { display: flex; margin-top: 18px; align-items: center; gap: 18px; color: var(--muted); font-size: 8px; }
.cost-composition p { display: flex; margin: 0; align-items: center; gap: 6px; white-space: nowrap; }
.cost-composition strong { margin-left: auto; color: var(--ink); font-size: 9px; }
.dot { display: block; width: 7px; height: 7px; border-radius: 50%; }
.infra-dot { background: #8057dc; }.platform-dot { background: #ec3f95; }.service-dot { background: #f4c735; }

/* Slide 3 */
.business-slide-3 { background: radial-gradient(circle at 50% 84%, rgba(0,184,200,.14), transparent 29%), #eef1eb; }
.business-slide-3 .slide-kicker { color: var(--atlas); }
.atlas-heading h2 { max-width: 900px; }
.atlas-perimeter { position: relative; display: grid; min-height: 350px; margin-top: 26px; padding: 34px 60px; grid-template-columns: 1fr 220px 1fr; grid-template-rows: 1fr 1fr; gap: 8px 42px; align-items: center; border: 1.5px dashed rgba(20,141,145,.56); border-radius: 48% 42% 46% 40% / 25% 30% 28% 34%; background: rgba(213,235,230,.52); }
.perimeter-label { position: absolute; top: 20px; left: 50%; color: var(--atlas); font-family: var(--font-mono); font-size: 7px; font-weight: 700; letter-spacing: .15em; text-transform: uppercase; transform: translateX(-50%); }
.atlas-role { position: relative; max-width: 260px; }
.atlas-role:nth-of-type(even) { justify-self: end; }
.atlas-role:nth-of-type(1), .atlas-role:nth-of-type(2) { align-self: end; }
.atlas-role > span { color: var(--atlas); font-family: var(--font-mono); font-size: 8px; }
.atlas-role h3 { margin: 7px 0 5px; font-family: var(--font-display); font-size: 23px; font-weight: 500; line-height: 1; }
.atlas-role p { max-width: 215px; margin: 0; color: var(--muted); font-size: 9px; line-height: 1.45; }
.atlas-center { display: grid; width: 176px; height: 176px; grid-column: 2; grid-row: 1 / 3; place-items: center; align-content: center; justify-self: center; border-radius: 50%; background: #101816; color: white; box-shadow: 0 0 0 14px rgba(20,141,145,.08), 0 25px 60px -28px rgba(14,70,70,.65); }
.atlas-center img { width: 48px; height: 48px; padding: 7px; border-radius: 10px; background: #f5f1e8; object-fit: contain; }
.atlas-center strong { margin-top: 12px; font-family: var(--font-display); font-size: 23px; font-weight: 500; }
.atlas-center small { margin-top: 5px; color: #87a7a2; font-family: var(--font-mono); font-size: 7px; letter-spacing: .1em; text-transform: uppercase; }
.atlas-commercial { display: grid; margin-top: 18px; grid-template-columns: 1.1fr repeat(3, 1fr); gap: 18px; align-items: center; }
.atlas-commercial > p { margin: 0; color: var(--atlas); font-family: var(--font-mono); font-size: 8px; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; }
.atlas-commercial > div { padding-left: 18px; border-left: 1px solid rgba(17,17,15,.16); }
.atlas-commercial span, .atlas-commercial strong, .atlas-commercial small { display: block; }
.atlas-commercial span { color: var(--muted); font-size: 8px; }
.atlas-commercial strong { margin-top: 3px; font-family: var(--font-display); font-size: 24px; font-weight: 500; }
.atlas-commercial small { color: var(--muted); font-size: 7px; }

/* Slide 4 */
.business-slide-4 { border-color: rgba(255,255,255,.08); background: radial-gradient(circle at 90% 12%, rgba(236,63,149,.17), transparent 28%), radial-gradient(circle at 10% 100%, rgba(0,184,200,.14), transparent 30%), #131217; color: #f7f3eb; }
.business-slide-4 .slide-kicker { color: #c5adff; }
.projection-heading h2 { max-width: 830px; font-size: clamp(43px, 4.3vw, 62px); }
.scenario-switch { display: flex; margin-top: 8px; align-items: center; gap: 22px; }
.scenario-switch button { position: relative; padding: 8px 0 12px; border: 0; outline: 0; background: transparent; color: #7e7984; cursor: pointer; font-family: var(--font-mono); font-size: 8px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
.scenario-switch button::after { position: absolute; right: 0; bottom: 4px; left: 0; height: 2px; content: ''; background: linear-gradient(90deg, #8057dc, #ec3f95); opacity: 0; transform: scaleX(.2); transition: opacity 180ms ease, transform 180ms ease; }
.scenario-switch button.active { color: white; }
.scenario-switch button.active::after { opacity: 1; transform: scaleX(1); }
.scenario-switch button:focus-visible::after { opacity: .7; transform: scaleX(1); }
.projection-layout { display: grid; min-height: 350px; margin-top: 28px; grid-template-columns: .58fr 1.42fr; gap: 50px; }
.projection-summary > p { min-height: 42px; margin: 0 0 22px; color: #aaa5ae; font-size: 11px; line-height: 1.55; }
.summary-metric span, .summary-pair span { display: block; color: #7e7984; font-family: var(--font-mono); font-size: 7px; letter-spacing: .1em; text-transform: uppercase; }
.summary-primary { padding-bottom: 18px; border-bottom: 1px solid rgba(255,255,255,.14); }
.summary-primary strong { display: block; margin-top: 6px; font-family: var(--font-display); font-size: 52px; font-weight: 500; line-height: 1; }
.summary-pair { display: grid; padding: 17px 0; grid-template-columns: 1fr 1fr; gap: 20px; border-bottom: 1px solid rgba(255,255,255,.1); }
.summary-pair strong { display: inline-block; margin-top: 6px; font-family: var(--font-display); font-size: 28px; font-weight: 500; line-height: 1; }
.summary-pair small { margin-left: 5px; color: #7e7984; font-size: 7px; }
.projection-chart { position: relative; display: grid; height: 330px; padding: 22px 16px 0; grid-template-columns: repeat(6, 1fr); gap: 18px; border-bottom: 1px solid rgba(255,255,255,.22); }
.chart-guides { position: absolute; inset: 22px 0 0; display: flex; flex-direction: column; justify-content: space-between; pointer-events: none; }
.chart-guides i { display: block; border-top: 1px solid rgba(255,255,255,.07); }
.chart-column { position: relative; z-index: 2; display: grid; min-width: 0; grid-template-rows: 18px 1fr 17px 14px; text-align: center; }
.chart-column > strong { align-self: start; color: #d8d2dc; font-family: var(--font-mono); font-size: 7px; font-weight: 600; }
.bar-space { display: flex; min-height: 0; align-items: flex-end; justify-content: center; }
.revenue-bar { display: flex; width: min(50px, 72%); min-height: 4px; flex-direction: column; justify-content: flex-end; overflow: hidden; border-radius: 11px 11px 2px 2px; box-shadow: 0 0 24px rgba(128,87,220,.14); transition: height 420ms cubic-bezier(.2,.8,.2,1); }
.revenue-bar i { display: block; width: 100%; transition: height 420ms cubic-bezier(.2,.8,.2,1); }
.onboarding-segment { background: linear-gradient(180deg, #f4c735, #ee7f2c); }
.recurring-segment { background: linear-gradient(180deg, #ec3f95, #8057dc 58%, #178e92); }
.chart-column > span { align-self: end; color: white; font-size: 10px; font-weight: 700; }
.chart-column > small { color: #76727b; font-family: var(--font-mono); font-size: 6px; }
.projection-legend { display: flex; margin-top: 19px; align-items: center; gap: 18px; color: #928d97; font-size: 8px; }
.projection-legend span { display: flex; align-items: center; gap: 7px; white-space: nowrap; }
.projection-legend i { display: block; width: 18px; height: 5px; border-radius: 99px; }
.legend-recurring { background: linear-gradient(90deg, #8057dc, #178e92); }.legend-onboarding { background: linear-gradient(90deg, #f4c735, #ee7f2c); }
.projection-legend p { margin: 0 0 0 auto; color: #716c76; font-family: var(--font-mono); font-size: 6px; letter-spacing: .04em; text-transform: uppercase; }

/* Slide 5 */
.business-slide-5 { background: radial-gradient(circle at 96% 0, rgba(240,90,40,.18), transparent 24%), radial-gradient(circle at 5% 100%, rgba(238,173,45,.18), transparent 25%), #f3ecde; }
.revenue-heading h2 { max-width: 790px; }
.revenue-roadmap { position: relative; display: grid; height: 345px; margin-top: 26px; padding: 0 16px; grid-template-columns: repeat(6, 1fr); gap: 18px; }
.roadmap-line { position: absolute; top: 51%; right: 4%; left: 4%; height: 2px; background: linear-gradient(90deg, #8057dc, #ec3f95 30%, #f4c735 58%, #148d91); }
.roadmap-line::before, .roadmap-line::after { position: absolute; top: 50%; content: ''; border-radius: 50%; transform: translateY(-50%); }
.roadmap-line::before { left: 0; width: 10px; height: 10px; background: #8057dc; }
.roadmap-line::after { right: 0; width: 16px; height: 16px; background: #148d91; box-shadow: 0 0 0 7px rgba(20,141,145,.1); }
.roadmap-line i { position: absolute; top: -2px; left: 0; width: 25%; height: 6px; border-radius: 99px; background: linear-gradient(90deg, transparent, white, transparent); filter: drop-shadow(0 0 6px #8057dc); animation: roadmapTravel 5s ease-in-out infinite; }
.revenue-stop { position: relative; align-self: start; padding-top: 24px; }
.revenue-stop:nth-of-type(even) { align-self: end; padding: 0 0 27px; }
.revenue-stop::before { position: absolute; top: calc(51% - 2px); left: 0; display: none; }
.stop-number { display: grid; width: 28px; height: 28px; margin-bottom: 13px; place-items: center; border: 1px solid rgba(17,17,15,.18); border-radius: 50%; background: #f8f3e8; color: #8057dc; font-family: var(--font-mono); font-size: 7px; font-weight: 700; }
.revenue-stop:nth-of-type(n+3) .stop-number { color: #bf3e7d; }
.revenue-stop:nth-of-type(n+5) .stop-number { color: #127c80; }
.revenue-stop small { color: var(--muted); font-family: var(--font-mono); font-size: 7px; font-weight: 700; letter-spacing: .11em; text-transform: uppercase; }
.revenue-stop h3 { margin: 7px 0 7px; font-family: var(--font-display); font-size: 21px; font-weight: 500; letter-spacing: -.02em; line-height: 1; }
.revenue-stop p { max-width: 160px; margin: 0; color: var(--muted); font-size: 9px; line-height: 1.45; }
.revenue-expansion { display: flex; margin-top: 12px; padding-top: 18px; align-items: center; gap: 13px; border-top: 1px solid rgba(17,17,15,.13); color: var(--muted); font-size: 9px; }
.revenue-expansion i { flex: 1; height: 1px; background: linear-gradient(90deg, rgba(17,17,15,.15), rgba(17,17,15,.55)); }
.revenue-expansion strong { color: var(--ink); font-size: 10px; white-space: nowrap; }

/* Slide 6 */
.business-slide-6 { border-color: rgba(255,255,255,.08); background: radial-gradient(circle at 96% 15%, rgba(20,141,145,.18), transparent 28%), radial-gradient(circle at 4% 90%, rgba(128,87,220,.18), transparent 28%), #111211; color: #f7f3eb; }
.business-slide-6 .slide-kicker { color: #c6b3ff; }
.business-slide-6 .assumption-note strong { color: white; }
.assumption-note.light { color: #77747c; }
.costs-heading h2 { max-width: 760px; }
.costs-layout { display: grid; margin-top: 32px; grid-template-columns: 1fr 1fr; gap: 58px; }
.fixed-ledger, .variable-ledger { min-width: 0; }
.cost-section-title { display: flex; padding-bottom: 13px; align-items: baseline; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,.18); }
.cost-section-title span { color: #a9a5ad; font-family: var(--font-mono); font-size: 8px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
.cost-section-title strong { font-family: var(--font-display); font-size: 24px; font-weight: 500; }
.fixed-row { display: grid; padding: 11px 0; grid-template-columns: 1.15fr 1fr 62px; gap: 12px; align-items: center; border-bottom: 1px solid rgba(255,255,255,.075); }
.fixed-row > span { font-size: 9px; }
.fixed-row > i { display: block; height: 4px; border-radius: 99px; background: rgba(255,255,255,.07); }
.fixed-row > i b { display: block; height: 100%; border-radius: 99px; background: linear-gradient(90deg, #8057dc, #ec3f95); }
.fixed-row > strong { justify-self: end; font-family: var(--font-mono); font-size: 8px; }
.fixed-ledger > p, .variable-ledger > p { margin: 16px 0 0; color: #77747c; font-size: 8px; line-height: 1.5; }
.variable-row { display: grid; min-height: 58px; padding: 9px 0; grid-template-columns: 1fr auto; align-items: center; gap: 2px 16px; border-bottom: 1px solid rgba(255,255,255,.075); }
.variable-row div { grid-row: 1 / 3; }
.variable-row div span, .variable-row div small { display: block; }
.variable-row div span { font-size: 10px; font-weight: 700; }
.variable-row div small { margin-top: 4px; color: #77747c; font-size: 7px; }
.variable-row > strong { justify-self: end; color: #62c7c3; font-family: var(--font-display); font-size: 22px; font-weight: 500; }
.variable-row > small { justify-self: end; color: #77747c; font-size: 6px; }
.economics-equation { display: grid; margin-top: 28px; padding: 17px 20px; grid-template-columns: 1fr auto 1fr auto 1fr 1.2fr; gap: 18px; align-items: center; border: 1px solid rgba(255,255,255,.13); border-radius: 16px; background: rgba(255,255,255,.035); }
.economics-equation div span, .economics-equation div strong { display: block; }
.economics-equation div span { color: #77747c; font-family: var(--font-mono); font-size: 6px; letter-spacing: .1em; text-transform: uppercase; }
.economics-equation div strong { margin-top: 4px; font-size: 9px; }
.economics-equation > b { color: #77747c; font-family: var(--font-display); font-size: 24px; font-weight: 500; }
.equation-result strong { color: #72d0ca; }
.economics-equation > p { margin: 0; padding-left: 18px; border-left: 1px solid rgba(255,255,255,.14); color: #aaa5ae; font-size: 8px; line-height: 1.5; }
.economics-equation > p strong { color: white; }

.business-controls { position: fixed; z-index: 20; right: 0; bottom: 20px; left: 0; display: flex; width: max-content; margin: 0 auto; align-items: center; gap: 16px; padding: 8px; border: 1px solid rgba(17,17,15,.14); border-radius: 999px; background: rgba(250,249,245,.9); box-shadow: 0 18px 50px -30px rgba(17,17,15,.65); backdrop-filter: blur(18px); }
.business-controls > button { width: 38px; height: 38px; border: 0; border-radius: 50%; background: #11110f; color: white; cursor: pointer; font-size: 16px; }
.business-controls > button:disabled { background: #d7d3ca; color: #8b887f; cursor: default; }
.business-progress { display: flex; gap: 7px; }
.business-progress button { width: 7px; height: 7px; padding: 0; border: 0; border-radius: 99px; background: #c0bcb3; cursor: pointer; transition: width 180ms ease, background-color 180ms ease; }
.business-progress button.active { width: 24px; background: #148d91; }
.business-forward-enter-active, .business-forward-leave-active, .business-back-enter-active, .business-back-leave-active { transition: opacity 220ms ease, transform 260ms ease; }
.business-forward-enter-from { opacity: 0; transform: translateX(36px); }.business-forward-leave-to { opacity: 0; transform: translateX(-36px); }
.business-back-enter-from { opacity: 0; transform: translateX(-36px); }.business-back-leave-to { opacity: 0; transform: translateX(36px); }
@keyframes roadmapTravel { 0% { left: 0; opacity: 0; } 15% { opacity: 1; } 78% { left: 75%; opacity: 1; } 100% { left: 75%; opacity: 0; } }

@media (max-width: 1050px) {
  .business-slide { aspect-ratio: auto; min-height: 760px; }
  .mode-routes { grid-template-columns: 1fr 120px 1fr; }
  .tier-row { grid-template-columns: 1fr .7fr .9fr .95fr 1.05fr .65fr; gap: 12px; }
  .projection-layout { gap: 30px; }
  .revenue-roadmap { gap: 12px; }
}

@media (max-width: 760px) {
  .business-deck-view { padding: 82px 0 96px; }
  .business-topbar, .business-shell { width: calc(100% - 24px); }
  .business-topbar { grid-template-columns: 1fr auto; }
  .business-topbar > span:nth-child(2) { display: none; }
  .business-slide { min-height: 0; padding: 30px 22px 84px; border-radius: 20px; }
  .slide-heading { flex-direction: column; gap: 18px; }
  .slide-heading h1, .slide-heading h2 { font-size: 46px; }
  .heading-note, .assumption-note { max-width: none; text-align: left; }
  .mode-routes { margin-top: 34px; grid-template-columns: 1fr; }
  .mode-route { min-height: 0; padding: 25px 4px; }
  .route-origin { order: -1; height: 100px; }
  .origin-line { display: none; }
  .slide-footer-note { position: static; margin-top: 28px; }
  .mobile-scroll-hint { display: block; margin: 32px 0 8px; color: var(--muted); font-family: var(--font-mono); font-size: 7px; letter-spacing: .08em; text-transform: uppercase; }
  .tier-ledger { margin-top: 0; overflow-x: auto; }
  .tier-row { min-width: 790px; }
  .cost-composition { flex-wrap: wrap; }
  .cost-composition strong { width: 100%; margin-left: 0; }
  .atlas-perimeter { padding: 54px 24px 30px; grid-template-columns: 1fr 1fr; grid-template-rows: auto; gap: 28px 18px; border-radius: 38px; }
  .atlas-center { width: 150px; height: 150px; grid-column: 1 / -1; grid-row: auto; order: -1; }
  .atlas-role:nth-of-type(n) { justify-self: start; align-self: start; }
  .atlas-commercial { grid-template-columns: 1fr; }
  .atlas-commercial > div { padding: 10px 0 0; border-top: 1px solid rgba(17,17,15,.13); border-left: 0; }
  .scenario-switch { width: 100%; justify-content: space-between; gap: 10px; }
  .projection-layout { grid-template-columns: 1fr; }
  .projection-chart { height: 300px; padding-right: 0; padding-left: 0; gap: 8px; }
  .projection-legend { flex-wrap: wrap; }
  .projection-legend p { width: 100%; margin-left: 0; line-height: 1.5; }
  .revenue-roadmap { height: auto; padding: 10px 0 10px 34px; grid-template-columns: 1fr; gap: 28px; }
  .roadmap-line { top: 0; bottom: 0; left: 12px; width: 2px; height: auto; background: linear-gradient(#8057dc, #ec3f95 30%, #f4c735 58%, #148d91); }
  .roadmap-line::before { top: 0; left: 50%; transform: translate(-50%, 0); }
  .roadmap-line::after { top: auto; right: auto; bottom: 0; left: 50%; transform: translate(-50%, 0); }
  .roadmap-line i { display: none; }
  .revenue-stop:nth-of-type(n) { align-self: start; padding: 0; }
  .revenue-stop p { max-width: 320px; }
  .revenue-expansion { flex-wrap: wrap; }
  .revenue-expansion i { min-width: 24px; }
  .costs-layout { grid-template-columns: 1fr; gap: 40px; }
  .economics-equation { grid-template-columns: 1fr; }
  .economics-equation > b { transform: rotate(90deg); }
  .economics-equation > p { padding: 14px 0 0; border-top: 1px solid rgba(255,255,255,.14); border-left: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .business-forward-enter-active, .business-forward-leave-active, .business-back-enter-active, .business-back-leave-active { transition: none; }
  .roadmap-line i, .revenue-bar, .revenue-bar i { animation: none; transition: none; }
}
</style>

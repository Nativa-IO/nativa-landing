<template>
  <div class="landing">
    <section class="hero" id="inicio">
      <div class="hero-grid" aria-hidden="true" />
      <div class="shell hero-layout">
        <div class="hero-copy">
          <p class="eyebrow">{{ copy.heroKicker }}</p>
          <h1>{{ copy.heroTitle }}</h1>
          <p class="hero-lead">{{ copy.heroBody }}</p>
          <div class="hero-actions">
            <a class="button button-dark" href="#vida">{{ copy.heroPrimary }}</a>
            <a
              v-if="hasAnyDownload"
              class="button button-light"
              :href="primaryDownloadUrl"
              rel="noopener noreferrer"
            >
              {{ copy.download }}
            </a>
            <a v-else class="button button-light" href="#formas">{{ copy.heroSecondary }}</a>
          </div>
          <p class="hero-note"><span />{{ copy.heroNote }}</p>
        </div>

        <div class="hero-visual">
          <div class="hero-halo" aria-hidden="true" />
          <div class="product-window product-window-hero">
            <div class="window-bar" aria-hidden="true">
              <i /><i /><i />
              <span>Nativa</span>
            </div>
            <div class="hero-image-crop">
              <img
                :src="asset('product/infrastructure.webp')"
                :alt="copy.altInfrastructure"
              >
            </div>
          </div>
          <div class="visual-note">
            <span class="visual-note-mark">✓</span>
            <div>
              <small>{{ copy.heroCardEyebrow }}</small>
              <strong>{{ copy.heroCardTitle }}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="truth-section">
      <div class="shell truth-layout">
        <p class="eyebrow eyebrow-inverse">{{ copy.truthKicker }}</p>
        <div>
          <h2>{{ copy.truthTitle }}</h2>
          <p>{{ copy.truthBody }}</p>
        </div>
      </div>
    </section>

    <section class="story-section" id="vida">
      <div class="shell">
        <div class="section-heading">
          <p class="eyebrow">{{ copy.storyKicker }}</p>
          <h2>{{ copy.storyTitle }}</h2>
          <p>{{ copy.storyBody }}</p>
        </div>

        <article
          v-for="(step, index) in copy.steps"
          :key="step.number"
          class="story-step"
          :class="{ 'story-step-reverse': index % 2 === 1 }"
        >
          <div class="step-copy">
            <span class="step-number">{{ step.number }}</span>
            <p class="step-eyebrow">{{ step.eyebrow }}</p>
            <h3>{{ step.title }}</h3>
            <p>{{ step.body }}</p>
            <ul>
              <li v-for="point in step.points" :key="point">{{ point }}</li>
            </ul>
          </div>

          <div class="step-visual" :class="`step-visual-${index + 1}`">
            <div class="product-window story-window">
              <div class="window-bar" aria-hidden="true">
                <i /><i /><i />
                <span>{{ step.windowLabel }}</span>
              </div>
              <div class="story-image-crop">
                <img :src="asset(step.image)" :alt="step.alt">
              </div>
            </div>
            <div v-if="step.secondaryImage" class="secondary-window">
              <img :src="asset(step.secondaryImage)" :alt="step.secondaryAlt">
            </div>
            <div class="image-caption">
              <span>{{ step.captionLabel }}</span>
              <strong>{{ step.caption }}</strong>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="care-section">
      <div class="shell">
        <div class="section-heading care-heading">
          <p class="eyebrow">{{ copy.careKicker }}</p>
          <h2>{{ copy.careTitle }}</h2>
        </div>
        <div class="care-grid">
          <article v-for="item in copy.careItems" :key="item.title" class="care-card">
            <span>{{ item.mark }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.body }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="gallery-section" id="plataforma">
      <div class="shell">
        <div class="section-heading gallery-heading">
          <p class="eyebrow">{{ copy.galleryKicker }}</p>
          <h2>{{ copy.galleryTitle }}</h2>
          <p>{{ copy.galleryBody }}</p>
        </div>

        <div class="gallery-grid">
          <article class="gallery-card gallery-card-wide">
            <div class="gallery-image gallery-projects">
              <img :src="asset('product/projects.webp')" :alt="copy.altProjects">
            </div>
            <div class="gallery-copy">
              <span>{{ copy.galleryItems[0].eyebrow }}</span>
              <h3>{{ copy.galleryItems[0].title }}</h3>
              <p>{{ copy.galleryItems[0].body }}</p>
            </div>
          </article>

          <article class="gallery-card">
            <div class="gallery-image gallery-knowledge">
              <img :src="asset('product/knowledge-detail.webp')" :alt="copy.altKnowledgeDetail">
            </div>
            <div class="gallery-copy">
              <span>{{ copy.galleryItems[1].eyebrow }}</span>
              <h3>{{ copy.galleryItems[1].title }}</h3>
              <p>{{ copy.galleryItems[1].body }}</p>
            </div>
          </article>

          <article class="gallery-card">
            <div class="gallery-image gallery-issues">
              <img :src="asset('product/issues.webp')" :alt="copy.altIssues">
            </div>
            <div class="gallery-copy">
              <span>{{ copy.galleryItems[2].eyebrow }}</span>
              <h3>{{ copy.galleryItems[2].title }}</h3>
              <p>{{ copy.galleryItems[2].body }}</p>
            </div>
          </article>

          <article class="gallery-card gallery-card-wide gallery-card-calm">
            <div class="gallery-image gallery-storage">
              <img :src="asset('product/storage.webp')" :alt="copy.altStorage">
            </div>
            <div class="gallery-copy">
              <span>{{ copy.galleryItems[3].eyebrow }}</span>
              <h3>{{ copy.galleryItems[3].title }}</h3>
              <p>{{ copy.galleryItems[3].body }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="modes-section" id="formas">
      <div class="shell">
        <div class="section-heading modes-heading">
          <p class="eyebrow eyebrow-inverse">{{ copy.modesKicker }}</p>
          <h2>{{ copy.modesTitle }}</h2>
          <p>{{ copy.modesBody }}</p>
        </div>
        <div class="modes-grid">
          <article class="mode-card mode-card-light">
            <span>01</span>
            <p class="mode-label">Nativa Cloud</p>
            <h3>{{ copy.cloudTitle }}</h3>
            <p>{{ copy.cloudBody }}</p>
            <ul>
              <li v-for="item in copy.cloudPoints" :key="item">{{ item }}</li>
            </ul>
          </article>
          <article class="mode-card mode-card-accent">
            <span>02</span>
            <p class="mode-label">Nativa Atlas</p>
            <h3>{{ copy.atlasTitle }}</h3>
            <p>{{ copy.atlasBody }}</p>
            <ul>
              <li v-for="item in copy.atlasPoints" :key="item">{{ item }}</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section class="final-section" id="descargar">
      <div class="shell final-layout">
        <div>
          <p class="eyebrow">{{ copy.finalKicker }}</p>
          <h2>{{ copy.finalTitle }}</h2>
          <p>{{ copy.finalBody }}</p>
        </div>
        <div class="final-actions">
          <a v-if="macReady" class="button button-dark" :href="macUrl" rel="noopener noreferrer">
            {{ copy.downloadMac }}
          </a>
          <a v-if="windowsReady" class="button button-light" :href="windowsUrl" rel="noopener noreferrer">
            {{ copy.downloadWindows }}
          </a>
          <span v-if="ready && !hasAnyDownload" class="coming-soon">{{ copy.comingSoon }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../composables/useI18n'
import { useDownloads } from '../composables/useDownloads'

const { locale } = useI18n()
const { ready, macUrl, windowsUrl, macReady, windowsReady } = useDownloads()

const content = {
  es: {
    heroKicker: 'Software creado con IA, listo para la vida real',
    heroTitle: 'La IA construye rápido. Nativa hace que dure.',
    heroBody: 'Crea, prueba y mejora software con la velocidad de la IA, mientras Nativa cuida los datos, la infraestructura y cada cambio que sucede en el camino.',
    heroPrimary: 'Ver cómo funciona',
    heroSecondary: 'Conocer Nativa',
    heroNote: 'Tu aplicación · tus datos · tu control',
    heroCardEyebrow: 'Todo en su lugar',
    heroCardTitle: 'Una sola vista para saber que todo está bien.',
    download: 'Descargar Nativa',
    truthKicker: 'La realidad después del prompt',
    truthTitle: 'El código se volvió barato. El software no.',
    truthBody: 'Una demo puede nacer en una tarde. Lo difícil viene después: mantenerla segura, cambiarla sin romperla, trabajar con datos reales y permitir que otras personas colaboren. Ahí empieza Nativa.',
    storyKicker: 'De la idea a producción',
    storyTitle: 'Nativa acompaña toda la vida de tu software.',
    storyBody: 'No necesitas aprender una colección de herramientas. Nativa reúne el proceso completo y te muestra lo importante en cada momento.',
    steps: [
      {
        number: '01',
        eyebrow: 'Empezar',
        title: 'Cuenta tu idea. Nativa prepara el camino.',
        body: 'Puedes empezar desde cero o traer un proyecto que ya existe. Una conversación se convierte en un plan claro antes de construir.',
        points: ['Tu proyecto comienza ordenado', 'El código queda en tu cuenta', 'El plan evoluciona contigo'],
        windowLabel: 'Un nuevo proyecto',
        image: 'product/create-project.webp',
        alt: 'Creación de un proyecto nuevo en Nativa',
        captionLabel: 'Primero claridad',
        caption: 'De una idea abierta a un punto de partida concreto.',
      },
      {
        number: '02',
        eyebrow: 'Cambiar',
        title: 'Prueba cambios sin poner en riesgo lo que ya funciona.',
        body: 'Cada petición vive en su propio espacio. Puedes verla, probarla y compartirla antes de decidir si debe formar parte de tu aplicación.',
        points: ['Una vista previa por cambio', 'Datos separados para probar', 'Aprobar o descartar con tranquilidad'],
        windowLabel: 'Sesiones de trabajo',
        image: 'product/sessions.webp',
        alt: 'Lista de sesiones de trabajo dentro de un proyecto',
        secondaryImage: 'product/session-detail.webp',
        secondaryAlt: 'Detalle de una sesión en Nativa',
        captionLabel: 'Sin miedo a romper',
        caption: 'Cada cambio tiene su propio lugar para crecer.',
      },
      {
        number: '03',
        eyebrow: 'Recordar',
        title: 'Tu equipo y tu IA comparten la misma memoria.',
        body: 'Decisiones, documentos y aprendizajes permanecen junto al proyecto. Nativa utiliza ese contexto para que no tengas que explicar lo mismo una y otra vez.',
        points: ['Conocimiento que se conserva', 'Documentos cerca del trabajo', 'Contexto útil en cada sesión'],
        windowLabel: 'La memoria del proyecto',
        image: 'product/knowledge.webp',
        alt: 'Conocimiento organizado dentro de Nativa',
        secondaryImage: 'product/storage.webp',
        secondaryAlt: 'Documentos organizados dentro de Nativa',
        captionLabel: 'El contexto permanece',
        caption: 'Lo que aprende una sesión ayuda a la siguiente.',
      },
      {
        number: '04',
        eyebrow: 'Publicar',
        title: 'Aprueba con claridad. Publica con confianza.',
        body: 'Cuando un cambio ya fue probado, Nativa reúne lo que va a salir y conserva la historia. Siempre sabes qué cambió y dónde está funcionando.',
        points: ['Validación antes de aprobar', 'Historial de cada versión', 'Regreso seguro cuando hace falta'],
        windowLabel: 'Una versión lista',
        image: 'product/deployment-detail.webp',
        alt: 'Versión publicada y activa dentro de Nativa',
        secondaryImage: 'product/deployments.webp',
        secondaryAlt: 'Historial de versiones dentro de Nativa',
        captionLabel: 'Nada sale a ciegas',
        caption: 'De cambio aprobado a versión viva, sin perder la historia.',
      },
    ],
    careKicker: 'Lo complejo, bien cuidado',
    careTitle: 'Tú decides qué construir. Nativa cuida lo que normalmente queda escondido.',
    careItems: [
      { mark: '◎', title: 'Un espacio seguro para cada cambio', body: 'Cada sesión mantiene separados el trabajo, los datos y la vista previa hasta que tú decidas.' },
      { mark: '◇', title: 'Tus secretos no viven en el chat', body: 'Credenciales y llaves permanecen protegidas en una bóveda que solo tu propia infraestructura puede resolver.' },
      { mark: '↗', title: 'Tu software puede salir contigo', body: 'El repositorio, la base de datos y la infraestructura siguen bajo tu control, en Nativa Cloud o en tus servidores.' },
    ],
    galleryKicker: 'Una casa para tu producto',
    galleryTitle: 'Todo lo que tu software necesita, sin brincar entre diez herramientas.',
    galleryBody: 'La interfaz está hecha para orientarte. Debajo existe ingeniería seria; arriba, una forma clara de trabajar.',
    galleryItems: [
      { eyebrow: 'Proyectos', title: 'Siempre sabes dónde estás.', body: 'Trabajo activo, avances y versiones reunidos en una sola vista.' },
      { eyebrow: 'Conocimiento', title: 'Las decisiones no se pierden.', body: 'Nativa conserva la memoria que ayuda a personas y agentes a trabajar mejor.' },
      { eyebrow: 'Colaboración', title: 'El trabajo pendiente tiene contexto.', body: 'Las ideas y problemas viven junto al proyecto que los necesita.' },
      { eyebrow: 'Documentos', title: 'Los archivos importantes permanecen cerca.', body: 'Referencias, datos y entregables viajan con el trabajo, no en conversaciones dispersas.' },
    ],
    modesKicker: 'Dos formas de habitar Nativa',
    modesTitle: 'La misma experiencia. La infraestructura que tú elijas.',
    modesBody: 'Empieza rápido con Nativa Cloud o lleva toda la plataforma a la infraestructura de tu organización.',
    cloudTitle: 'Nosotros montamos y cuidamos la casa.',
    cloudBody: 'Para equipos que quieren comenzar sin ocuparse de servidores.',
    cloudPoints: ['Infraestructura administrada', 'Configuración automática', 'Lista para usar desde el primer día'],
    atlasTitle: 'Nativa vive dentro de tu organización.',
    atlasBody: 'Para empresas que necesitan control total sobre su infraestructura y sus datos.',
    atlasPoints: ['Tus servidores y políticas', 'Datos dentro de tu perímetro', 'Acompañamiento para implementarla'],
    finalKicker: 'De demo a sistema',
    finalTitle: 'Tu próxima aplicación no tiene que quedarse en prototipo.',
    finalBody: 'Crea con la velocidad de la IA y mantén el control cuando el software empiece a importar de verdad.',
    downloadMac: 'Descargar para macOS',
    downloadWindows: 'Descargar para Windows',
    comingSoon: 'Las descargas estarán disponibles muy pronto.',
    altInfrastructure: 'Mapa visual de la infraestructura de Nativa',
    altProjects: 'Proyectos organizados dentro de Nativa',
    altKnowledgeDetail: 'Documento de conocimiento dentro de Nativa',
    altIssues: 'Trabajo pendiente organizado dentro de Nativa',
    altStorage: 'Archivos y documentos organizados dentro de Nativa',
  },
  en: {
    heroKicker: 'AI-built software, ready for real life',
    heroTitle: 'AI builds fast. Nativa makes it last.',
    heroBody: 'Create, test, and improve software at AI speed while Nativa takes care of the data, infrastructure, and every change along the way.',
    heroPrimary: 'See how it works',
    heroSecondary: 'Meet Nativa',
    heroNote: 'Your application · your data · your control',
    heroCardEyebrow: 'Everything in its place',
    heroCardTitle: 'One view to know everything is okay.',
    download: 'Download Nativa',
    truthKicker: 'Life after the prompt',
    truthTitle: 'Code became cheap. Software did not.',
    truthBody: 'A demo can be born in an afternoon. The hard part comes next: keeping it secure, changing it without breaking it, working with real data, and letting other people collaborate. That is where Nativa begins.',
    storyKicker: 'From idea to production',
    storyTitle: 'Nativa stays with your software for its entire life.',
    storyBody: 'You do not need to learn a collection of tools. Nativa brings the whole process together and shows you what matters at each moment.',
    steps: [
      { number: '01', eyebrow: 'Start', title: 'Share your idea. Nativa prepares the way.', body: 'Start from scratch or bring an existing project. A conversation becomes a clear plan before anything is built.', points: ['Every project starts organized', 'The code stays in your account', 'The plan evolves with you'], windowLabel: 'A new project', image: 'product/create-project.webp', alt: 'Creating a new project in Nativa', captionLabel: 'Clarity first', caption: 'From an open idea to a concrete starting point.' },
      { number: '02', eyebrow: 'Change', title: 'Try changes without risking what already works.', body: 'Every request lives in its own space. See it, test it, and share it before deciding whether it belongs in your application.', points: ['A live preview for every change', 'Separate data for safe testing', 'Approve or discard with confidence'], windowLabel: 'Work sessions', image: 'product/sessions.webp', alt: 'Work sessions inside a project', secondaryImage: 'product/session-detail.webp', secondaryAlt: 'Session details in Nativa', captionLabel: 'Change without fear', caption: 'Every change gets its own place to grow.' },
      { number: '03', eyebrow: 'Remember', title: 'Your team and your AI share the same memory.', body: 'Decisions, documents, and lessons stay with the project. Nativa uses that context so you do not have to explain the same thing again and again.', points: ['Knowledge that stays', 'Documents close to the work', 'Useful context in every session'], windowLabel: 'Project memory', image: 'product/knowledge.webp', alt: 'Organized knowledge in Nativa', secondaryImage: 'product/storage.webp', secondaryAlt: 'Organized documents in Nativa', captionLabel: 'Context stays', caption: 'What one session learns helps the next one.' },
      { number: '04', eyebrow: 'Publish', title: 'Approve clearly. Publish confidently.', body: 'Once a change has been tested, Nativa gathers what will ship and preserves the story. You always know what changed and where it is running.', points: ['Validation before approval', 'A history for every version', 'A safe way back when needed'], windowLabel: 'A ready version', image: 'product/deployment-detail.webp', alt: 'A published and active version in Nativa', secondaryImage: 'product/deployments.webp', secondaryAlt: 'Version history in Nativa', captionLabel: 'Nothing ships blind', caption: 'From approved change to live version, without losing the story.' },
    ],
    careKicker: 'The complexity, carefully handled',
    careTitle: 'You decide what to build. Nativa takes care of what usually stays hidden.',
    careItems: [
      { mark: '◎', title: 'A safe space for every change', body: 'Every session keeps the work, data, and preview separate until you decide.' },
      { mark: '◇', title: 'Your secrets do not live in chat', body: 'Credentials and keys remain protected in a vault that only your own infrastructure can resolve.' },
      { mark: '↗', title: 'Your software can leave with you', body: 'The repository, database, and infrastructure remain under your control, in Nativa Cloud or on your servers.' },
    ],
    galleryKicker: 'A home for your product',
    galleryTitle: 'Everything your software needs, without jumping between ten tools.',
    galleryBody: 'The interface is made to orient you. Serious engineering lives underneath; a clear way of working lives on top.',
    galleryItems: [
      { eyebrow: 'Projects', title: 'You always know where you are.', body: 'Active work, progress, and versions gathered in one place.' },
      { eyebrow: 'Knowledge', title: 'Decisions do not get lost.', body: 'Nativa preserves the memory that helps people and agents work better.' },
      { eyebrow: 'Collaboration', title: 'Pending work carries context.', body: 'Ideas and problems live next to the project that needs them.' },
      { eyebrow: 'Documents', title: 'Important files stay close.', body: 'References, data, and deliverables travel with the work, not through scattered conversations.' },
    ],
    modesKicker: 'Two ways to make Nativa home',
    modesTitle: 'The same experience. The infrastructure you choose.',
    modesBody: 'Start quickly with Nativa Cloud or bring the entire platform into your organization’s infrastructure.',
    cloudTitle: 'We set up and take care of the house.',
    cloudBody: 'For teams that want to start without managing servers.',
    cloudPoints: ['Managed infrastructure', 'Automatic setup', 'Ready from day one'],
    atlasTitle: 'Nativa lives inside your organization.',
    atlasBody: 'For companies that need complete control over infrastructure and data.',
    atlasPoints: ['Your servers and policies', 'Data inside your perimeter', 'Guided implementation'],
    finalKicker: 'From demo to system',
    finalTitle: 'Your next application does not have to stay a prototype.',
    finalBody: 'Create at AI speed and stay in control when the software starts to truly matter.',
    downloadMac: 'Download for macOS',
    downloadWindows: 'Download for Windows',
    comingSoon: 'Downloads will be available very soon.',
    altInfrastructure: 'A visual map of Nativa infrastructure',
    altProjects: 'Projects organized inside Nativa',
    altKnowledgeDetail: 'A knowledge document inside Nativa',
    altIssues: 'Pending work organized inside Nativa',
    altStorage: 'Files and documents organized inside Nativa',
  },
}

const copy = computed(() => content[locale.value] ?? content.es)
const hasAnyDownload = computed(() => macReady.value || windowsReady.value)
const primaryDownloadUrl = computed(() => macUrl.value || windowsUrl.value || '#formas')
const asset = (path) => `${import.meta.env.BASE_URL}${path}`
</script>

<style scoped>
.landing {
  --paper: #f1efe9;
  --paper-bright: #faf9f5;
  --ink: #11110f;
  --muted: #67665f;
  --line: rgba(17, 17, 15, 0.13);
  --purple: #8d5cff;
  background: var(--paper);
  color: var(--ink);
}

.shell {
  width: min(1240px, calc(100% - 48px));
  margin: 0 auto;
}

.eyebrow {
  margin: 0;
  color: #6f46d9;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.eyebrow-inverse { color: #bba4ff; }

.hero {
  position: relative;
  min-height: 820px;
  padding: 152px 0 88px;
  overflow: hidden;
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(17, 17, 15, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(17, 17, 15, 0.045) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: linear-gradient(to bottom, black 15%, transparent 90%);
  pointer-events: none;
}

.hero-layout {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 0.88fr) minmax(520px, 1.12fr);
  gap: 64px;
  align-items: center;
}

.hero-copy h1 {
  max-width: 680px;
  margin: 26px 0 0;
  font-family: var(--font-display);
  font-size: clamp(64px, 6.6vw, 96px);
  font-weight: 400;
  letter-spacing: -0.055em;
  line-height: 0.94;
}

.hero-lead {
  max-width: 590px;
  margin: 30px 0 0;
  color: var(--muted);
  font-size: 18px;
  line-height: 1.65;
}

.hero-actions,
.final-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 34px;
}

.button {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  padding: 0 22px;
  border: 1px solid transparent;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 650;
  text-decoration: none;
  transition: transform 180ms ease, background-color 180ms ease, border-color 180ms ease;
}

.button:hover { transform: translateY(-2px); }
.button-dark { background: var(--ink); color: white; }
.button-dark:hover { background: #292823; }
.button-light { border-color: var(--line); background: rgba(255,255,255,0.56); color: var(--ink); }
.button-light:hover { border-color: rgba(17,17,15,0.25); background: white; }

.hero-note {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 28px 0 0;
  color: #77756d;
  font-size: 13px;
}

.hero-note span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #25a75a;
  box-shadow: 0 0 0 5px rgba(37,167,90,0.1);
}

.hero-visual { position: relative; min-width: 0; }
.hero-halo {
  position: absolute;
  width: 90%;
  height: 78%;
  top: 4%;
  left: 8%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(141,92,255,0.25), rgba(255,178,100,0.15) 38%, transparent 72%);
  filter: blur(42px);
}

.product-window {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(17,17,15,0.18);
  border-radius: 22px;
  background: #111;
  box-shadow: 0 38px 80px -32px rgba(30,25,20,0.48);
}

.product-window-hero { transform: rotate(1.25deg); }

.window-bar {
  display: flex;
  height: 38px;
  align-items: center;
  gap: 6px;
  padding: 0 14px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  background: #181817;
}

.window-bar i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #4a4946;
}

.window-bar span {
  margin-left: 8px;
  color: rgba(255,255,255,0.56);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-image-crop {
  height: 510px;
  overflow: hidden;
}

.hero-image-crop img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 54% center;
  transform: scale(1.14);
  filter: saturate(0.82) contrast(0.96);
}

.visual-note {
  position: absolute;
  left: -34px;
  bottom: -30px;
  display: flex;
  width: min(330px, 72%);
  align-items: center;
  gap: 14px;
  padding: 18px;
  border: 1px solid rgba(17,17,15,0.14);
  border-radius: 16px;
  background: rgba(250,249,245,0.94);
  box-shadow: 0 24px 56px -30px rgba(17,17,15,0.48);
  backdrop-filter: blur(18px);
}

.visual-note-mark {
  display: grid;
  width: 34px;
  height: 34px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 50%;
  background: #e4f5e9;
  color: #168c48;
  font-weight: 800;
}

.visual-note small,
.visual-note strong { display: block; }
.visual-note small { margin-bottom: 3px; color: #7b796f; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; }
.visual-note strong { font-size: 14px; line-height: 1.35; }

.truth-section {
  background: #121210;
  color: var(--paper-bright);
  padding: 112px 0 124px;
}

.truth-layout {
  display: grid;
  grid-template-columns: 0.34fr 1fr;
  gap: 90px;
  align-items: start;
}

.truth-layout h2 {
  max-width: 900px;
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(58px, 7vw, 98px);
  font-weight: 400;
  letter-spacing: -0.045em;
  line-height: 0.98;
}

.truth-layout div > p {
  max-width: 660px;
  margin: 36px 0 0;
  color: #aaa79d;
  font-size: 19px;
  line-height: 1.68;
}

.story-section { padding: 136px 0 72px; }

.section-heading { max-width: 780px; }
.section-heading h2 {
  margin: 22px 0 0;
  font-family: var(--font-display);
  font-size: clamp(52px, 5.8vw, 78px);
  font-weight: 400;
  letter-spacing: -0.045em;
  line-height: 1;
}

.section-heading > p:last-child {
  max-width: 660px;
  margin: 26px 0 0;
  color: var(--muted);
  font-size: 17px;
  line-height: 1.7;
}

.story-step {
  display: grid;
  grid-template-columns: minmax(280px, 0.72fr) minmax(0, 1.28fr);
  gap: 84px;
  align-items: center;
  min-height: 720px;
  padding: 108px 0;
  border-top: 1px solid var(--line);
}

.section-heading + .story-step { margin-top: 92px; }
.story-step-reverse { grid-template-columns: minmax(0, 1.28fr) minmax(280px, 0.72fr); }
.story-step-reverse .step-copy { order: 2; }
.story-step-reverse .step-visual { order: 1; }

.step-number {
  display: inline-grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 50%;
  color: #6f46d9;
  font-family: var(--font-mono);
  font-size: 11px;
}

.step-eyebrow {
  margin: 28px 0 0;
  color: #6f46d9;
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 650;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.step-copy h3 {
  margin: 14px 0 0;
  font-family: var(--font-display);
  font-size: clamp(42px, 4vw, 58px);
  font-weight: 400;
  letter-spacing: -0.04em;
  line-height: 1;
}

.step-copy > p:not(.step-eyebrow) {
  margin: 24px 0 0;
  color: var(--muted);
  font-size: 16px;
  line-height: 1.7;
}

.step-copy ul,
.mode-card ul {
  margin: 28px 0 0;
  padding: 0;
  list-style: none;
}

.step-copy li,
.mode-card li {
  position: relative;
  padding: 10px 0 10px 24px;
  border-top: 1px solid var(--line);
  color: #46453f;
  font-size: 13px;
}

.step-copy li::before,
.mode-card li::before {
  position: absolute;
  left: 2px;
  content: '✓';
  color: #6f46d9;
  font-weight: 800;
}

.step-visual { position: relative; min-width: 0; padding: 28px 0 54px; }
.story-window { background: #111; }
.story-image-crop { height: 450px; overflow: hidden; }
.story-image-crop img { width: 100%; height: 100%; object-fit: cover; transform: scale(1.05); filter: saturate(0.86) contrast(0.96); }
.step-visual-1 .story-image-crop img { object-position: 59% 38%; transform: scale(1.13); }
.step-visual-2 .story-image-crop img { object-position: 55% 35%; transform: scale(1.12); }
.step-visual-3 .story-image-crop img { object-position: 60% 25%; transform: scale(1.12); }
.step-visual-4 .story-image-crop img { object-position: 56% 24%; transform: scale(1.1); }

.secondary-window {
  position: absolute;
  right: -28px;
  bottom: 2px;
  width: 44%;
  overflow: hidden;
  border: 8px solid var(--paper-bright);
  border-radius: 18px;
  background: #111;
  box-shadow: 0 26px 60px -30px rgba(17,17,15,0.55);
}

.secondary-window img { display: block; width: 100%; aspect-ratio: 1.38; object-fit: cover; object-position: center 30%; }

.image-caption {
  position: absolute;
  left: 28px;
  bottom: 16px;
  width: min(320px, 48%);
  padding: 15px 17px;
  border: 1px solid rgba(17,17,15,0.12);
  border-radius: 14px;
  background: rgba(250,249,245,0.94);
  box-shadow: 0 18px 44px -28px rgba(17,17,15,0.5);
  backdrop-filter: blur(16px);
}

.image-caption span,
.image-caption strong { display: block; }
.image-caption span { margin-bottom: 3px; color: #6f46d9; font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; }
.image-caption strong { font-size: 12px; line-height: 1.45; }

.care-section { padding: 112px 0; background: #e7e3db; }
.care-heading { max-width: 900px; }
.care-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 62px; }
.care-card { min-height: 280px; padding: 30px; border: 1px solid rgba(17,17,15,0.12); border-radius: 20px; background: rgba(250,249,245,0.72); }
.care-card > span { display: grid; width: 40px; height: 40px; place-items: center; border: 1px solid rgba(111,70,217,0.28); border-radius: 50%; color: #6f46d9; font-size: 18px; }
.care-card h3 { margin: 50px 0 0; font-family: var(--font-display); font-size: 30px; font-weight: 400; letter-spacing: -0.03em; line-height: 1.05; }
.care-card p { margin: 16px 0 0; color: var(--muted); font-size: 14px; line-height: 1.65; }

.gallery-section { padding: 132px 0; background: var(--paper-bright); }
.gallery-heading { max-width: 860px; }
.gallery-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 18px; margin-top: 72px; }
.gallery-card { grid-column: span 5; overflow: hidden; border: 1px solid var(--line); border-radius: 22px; background: var(--paper); }
.gallery-card-wide { grid-column: span 7; }
.gallery-card-calm { background: #ece8df; }
.gallery-image { height: 330px; overflow: hidden; border-bottom: 1px solid var(--line); background: #111; }
.gallery-image img { width: 100%; height: 100%; object-fit: cover; filter: saturate(0.78) contrast(0.94); transition: transform 500ms cubic-bezier(.2,.8,.2,1); }
.gallery-card:hover .gallery-image img { transform: scale(1.025); }
.gallery-projects img { object-position: 54% 24%; }
.gallery-knowledge img { object-position: 68% 16%; }
.gallery-issues img { object-position: 57% 18%; }
.gallery-storage img { object-position: 58% 22%; }
.gallery-copy { padding: 28px 30px 32px; }
.gallery-copy span { color: #6f46d9; font-family: var(--font-mono); font-size: 9px; font-weight: 650; letter-spacing: 0.14em; text-transform: uppercase; }
.gallery-copy h3 { margin: 10px 0 0; font-family: var(--font-display); font-size: 30px; font-weight: 400; letter-spacing: -0.03em; }
.gallery-copy p { margin: 10px 0 0; color: var(--muted); font-size: 14px; line-height: 1.6; }

.modes-section { padding: 130px 0; background: #121210; color: var(--paper-bright); }
.modes-heading { max-width: 860px; }
.modes-heading > p:last-child { color: #9d9a91; }
.modes-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 72px; }
.mode-card { min-height: 500px; padding: 38px; border-radius: 24px; }
.mode-card > span { display: inline-grid; width: 40px; height: 40px; place-items: center; border: 1px solid currentColor; border-radius: 50%; font-family: var(--font-mono); font-size: 10px; opacity: 0.52; }
.mode-card-light { background: #f3f0ea; color: var(--ink); }
.mode-card-accent { background: #7f55df; color: white; }
.mode-label { margin: 76px 0 0; font-family: var(--font-mono); font-size: 10px; font-weight: 650; letter-spacing: 0.15em; text-transform: uppercase; opacity: 0.7; }
.mode-card h3 { max-width: 500px; margin: 16px 0 0; font-family: var(--font-display); font-size: clamp(38px, 4vw, 54px); font-weight: 400; letter-spacing: -0.04em; line-height: 1; }
.mode-card > p:not(.mode-label) { max-width: 480px; margin: 22px 0 0; font-size: 15px; line-height: 1.65; opacity: 0.72; }
.mode-card li { border-color: currentColor; color: inherit; opacity: 0.78; }
.mode-card-accent li::before { color: white; }

.final-section { padding: 120px 0; background: var(--paper); }
.final-layout { display: grid; grid-template-columns: 1fr auto; gap: 80px; align-items: end; }
.final-layout h2 { max-width: 810px; margin: 20px 0 0; font-family: var(--font-display); font-size: clamp(54px, 6vw, 84px); font-weight: 400; letter-spacing: -0.045em; line-height: 0.98; }
.final-layout div > p:last-child { max-width: 650px; margin: 26px 0 0; color: var(--muted); font-size: 17px; line-height: 1.68; }
.final-actions { min-width: 240px; flex-direction: column; }
.coming-soon { max-width: 240px; color: var(--muted); font-size: 13px; line-height: 1.5; }

@media (max-width: 1040px) {
  .hero { min-height: auto; }
  .hero-layout { grid-template-columns: 1fr; gap: 74px; }
  .hero-copy { max-width: 800px; }
  .hero-visual { width: min(820px, 92%); margin-left: auto; }
  .story-step,
  .story-step-reverse { grid-template-columns: 0.75fr 1.25fr; gap: 50px; }
  .story-step-reverse .step-copy { order: 2; }
  .gallery-image { height: 290px; }
}

@media (max-width: 780px) {
  .shell { width: min(100% - 32px, 620px); }
  .hero { padding: 124px 0 82px; }
  .hero-copy h1 { font-size: clamp(54px, 17vw, 74px); }
  .hero-lead { font-size: 16px; }
  .hero-visual { width: 100%; }
  .hero-image-crop { height: 360px; }
  .visual-note { left: 14px; bottom: -46px; width: 72%; }
  .truth-layout { grid-template-columns: 1fr; gap: 40px; }
  .truth-layout h2 { font-size: clamp(54px, 15vw, 78px); }
  .story-section { padding-top: 100px; }
  .section-heading h2 { font-size: clamp(48px, 13.5vw, 66px); }
  .section-heading + .story-step { margin-top: 70px; }
  .story-step,
  .story-step-reverse { grid-template-columns: 1fr; gap: 44px; min-height: auto; padding: 78px 0; }
  .story-step-reverse .step-copy,
  .story-step-reverse .step-visual { order: initial; }
  .step-copy h3 { font-size: clamp(40px, 11vw, 54px); }
  .story-image-crop { height: 340px; }
  .secondary-window { right: -4px; width: 46%; }
  .image-caption { left: 12px; width: 54%; }
  .care-grid,
  .modes-grid { grid-template-columns: 1fr; }
  .care-card { min-height: 240px; }
  .gallery-card,
  .gallery-card-wide { grid-column: 1 / -1; }
  .gallery-image { height: 270px; }
  .mode-card { min-height: 440px; padding: 30px; }
  .final-layout { grid-template-columns: 1fr; gap: 28px; }
  .final-actions { align-items: flex-start; }
}

@media (max-width: 460px) {
  .hero-copy h1 { font-size: 56px; }
  .hero-image-crop { height: 290px; }
  .visual-note { width: 84%; }
  .truth-section { padding: 90px 0 98px; }
  .truth-layout h2 { font-size: 54px; }
  .story-image-crop { height: 275px; }
  .secondary-window { border-width: 5px; }
  .image-caption { bottom: 10px; padding: 12px; }
  .gallery-image { height: 230px; }
}

@media (prefers-reduced-motion: reduce) {
  .button,
  .gallery-image img { transition: none; }
  .button:hover,
  .gallery-card:hover .gallery-image img { transform: none; }
}
</style>

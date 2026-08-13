export const businessModelMeta = {
  currency: 'USD',
  updatedAt: '12 ago 2026',
  disclaimer: 'Modelo de trabajo · cifras por validar',
}

export const cloudTiers = [
  {
    id: 'free',
    name: 'Free',
    purpose: 'Probar y validar',
    monthlyPrice: 0,
    includedMembers: 1,
    activeMembers: 1,
    cost: { infrastructure: 3.2, platform: 1.1, service: 0.7 },
  },
  {
    id: 'pro',
    name: 'Pro',
    purpose: 'Construir en equipo',
    monthlyPrice: 29,
    includedMembers: 5,
    activeMembers: 3,
    cost: { infrastructure: 7.2, platform: 3.4, service: 1.9 },
  },
  {
    id: 'business',
    name: 'Business',
    purpose: 'Operar y crecer',
    monthlyPrice: 99,
    includedMembers: 25,
    activeMembers: 10,
    cost: { infrastructure: 18, platform: 9.2, service: 7.8 },
  },
]

export const atlasRoles = [
  { number: '01', title: 'Negocio', body: 'Patrocina la aplicación y mide el resultado.' },
  { number: '02', title: 'Producto y expertos', body: 'Definen cómo debe funcionar en la realidad.' },
  { number: '03', title: 'Ingeniería', body: 'Integra y mantiene los sistemas existentes.' },
  { number: '04', title: 'Seguridad e IT', body: 'Controla accesos, datos e infraestructura.' },
]

export const atlasCommercialModel = [
  { label: 'Implementación', value: 15000, cadence: 'una vez' },
  { label: 'Licencia', value: 48000, cadence: 'anual' },
  { label: 'Soporte y expansión', value: 12000, cadence: 'desde / año' },
]

export const projectionAssumptions = {
  cloudArpa: 58,
  atlasMrr: 4000,
  atlasImplementation: 15000,
  months: ['Sep', 'Oct', 'Nov', 'Dic', 'Ene', 'Feb'],
}

export const projectionScenarios = {
  cautious: {
    label: 'Cauteloso',
    description: 'Pilotos más largos y una sola implementación Atlas.',
    cloudAccounts: [8, 14, 22, 32, 44, 58],
    atlasAccounts: [0, 0, 0, 1, 1, 1],
    newAtlas: [0, 0, 0, 1, 0, 0],
    grossMargin: 63,
  },
  base: {
    label: 'Base',
    description: 'Crecimiento constante y tres contratos Atlas activos.',
    cloudAccounts: [12, 25, 43, 66, 94, 130],
    atlasAccounts: [0, 0, 1, 1, 2, 3],
    newAtlas: [0, 0, 1, 0, 1, 1],
    grossMargin: 68,
  },
  accelerated: {
    label: 'Acelerado',
    description: 'Mayor conversión y ocho contratos Atlas activos.',
    cloudAccounts: [18, 40, 75, 125, 190, 275],
    atlasAccounts: [0, 1, 1, 3, 5, 8],
    newAtlas: [0, 1, 0, 2, 2, 3],
    grossMargin: 72,
  },
}

export const futureRevenueIdeas = [
  { horizon: 'Ahora', number: '01', title: 'Suscripción y licencia', body: 'Cloud por plan; Atlas por contrato anual.' },
  { horizon: 'Ahora', number: '02', title: 'Implementación Atlas', body: 'Ingreso inicial por integrar políticas e infraestructura.' },
  { horizon: 'Después', number: '03', title: 'Capacidad y consumo', body: 'Ambientes, almacenamiento y procesamiento adicional.' },
  { horizon: 'Después', number: '04', title: 'Confianza premium', body: 'SLA, respaldos, auditoría y soporte prioritario.' },
  { horizon: 'Futuro', number: '05', title: 'Gobernanza', body: 'Paquetes de cumplimiento, políticas y aprobaciones.' },
  { horizon: 'Futuro', number: '06', title: 'Ecosistema', body: 'Marketplace, implementadores y participación en servicios.' },
]

export const fixedCosts = [
  { label: 'Producto e ingeniería', amount: 18000 },
  { label: 'Seguridad y control plane', amount: 3000 },
  { label: 'Administración, legal y operación', amount: 4000 },
  { label: 'Comercial y éxito del cliente', amount: 5000 },
]

export const variableCosts = [
  { label: 'Cloud', amount: 12.5, unit: 'cuenta / mes', detail: 'Infraestructura, servicios y operación.' },
  { label: 'Atlas', amount: 1250, unit: 'contrato / mes', detail: 'Soporte, acompañamiento y observabilidad.' },
  { label: 'Implementación Atlas', amount: 25, unit: '% del ingreso', detail: 'Integración y puesta en marcha.' },
]

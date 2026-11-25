import type {
  Language,
  NotificationItem,
  Product,
  TrendItem,
  UserMeasurements,
} from '../types';

export const LUMI_HOLOGRAM_IMAGE =
  'https://lh3.googleusercontent.com/aida/ALJJyrBPQmIW5YDOytjZFxaJGbdTUjvQ3c8ZtaqR6qCTjlxzt5uq-Dsw3U7nD-LOFH-ixo9sUguYU2URoJGPWstWcsRl9QRjwP-o6Cu-DpFKFMAwp7dN0tT-5o6lAXDQZdTMGrj6JgQlecOeJgAzZXkXFo7DTOMz_Q4r6DJq8y4eU6soV_6kaCbAcEw14zpmBDyIZITW2uF2bmWTKpVnGcoFjpcaRWtwT1TlTP_uDSlDYW0MjqVKLSdzSqMAUyIInuUroIxz0yl-YA';

export const SHOE_SIZE_CONVERSION: Record<
  number,
  { us: string; uk: string; cm: string }
> = {
  38: { us: '6.0', uk: '5.0', cm: '24.0' },
  39: { us: '7.0', uk: '6.0', cm: '24.5' },
  40: { us: '7.5', uk: '6.5', cm: '25.5' },
  41: { us: '8.5', uk: '7.5', cm: '26.0' },
  42: { us: '9.0', uk: '8.0', cm: '27.0' },
  43: { us: '10.0', uk: '9.0', cm: '27.5' },
  44: { us: '10.5', uk: '9.5', cm: '28.5' },
};

export const DEFAULT_MEASUREMENTS: UserMeasurements = {
  chestCm: 96,
  waistCm: 82,
  hipCm: 98,
  legLengthCm: 102,
  armLengthCm: 62,
  clothingSize: 'M',
  footLengthCm: 26.0,
  footWidth: 'Estándar',
  shoeSizeEU: 41,
  preferredSystem: 'EU',
};

export const PRODUCTS_CATALOG: Product[] = [
  {
    id: 'urban-walk',
    name: 'Tenis Urban Walk',
    price: 48.9,
    category: 'Calzado',
    badgeType: 'size_shoe',
    highlightText: 'Mejor precio',
    description:
      'Plantilla acolchada y peso ligero ideal para caminar largas distancias.',
    image:
      'https://lh3.googleusercontent.com/aida/ALJJyrDQorPypf0h1IOBaCp72XTr2CBujeKZQGDS0d94ZkZBUhU2PkaSqQjycewzChdYAMa1-bTAJHQklU8SYdrDVvJ8xnE6eP1Z9DuzelHaaMYxgBQXQBeQcjFs1qfw5EFqj8Yt14RTwGApG3-ZaZs125mRTDLku656e-oiE68AbalJdUOKvami3QlKNVgFMpErV09Whr6noE2s_Ge7SMlweQoFNFgF7JWoIg9YNVleLB3f4DyfamdbAB8e8fI',
    imageAlt: 'Tenis Urban Walk blancos con detalles morados',
    fallbackIcon: 'directions_walk',
    rating: 4.7,
    pros: ['Precio más bajo', 'Suela suave y ligera'],
    featuredOnHome: true,
  },
  {
    id: 'auriculares-claros',
    name: 'Auriculares Claros',
    price: 54.9,
    category: 'Tecnología',
    badgeType: 'discount',
    badgeText: '-20% Oferta',
    highlightText: '4.8 ★',
    description:
      'Botones físicos grandes y audio nítido pensado para comandos de voz.',
    image:
      'https://lh3.googleusercontent.com/aida/ALJJyrDjQymE2ZL4kFChDSrVpQ02ImCH_U61wx2-vVWYIDvC4w__9kdGOc1IwPtLR0-9-dfmmO8qms6M3cygLslcnoZdla9LDO-TBcVjqBtybsXt_yphXp84vHw42fCc8U3IdJa1rk2CpG9FmYbAcwlIXm9DNH_U00d5phJHAu8SIjLMu2yGIHGOmo09-P0TjnK911rspw3rwxKDSofF-2RMUdP5--n_8RKBzRp5GgHYpiMA9iEUuvyxr-VRUcOQBXvD',
    imageAlt: 'Auriculares Claros inalámbricos en tono morado',
    fallbackIcon: 'headphones',
    rating: 4.8,
    pros: ['Botones físicos amplios', 'Voz cristalina'],
    featuredOnHome: true,
  },
  {
    id: 'reloj-vital-fit',
    name: 'Reloj Vital Fit',
    price: 69.0,
    category: 'Tecnología',
    badgeType: 'trend',
    badgeText: 'Tendencia',
    highlightText: 'Texto grande',
    description:
      'Pantalla de alto contraste, conteo de pasos y recordatorios por voz.',
    image:
      'https://lh3.googleusercontent.com/aida/ALJJyrABtT4ubhPMaE-NXlKH9mv0Ub5uKB8zUAep0ILDCB3vEgg76a_E452JSEU-qT4-5W2cZ6U7xQjTMUK-o9LzItMWpyVSIROOjnlSS-DKcvwDCeoGrHImHiEzAfUF65xQpKlvnr5EIcKTHG_Ccg4arWSEsLve5xtIJE7baHH_WoQX0k2CJ_vtVkwT4T7pcJwuXidCw3C7w_H9X4gjrF3yOCelQSd3hF84RhdaoIyL4QH3wgHnqlPlrkI_75EMduQ',
    imageAlt: 'Reloj Vital Fit con pantalla grande y correa turquesa',
    fallbackIcon: 'watch',
    rating: 4.6,
    pros: ['Lectura en texto grande', 'Alertas por voz'],
    featuredOnHome: true,
  },
  {
    id: 'chaqueta-brisa',
    name: 'Chaqueta Ligera Brisa',
    price: 42.5,
    category: 'Ropa',
    badgeType: 'size_cloth',
    highlightText: 'Ajuste ideal',
    description:
      'Cierre suave de fácil agarre y tela transpirable para todo el año.',
    image:
      'https://lh3.googleusercontent.com/aida/ALJJyrArdOYq2K_-nGJhxxV7TU3SltiDCLh9GjgZMxMplJADR9-RSiMQIOU4aG3GGgEtg0nvvz0puSOX2L6V5vmorgxQjK_gbjfSwsKMtKmsWnTJ0_b6pdPMRniOEQqAy2qgj-ykav5LO-rUdJvX8kD3kH0nDqARYWYJg5J5J31d0qr9aY7mScn_B-_GJjkndkYGy8CCyoCCNvJncuQPgZ_6pJ5uKAxt-4JSFj88T11lR-F8cYR7a9GmBUQS4StdEI4',
    imageAlt: 'Chaqueta Ligera Brisa en azul pizarra',
    fallbackIcon: 'checkroom',
    rating: 4.9,
    pros: ['Cierre de fácil agarre', 'Tela transpirable'],
    featuredOnHome: true,
  },
  {
    id: 'cloudstride-lite',
    name: 'CloudStride Lite',
    price: 57.0,
    category: 'Calzado',
    badgeType: 'size_shoe',
    highlightText: 'Soporte arco',
    description:
      'Mayor soporte en el arco plantar diseñado para caminatas de más de 1 hora.',
    imageAlt: 'Zapatillas deportivas CloudStride Lite de soporte ergonómico',
    fallbackIcon: 'directions_walk',
    rating: 4.8,
    pros: ['Soporte plantar extra', 'Amortiguación duradera'],
    priceNote: '+$8.10 USD',
    featuredOnHome: false,
  },
  {
    id: 'camisa-lino-suave',
    name: 'Camisa Lino Suave',
    price: 36.0,
    category: 'Ropa',
    badgeType: 'size_cloth',
    highlightText: 'Fácil abotonado',
    description:
      'Botones amplios magnéticos ocultos y corte holgado muy cómodo.',
    imageAlt: 'Camisa Lino Suave de corte cómodo',
    fallbackIcon: 'apparel',
    rating: 4.7,
    pros: ['Botones de fácil uso', 'Algodón y lino suave'],
    featuredOnHome: false,
  },
  {
    id: 'mochila-ergo-light',
    name: 'Mochila Ergo Light',
    price: 39.5,
    category: 'Ropa',
    badgeType: 'comfort',
    badgeText: 'Ligera',
    highlightText: 'Tirantes anchos',
    description:
      'Cremalleras con tiradores grandes y distribución equilibrada del peso.',
    imageAlt: 'Mochila Ergo Light acolchada',
    fallbackIcon: 'backpack',
    rating: 4.6,
    pros: ['Tiradores grandes', 'Bolsillo frontal accesible'],
    featuredOnHome: false,
  },
  {
    id: 'lampara-lectura-clara',
    name: 'Lámpara Lectura Clara',
    price: 32.0,
    category: 'Hogar',
    badgeType: 'discount',
    badgeText: '-15% Oferta',
    highlightText: 'Luz cálida',
    description:
      'Interruptor táctil grande sin deslumbramiento, regulable en 3 niveles.',
    imageAlt: 'Lámpara de mesa Lectura Clara con luz cálida',
    fallbackIcon: 'lightbulb',
    rating: 4.9,
    pros: ['Botón único grande', 'Sin reflejos molestos'],
    featuredOnHome: false,
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    category: 'Calzado · Bajada de precio',
    title: 'Tenis Urban Walk bajó un 18%',
    detail: 'Disponible en tu talla guardada con envío gratuito.',
    time: 'Hace 20 min',
    unread: true,
    targetPage: 'tendencias',
  },
  {
    id: 'n2',
    category: 'Tecnología · Accesibilidad',
    title: 'Auriculares Claros con -20% de descuento',
    detail: 'Incluye guía de audio y botones físicos amplios.',
    time: 'Hace 2 h',
    unread: true,
    targetPage: 'sugerencias',
  },
  {
    id: 'n3',
    category: 'LUMI · Tallas',
    title: 'Conversor EU / US / UK actualizado',
    detail: 'Tus medidas están listas para comparar al instante.',
    time: 'Hoy',
    unread: true,
    targetPage: 'medidas',
  },
];

export const TREND_ITEMS: TrendItem[] = [
  {
    id: 't1',
    categoryLabel: 'Calzado · Bajada de precio',
    icon: 'trending_down',
    accentColor: 'primary',
    title: '3 modelos ergonómicos bajaron un 18% esta semana',
    description: 'Disponibles en talla 41 EU con envío gratuito.',
    savingsBadge: 'Ahorro hasta $12',
    relatedProductId: 'urban-walk',
  },
  {
    id: 't2',
    categoryLabel: 'Tecnología · Accesibilidad',
    icon: 'hearing',
    accentColor: 'secondary',
    title: 'Nuevos asistentes de audio con botones táctiles amplios',
    description: 'Comparativa lista para escuchar o leer.',
    savingsBadge: 'Guía por voz',
    relatedProductId: 'auriculares-claros',
  },
  {
    id: 't3',
    categoryLabel: 'Ropa · Comodidad diaria',
    icon: 'checkroom',
    accentColor: 'tertiary',
    title: 'Prendas con cierres suaves y tejidos ligeros en tendencia',
    description: 'Seleccionadas según tu talla habitual guardada.',
    savingsBadge: 'Ajuste verificado',
    relatedProductId: 'chaqueta-brisa',
  },
  {
    id: 't4',
    categoryLabel: 'Bienestar · Lectura fácil',
    icon: 'visibility',
    accentColor: 'secondary',
    title: 'Dispositivos con pantalla de alto contraste y números grandes',
    description: 'Ideal para revisar pasos, hora y avisos sin esfuerzo visual.',
    savingsBadge: 'Alto contraste',
    relatedProductId: 'reloj-vital-fit',
  },
];

export const UI_COPY: Record<
  Language,
  {
    brandSub: string;
    nav: {
      inicio: string;
      asistente: string;
      sugerencias: string;
      tendencias: string;
      medidas: string;
      lista: string;
    };
    voiceBtn: string;
    heroBadge: string;
    heroTitle: string;
    heroDesc: string;
    searchPlaceholder: string;
    askBtn: string;
    trySaying: string;
    chips: [string, string, string];
    holoTitle: string;
    holoLive: string;
    gestureGreet: string;
    gestureInteract: string;
    gestureListen: string;
    integratedPlaceholder: string;
    sendBtn: string;
    suggestionsTitle: string;
    seeAll: string;
    compareBtn: string;
    listenBtn: string;
    saveBtn: string;
    savedBtn: string;
    mySizesBadge: string;
    mySizesTitle: string;
    mySizesDesc: string;
    updateSizesBtn: string;
    trendsTitle: string;
    trendsDesc: string;
    alertsActive: string;
    alertsPaused: string;
    footerTagline: string;
    footerAccess: string;
    footerDisclaimer: string;
  }
> = {
  ES: {
    brandSub: 'Asistente de compras',
    nav: {
      inicio: 'Inicio',
      asistente: 'LUMI',
      sugerencias: 'Sugerencias',
      tendencias: 'Tendencias',
      medidas: 'Medidas',
      lista: 'Lista',
    },
    voiceBtn: 'Voz LUMI',
    heroBadge: 'Holograma LUMI activo · Voz y texto',
    heroTitle: '¡Hola! ¿Qué estás buscando hoy?',
    heroDesc:
      'Soy LUMI, tu compañero de compras. Estoy aquí para darte la bienvenida, buscar productos contigo, comparar precios y guiarte en tu idioma.',
    searchPlaceholder:
      'Ej. Unos tenis cómodos para caminar por menos de $60...',
    askBtn: 'Preguntar',
    trySaying: 'Prueba decir:',
    chips: [
      'Busca zapatos deportivos',
      'Opciones más económicas',
      'Usa mis medidas',
    ],
    holoTitle: 'Holograma 3D LUMI',
    holoLive: 'En vivo',
    gestureGreet: 'Saludar',
    gestureInteract: 'Interactuar',
    gestureListen: 'Escuchar',
    integratedPlaceholder: 'Pregúntale a LUMI...',
    sendBtn: 'Enviar',
    suggestionsTitle: 'Sugerencias para ti',
    seeAll: 'Ver todas',
    compareBtn: 'Comparar',
    listenBtn: 'Escuchar',
    saveBtn: 'Guardar',
    savedBtn: 'Guardado',
    mySizesBadge: 'Mis medidas',
    mySizesTitle: 'Tallas exactas sin adivinar',
    mySizesDesc:
      'LUMI convierte tus medidas entre sistemas US, EU y UK automáticamente para recomendarte ropa y calzado que sí te queden.',
    updateSizesBtn: 'Actualizar mis medidas',
    trendsTitle: 'Tendencias y novedades',
    trendsDesc:
      'Actualizaciones seleccionadas según tus intereses, sin notificaciones invasivas.',
    alertsActive: 'Alertas activas',
    alertsPaused: 'Alertas pausadas',
    footerTagline: 'No compras solo, compras acompañado.',
    footerAccess: 'Navegación por teclado y voz activa',
    footerDisclaimer:
      'Las tallas y recomendaciones son orientativas según cada marca.',
  },
  EN: {
    brandSub: 'Shopping assistant',
    nav: {
      inicio: 'Home',
      asistente: 'LUMI',
      sugerencias: 'Suggestions',
      tendencias: 'Trends',
      medidas: 'Sizes',
      lista: 'Saved',
    },
    voiceBtn: 'LUMI Voice',
    heroBadge: 'LUMI Hologram active · Voice & text',
    heroTitle: 'Hello! What are you looking for today?',
    heroDesc:
      "I'm LUMI, your shopping companion. I'm here to welcome you, search products with you, compare prices, and guide you in your language.",
    searchPlaceholder:
      'E.g. Comfortable walking sneakers under $60...',
    askBtn: 'Ask LUMI',
    trySaying: 'Try saying:',
    chips: [
      'Find athletic shoes',
      'More affordable options',
      'Use my measurements',
    ],
    holoTitle: '3D LUMI Hologram',
    holoLive: 'Live',
    gestureGreet: 'Wave',
    gestureInteract: 'Interact',
    gestureListen: 'Listen',
    integratedPlaceholder: 'Ask LUMI...',
    sendBtn: 'Send',
    suggestionsTitle: 'Suggestions for you',
    seeAll: 'See all',
    compareBtn: 'Compare',
    listenBtn: 'Listen',
    saveBtn: 'Save',
    savedBtn: 'Saved',
    mySizesBadge: 'My sizes',
    mySizesTitle: 'Exact sizes without guessing',
    mySizesDesc:
      'LUMI automatically converts your measurements between US, EU, and UK systems to recommend clothing and footwear that truly fit.',
    updateSizesBtn: 'Update my sizes',
    trendsTitle: 'Trends & updates',
    trendsDesc:
      'Curated updates based on your interests, with zero intrusive alerts.',
    alertsActive: 'Alerts active',
    alertsPaused: 'Alerts paused',
    footerTagline: 'Never shop alone, shop accompanied.',
    footerAccess: 'Keyboard and voice navigation active',
    footerDisclaimer:
      'Sizes and recommendations are indicative and vary by brand.',
  },
  FR: {
    brandSub: "Assistant d'achat",
    nav: {
      inicio: 'Accueil',
      asistente: 'LUMI',
      sugerencias: 'Suggestions',
      tendencias: 'Tendances',
      medidas: 'Mesures',
      lista: 'Liste',
    },
    voiceBtn: 'Voix LUMI',
    heroBadge: 'Hologramme LUMI actif · Voix et texte',
    heroTitle: "Bonjour ! Que cherchez-vous aujourd'hui ?",
    heroDesc:
      'Je suis LUMI, votre compagnon shopping. Je suis là pour vous accueillir, chercher des produits avec vous, comparer les prix et vous guider.',
    searchPlaceholder:
      'Ex. Des baskets confortables pour marcher à moins de 60 $...',
    askBtn: 'Demander',
    trySaying: 'Essayez de dire :',
    chips: [
      'Chercher des chaussures',
      'Options plus économiques',
      'Utiliser mes mesures',
    ],
    holoTitle: 'Hologramme 3D LUMI',
    holoLive: 'En direct',
    gestureGreet: 'Saluer',
    gestureInteract: 'Interagir',
    gestureListen: 'Écouter',
    integratedPlaceholder: 'Demandez à LUMI...',
    sendBtn: 'Envoyer',
    suggestionsTitle: 'Suggestions pour vous',
    seeAll: 'Voir tout',
    compareBtn: 'Comparer',
    listenBtn: 'Écouter',
    saveBtn: 'Enregistrer',
    savedBtn: 'Enregistré',
    mySizesBadge: 'Mes mesures',
    mySizesTitle: 'Des tailles exactes sans deviner',
    mySizesDesc:
      'LUMI convertit automatiquement vos mesures entre US, EU et UK pour vous recommander des vêtements et chaussures adaptés.',
    updateSizesBtn: 'Mettre à jour mes mesures',
    trendsTitle: 'Tendances et nouveautés',
    trendsDesc:
      'Sélections adaptées à vos centres d’intérêt, sans alertes intrusives.',
    alertsActive: 'Alertes actives',
    alertsPaused: 'Alertes en pause',
    footerTagline: "N'achetez pas seul, achetez accompagné.",
    footerAccess: 'Navigation clavier et vocale active',
    footerDisclaimer:
      'Les tailles et recommandations sont indicatives selon chaque marque.',
  },
  PT: {
    brandSub: 'Assistente de compras',
    nav: {
      inicio: 'Início',
      asistente: 'LUMI',
      sugerencias: 'Sugestões',
      tendencias: 'Tendências',
      medidas: 'Medidas',
      lista: 'Lista',
    },
    voiceBtn: 'Voz LUMI',
    heroBadge: 'Holograma LUMI ativo · Voz e texto',
    heroTitle: 'Olá! O que você está procurando hoje?',
    heroDesc:
      'Sou a LUMI, sua companhia de compras. Estou aqui para dar boas-vindas, buscar produtos com você, comparar preços e guiar no seu idioma.',
    searchPlaceholder:
      'Ex. Tênis confortáveis para caminhar por menos de $60...',
    askBtn: 'Perguntar',
    trySaying: 'Tente dizer:',
    chips: [
      'Buscar tênis esportivos',
      'Opções mais econômicas',
      'Usar minhas medidas',
    ],
    holoTitle: 'Holograma 3D LUMI',
    holoLive: 'Ao vivo',
    gestureGreet: 'Acenar',
    gestureInteract: 'Interagir',
    gestureListen: 'Ouvir',
    integratedPlaceholder: 'Pergunte à LUMI...',
    sendBtn: 'Enviar',
    suggestionsTitle: 'Sugestões para você',
    seeAll: 'Ver todas',
    compareBtn: 'Comparar',
    listenBtn: 'Ouvir',
    saveBtn: 'Salvar',
    savedBtn: 'Salvo',
    mySizesBadge: 'Minhas medidas',
    mySizesTitle: 'Tamanhos exatos sem adivinhar',
    mySizesDesc:
      'A LUMI converte suas medidas entre US, EU e UK automaticamente para recomendar roupas e calçados que sirvam bem.',
    updateSizesBtn: 'Atualizar minhas medidas',
    trendsTitle: 'Tendências e novidades',
    trendsDesc:
      'Atualizações selecionadas conforme seus interesses, sem notificações invasivas.',
    alertsActive: 'Alertas ativos',
    alertsPaused: 'Alertas pausados',
    footerTagline: 'Não compre sozinho, compre acompanhado.',
    footerAccess: 'Navegação por teclado e voz ativa',
    footerDisclaimer:
      'Os tamanhos e recomendações são orientativos conforme cada marca.',
  },
};

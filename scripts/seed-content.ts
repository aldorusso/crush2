import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";

const ROOT = join(process.cwd(), "content");

function write(filePath: string, content: string): void {
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, content, "utf-8");
  console.log(`  ✓ ${filePath.replace(process.cwd(), "")}`);
}

// ─── LOREM ───────────────────────────────────────────────────────────────────

const LOREM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet consectetur adipisci velit.

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident. Similique sunt in culpa qui officia deserunt mollitia animi.

Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis rerum necessitatibus saepe eveniet.`;

// ─── AUTHORS ─────────────────────────────────────────────────────────────────

const AUTHORS = [
  {
    slug: "ana-martinez",
    name: "Ana Martínez",
    role: "Editora de Tecnología",
    avatar: "https://picsum.photos/seed/ana/200/200",
    expertise: ["inteligencia artificial", "apps", "cultura digital"],
    twitter: "@anamartinez",
    bio: `Ana Martínez es editora de tecnología con más de ocho años de experiencia explicando conceptos complejos de manera accesible. Licenciada en Periodismo por la Universidad Complutense de Madrid y con un máster en Comunicación Digital, ha colaborado con medios como Xataka y El País Tecnología antes de unirse a crush.news. Especialista en inteligencia artificial y cultura digital, cree firmemente que la tecnología debe ser comprensible para todos. Cuando no escribe, organiza talleres de alfabetización digital en su barrio y practica senderismo por la Sierra de Guadarrama.`,
  },
  {
    slug: "carlos-rodriguez",
    name: "Carlos Rodríguez",
    role: "Redactor de Ciencia",
    avatar: "https://picsum.photos/seed/carlos/200/200",
    expertise: ["divulgación científica", "biología", "historia de la ciencia"],
    twitter: "@carlosrodciencia",
    bio: `Carlos Rodríguez es biólogo de formación y periodista científico de vocación. Graduado en Biología por la Universidad de Granada y con un posgrado en Periodismo Científico en la UAB, lleva una década traduciendo la ciencia compleja al lenguaje cotidiano. Ha trabajado en el Museo Nacional de Ciencias Naturales y colaborado con Muy Interesante y National Geographic España. En crush.news dirige la sección de Ciencia, donde le obsesiona responder el "por qué" de las cosas que damos por sentadas. Aficionado al ajedrez y a los documentales de naturaleza.`,
  },
  {
    slug: "lucia-fernandez",
    name: "Lucía Fernández",
    role: "Editora de Estilo de Vida",
    avatar: "https://picsum.photos/seed/lucia/200/200",
    expertise: ["productividad", "hábitos", "bienestar"],
    linkedin: "lucia-fernandez-estilo",
    bio: `Lucía Fernández es psicóloga y escritora especializada en hábitos, productividad y bienestar cotidiano. Con un grado en Psicología por la Universidad de Valencia y formación en coaching, lleva años ayudando a personas a construir rutinas sostenibles. Antes de unirse a crush.news escribía para Huffington Post España y gestionaba su propio newsletter sobre desarrollo personal, con más de 15.000 suscriptores. Su filosofía: el bienestar no necesita ser complicado. Le apasiona la cocina mediterránea y colecciona agendas de papel aunque use el móvil para todo.`,
  },
  {
    slug: "miguel-sanchez",
    name: "Miguel Sánchez",
    role: "Redactor de Cultura",
    avatar: "https://picsum.photos/seed/miguel/200/200",
    expertise: ["cine", "videojuegos", "música", "libros"],
    twitter: "@miguelsanchezc",
    bio: `Miguel Sánchez es crítico cultural con una curiosidad sin límites por el cine, los videojuegos y la música. Estudió Humanidades en la Universidad Carlos III y completó un máster en Crítica Cultural en la UNED. Ha escrito para Fotogramas, Mondo Sonoro y GameReactor antes de fichar por crush.news, donde cree que la cultura popular merece análisis serios. No escribe reviews del día: prefiere entender fenómenos, contextos e industrias. Jugador empedernido de rol y oyente compulsivo de álbumes de debut.`,
  },
  {
    slug: "elena-gomez",
    name: "Elena Gómez",
    role: "Editora de Viajes",
    avatar: "https://picsum.photos/seed/elena/200/200",
    expertise: ["viajes de mochilero", "gastronomía viajera", "destinos poco conocidos"],
    twitter: "@elenagomezviaja",
    bio: `Elena Gómez ha pisado más de sesenta países y escrito sobre todos ellos. Periodista de viajes formada en la Escuela de Periodismo UAM-El País, trabajó cinco años como guía de viajes antes de dar el salto al periodismo. Sus reportajes combinan logística práctica con la mirada del viajero curioso que busca lo auténtico más allá de los circuitos turísticos. En crush.news dirige Viajes con una filosofía clara: viajar bien no significa gastar más, sino saber dónde mirar. Tiene una mochila de 45 litros siempre lista junto a la puerta.`,
  },
  {
    slug: "pablo-jimenez",
    name: "Pablo Jiménez",
    role: "Redactor de Tecnología",
    avatar: "https://picsum.photos/seed/pablo/200/200",
    expertise: ["gadgets", "hardware", "comparativas"],
    twitter: "@pablojimeneztech",
    bio: `Pablo Jiménez es ingeniero de telecomunicaciones reconvertido en periodista tecnológico, lo que le da una ventaja única: entiende cómo funcionan los gadgets por dentro antes de explicar para qué sirven por fuera. Graduado en Ingeniería de Telecomunicaciones por la UPM, trabajó tres años en una startup de hardware antes de empezar a escribir para medios como Engadget en Español y Computer Hoy. En crush.news se especializa en comparativas y guías de compra que realmente ayudan a decidir. Tiene en casa más gadgets de los que debería.`,
  },
  {
    slug: "sofia-navarro",
    name: "Sofía Navarro",
    role: "Redactora de Ciencia y Curiosidades",
    avatar: "https://picsum.photos/seed/sofia/200/200",
    expertise: ["curiosidades científicas", "cuerpo humano", "fenómenos naturales"],
    twitter: "@sofianavarro",
    bio: `Sofía Navarro es química y divulgadora científica enamorada de las preguntas raras: ¿por qué los dedos se arrugan en el agua? ¿Cómo sabe el cerebro que tiene hambre? Graduada en Química por la Universidad de Salamanca con doctorado en bioquímica, decidió que prefería explicar la ciencia que hacerla en un laboratorio. Ha colaborado con el canal de YouTube "Ciencia en casa" y con la revista Investigación y Ciencia. En crush.news lidera las secciones de Curiosidades y Cuerpo Humano con el objetivo de hacer la ciencia irresistible. Le encanta el origami y los crucigramas difíciles.`,
  },
  {
    slug: "andres-morales",
    name: "Andrés Morales",
    role: "Redactor de Cultura Digital",
    avatar: "https://picsum.photos/seed/andres/200/200",
    expertise: ["redes sociales", "cultura internet", "tendencias digitales"],
    twitter: "@andresmoralesdi",
    bio: `Andrés Morales lleva una década analizando cómo internet cambia la cultura, el humor y las relaciones humanas. Sociólogo de formación por la Universidad de Sevilla con un máster en Sociología Digital en la London School of Economics, ha publicado artículos académicos sobre cultura de memes y fenómenos virales antes de pasarse al periodismo. En crush.news escribe sobre cultura digital con la misma profundidad con que un crítico literario analiza una novela. Cree que los memes son el folclore del siglo XXI. Colecciona screenshots de internet que "algún día estudiarán los historiadores".`,
  },
];

// ─── CATEGORIES ──────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    slug: "tecnologia",
    name: "Tecnología",
    description: "Apps, inteligencia artificial, gadgets y cultura digital explicados para todos.",
    subcategories: [
      {
        slug: "apps-y-servicios",
        name: "Apps y Servicios",
        description: "Qué es X, cómo funciona Y",
      },
      {
        slug: "inteligencia-artificial",
        name: "Inteligencia Artificial",
        description: "Explicadores de IA y herramientas",
      },
      { slug: "gadgets", name: "Gadgets", description: "Comparativas y guías de compra" },
      {
        slug: "cultura-digital",
        name: "Cultura Digital",
        description: "Redes, tendencias y análisis de lo que pasa online",
      },
    ],
  },
  {
    slug: "estilo-de-vida",
    name: "Estilo de Vida",
    description: "Productividad, hábitos, hogar y relaciones para vivir mejor sin complicaciones.",
    subcategories: [
      {
        slug: "productividad",
        name: "Productividad",
        description: "Métodos, herramientas y sistemas que funcionan",
      },
      { slug: "hogar", name: "Hogar", description: "Organización y decoración práctica" },
      {
        slug: "relaciones",
        name: "Relaciones",
        description: "Reflexiones sobre vínculos y comunicación",
      },
      { slug: "habitos", name: "Hábitos", description: "Rutinas y desarrollo personal ligero" },
    ],
  },
  {
    slug: "ciencia",
    name: "Ciencia",
    description:
      "Divulgación científica rigurosa y accesible: curiosidades, cuerpo humano e historia.",
    subcategories: [
      {
        slug: "el-porque-de-las-cosas",
        name: "El Porqué de las Cosas",
        description: "Respuestas a las preguntas que siempre quisiste hacer",
      },
      {
        slug: "curiosidades",
        name: "Curiosidades",
        description: "Datos fascinantes con fuente verificada",
      },
      {
        slug: "cuerpo-humano",
        name: "Cuerpo Humano",
        description: "Divulgación de fisiología sin ser YMYL",
      },
      {
        slug: "historia-de-la-ciencia",
        name: "Historia de la Ciencia",
        description: "Las historias detrás de los grandes descubrimientos",
      },
    ],
  },
  {
    slug: "viajes",
    name: "Viajes",
    description:
      "Guías de ciudad, experiencias únicas, consejos prácticos y destinos por descubrir.",
    subcategories: [
      {
        slug: "guias-de-ciudad",
        name: "Guías de Ciudad",
        description: "Todo lo que ver y hacer en 3 días",
      },
      {
        slug: "experiencias",
        name: "Experiencias",
        description: "Viajes temáticos y nichos viajeros",
      },
      {
        slug: "consejos-practicos",
        name: "Consejos Prácticos",
        description: "Logística atemporal para viajar mejor",
      },
      {
        slug: "descubrimientos",
        name: "Descubrimientos",
        description: "Lugares que no salen en las guías",
      },
    ],
  },
  {
    slug: "cultura",
    name: "Cultura",
    description:
      "Análisis de series, cine, música, videojuegos y libros desde una perspectiva de fondo.",
    subcategories: [
      {
        slug: "series-y-cine",
        name: "Series y Cine",
        description: "Análisis de fenómenos, no reviews del día",
      },
      { slug: "musica", name: "Música", description: "Historia, géneros y contextos musicales" },
      { slug: "videojuegos", name: "Videojuegos", description: "Lore, industria y cultura gamer" },
      {
        slug: "libros",
        name: "Libros",
        description: "Canon, recomendaciones y lecturas temáticas",
      },
    ],
  },
];

// ─── ARTICLES ────────────────────────────────────────────────────────────────

interface ArticleDef {
  title: string;
  slug: string;
  description: string;
  author: string;
  category: string;
  subcategory: string;
  tags: string[];
  imageId: number;
  featured?: boolean;
  daysAgo: number;
}

const ARTICLES: ArticleDef[] = [
  // TECNOLOGÍA / APPS Y SERVICIOS
  {
    title: "Qué es Notion y por qué todo el mundo habla de él",
    slug: "que-es-notion",
    description:
      "Notion es mucho más que una app de notas: es una base de datos personal, gestor de proyectos y wiki todo en uno. Te explicamos desde cero cómo funciona y si merece la pena.",
    author: "ana-martinez",
    category: "tecnologia",
    subcategory: "apps-y-servicios",
    tags: ["notion", "productividad", "apps"],
    imageId: 10,
    featured: true,
    daysAgo: 2,
  },
  {
    title: "Cómo funciona Spotify por dentro: el algoritmo que conoce tu gusto",
    slug: "como-funciona-spotify-algoritmo",
    description:
      "Descubre cómo Spotify decide qué canciones aparecen en Discover Weekly, qué datos analiza y por qué a veces parece que te lee la mente.",
    author: "pablo-jimenez",
    category: "tecnologia",
    subcategory: "apps-y-servicios",
    tags: ["spotify", "algoritmos", "streaming", "musica"],
    imageId: 11,
    daysAgo: 5,
  },
  {
    title: "WhatsApp, Telegram o Signal: diferencias reales que importan",
    slug: "whatsapp-telegram-signal-diferencias",
    description:
      "Más allá del debate habitual: analizamos cifrado, metadatos, propiedad corporativa y funciones para que elijas con información real.",
    author: "andres-morales",
    category: "tecnologia",
    subcategory: "apps-y-servicios",
    tags: ["whatsapp", "telegram", "signal", "privacidad"],
    imageId: 12,
    daysAgo: 10,
  },

  // TECNOLOGÍA / INTELIGENCIA ARTIFICIAL
  {
    title: "Qué es un modelo de lenguaje y cómo funciona ChatGPT",
    slug: "que-es-modelo-lenguaje-chatgpt",
    description:
      "Sin matemáticas complicadas: explicamos qué son los LLM, cómo aprenden, por qué inventan cosas y qué significa realmente que una IA 'piense'.",
    author: "ana-martinez",
    category: "tecnologia",
    subcategory: "inteligencia-artificial",
    tags: ["chatgpt", "llm", "ia", "openai"],
    imageId: 20,
    featured: true,
    daysAgo: 1,
  },
  {
    title: "Cómo usar Claude para trabajar mejor: guía práctica",
    slug: "como-usar-claude-guia-practica",
    description:
      "Claude es uno de los asistentes de IA más capaces del momento. Esta guía explica sus puntos fuertes, cómo escribir buenos prompts y para qué tareas brilla especialmente.",
    author: "ana-martinez",
    category: "tecnologia",
    subcategory: "inteligencia-artificial",
    tags: ["claude", "ia", "prompts", "productividad"],
    imageId: 21,
    daysAgo: 3,
  },
  {
    title: "Midjourney vs DALL-E vs Stable Diffusion: qué generador de imágenes elegir",
    slug: "midjourney-dalle-stable-diffusion-comparativa",
    description:
      "Comparamos las tres grandes plataformas de generación de imágenes con IA: calidad, precios, facilidad de uso y casos en que cada una destaca.",
    author: "pablo-jimenez",
    category: "tecnologia",
    subcategory: "inteligencia-artificial",
    tags: ["midjourney", "dalle", "ia", "diseño"],
    imageId: 22,
    daysAgo: 7,
  },
  {
    title: "El problema de las alucinaciones en la IA: por qué los modelos inventan datos",
    slug: "alucinaciones-ia-por-que-inventan-datos",
    description:
      "Las IAs a veces afirman cosas falsas con total seguridad. Explicamos el origen técnico de este fenómeno y cómo protegerte de él en el día a día.",
    author: "ana-martinez",
    category: "tecnologia",
    subcategory: "inteligencia-artificial",
    tags: ["ia", "alucinaciones", "chatgpt", "fiabilidad"],
    imageId: 23,
    daysAgo: 15,
  },

  // TECNOLOGÍA / GADGETS
  {
    title: "Los mejores auriculares con cancelación de ruido en 2026: guía completa",
    slug: "mejores-auriculares-cancelacion-ruido-2026",
    description:
      "Analizamos las opciones más destacadas de cancelación de ruido activa: Sony, Bose, Apple y alternativas más económicas que sorprenden.",
    author: "pablo-jimenez",
    category: "tecnologia",
    subcategory: "gadgets",
    tags: ["auriculares", "anc", "sony", "bose"],
    imageId: 30,
    daysAgo: 4,
  },
  {
    title: "Cómo elegir un monitor para trabajar desde casa sin arruinarse",
    slug: "elegir-monitor-trabajo-desde-casa",
    description:
      "Resolución, panel, tamaño, ergonomía y precio: todo lo que necesitas saber para no equivocarte en la compra más importante de tu setup.",
    author: "pablo-jimenez",
    category: "tecnologia",
    subcategory: "gadgets",
    tags: ["monitor", "setup", "trabajo-remoto", "hardware"],
    imageId: 31,
    daysAgo: 12,
  },
  {
    title: "Teclados mecánicos para empezar: qué switches elegir y por qué importa",
    slug: "teclados-mecanicos-switches-guia",
    description:
      "Switches rojos, azules, marrones y silenciosos: explicamos las diferencias reales y cuál encaja mejor según tu forma de trabajar o jugar.",
    author: "pablo-jimenez",
    category: "tecnologia",
    subcategory: "gadgets",
    tags: ["teclado", "mecanico", "switches", "gaming"],
    imageId: 32,
    daysAgo: 20,
  },

  // TECNOLOGÍA / CULTURA DIGITAL
  {
    title: "Por qué los memes son el nuevo folclore: análisis cultural",
    slug: "memes-nuevo-folclore-analisis-cultural",
    description:
      "Los memes no son solo chistes de internet: tienen estructura narrativa, transmiten valores culturales y evolucionan como el folclore tradicional. Un análisis serio.",
    author: "andres-morales",
    category: "tecnologia",
    subcategory: "cultura-digital",
    tags: ["memes", "cultura-internet", "sociologia", "folclore"],
    imageId: 40,
    featured: true,
    daysAgo: 6,
  },
  {
    title:
      "La economía de la atención: por qué las redes sociales están diseñadas para engancharte",
    slug: "economia-atencion-redes-sociales-diseno",
    description:
      "Variables de recompensa aleatoria, scroll infinito, notificaciones: las técnicas de diseño persuasivo que usan las plataformas y cómo funcionan psicológicamente.",
    author: "andres-morales",
    category: "tecnologia",
    subcategory: "cultura-digital",
    tags: ["redes-sociales", "psicologia", "atencion", "diseño"],
    imageId: 41,
    daysAgo: 9,
  },
  {
    title: "El fenómeno FOMO y cómo internet lo amplifica",
    slug: "fomo-internet-como-funciona",
    description:
      "El miedo a perderse algo existía antes de las redes, pero internet lo ha convertido en una presión constante. Qué es el FOMO, de dónde viene y qué hacer con él.",
    author: "andres-morales",
    category: "tecnologia",
    subcategory: "cultura-digital",
    tags: ["fomo", "redes-sociales", "bienestar-digital", "psicologia"],
    imageId: 42,
    daysAgo: 18,
  },

  // ESTILO DE VIDA / PRODUCTIVIDAD
  {
    title: "El método GTD explicado de forma sencilla",
    slug: "metodo-gtd-explicado-sencillo",
    description:
      "Getting Things Done de David Allen sigue siendo el sistema de productividad más influyente 20 años después. Te explicamos sus cinco pasos sin jerga innecesaria.",
    author: "lucia-fernandez",
    category: "estilo-de-vida",
    subcategory: "productividad",
    tags: ["gtd", "productividad", "organizacion", "david-allen"],
    imageId: 50,
    daysAgo: 3,
  },
  {
    title: "Tiempo en bloques: la técnica de productividad que usan los CEOs",
    slug: "tiempo-en-bloques-time-blocking",
    description:
      "El time blocking consiste en asignar tareas a huecos concretos del calendario en lugar de trabajar con listas. Cómo implementarlo y por qué funciona.",
    author: "lucia-fernandez",
    category: "estilo-de-vida",
    subcategory: "productividad",
    tags: ["time-blocking", "productividad", "calendario", "foco"],
    imageId: 51,
    daysAgo: 11,
  },
  {
    title: "Por qué tu lista de tareas no funciona y cómo arreglarlo",
    slug: "lista-tareas-no-funciona-como-mejorar",
    description:
      "El 80% de las listas de tareas fallan por los mismos motivos. Analizamos los errores más comunes y los principios de diseño que hacen que una lista realmente funcione.",
    author: "lucia-fernandez",
    category: "estilo-de-vida",
    subcategory: "productividad",
    tags: ["tareas", "productividad", "organizacion", "gestion-tiempo"],
    imageId: 52,
    daysAgo: 22,
  },

  // ESTILO DE VIDA / HOGAR
  {
    title: "Cómo organizar un armario pequeño sin gastar dinero",
    slug: "organizar-armario-pequeno-sin-gastar",
    description:
      "Doblado vertical, cajas de zapatos recicladas y la regla del uno-entra-uno-sale: técnicas de organización que no requieren comprar nada nuevo.",
    author: "lucia-fernandez",
    category: "estilo-de-vida",
    subcategory: "hogar",
    tags: ["organizacion", "armario", "hogar", "minimalismo"],
    imageId: 60,
    daysAgo: 8,
  },
  {
    title: "Plantas que purifican el aire de casa: mito vs realidad",
    slug: "plantas-purifican-aire-mito-realidad",
    description:
      "La NASA lo estudió pero los medios lo malinterpretaron. Cuántas plantas necesitarías realmente para notar un efecto y cuáles son las más resistentes para principiantes.",
    author: "sofia-navarro",
    category: "estilo-de-vida",
    subcategory: "hogar",
    tags: ["plantas", "hogar", "calidad-aire", "ciencia"],
    imageId: 61,
    daysAgo: 16,
  },

  // ESTILO DE VIDA / RELACIONES
  {
    title: "La diferencia entre escuchar y esperar tu turno para hablar",
    slug: "diferencia-escuchar-esperar-turno-hablar",
    description:
      "La escucha activa es una habilidad, no un instinto. Exploramos qué ocurre en el cerebro durante una conversación y por qué la mayoría de nosotros no escucha de verdad.",
    author: "lucia-fernandez",
    category: "estilo-de-vida",
    subcategory: "relaciones",
    tags: ["comunicacion", "escucha-activa", "relaciones", "psicologia"],
    imageId: 70,
    daysAgo: 14,
  },
  {
    title: "Por qué las amistades adultas son más difíciles (y cómo cultivarlas)",
    slug: "amistades-adultas-mas-dificiles-como-cultivar",
    description:
      "Después de los 30, hacer amigos requiere esfuerzo activo. La ciencia explica por qué y qué estrategias funcionan para construir vínculos reales en la vida adulta.",
    author: "lucia-fernandez",
    category: "estilo-de-vida",
    subcategory: "relaciones",
    tags: ["amistad", "relaciones", "adultos", "sociologia"],
    imageId: 71,
    daysAgo: 25,
  },

  // ESTILO DE VIDA / HÁBITOS
  {
    title: "El hábito de las dos minutos: la regla que cambia todo",
    slug: "habito-dos-minutos-regla",
    description:
      "Si una tarea tarda menos de dos minutos, hazla ahora. Este principio simple de David Allen tiene más impacto psicológico del que parece. Por qué funciona y cómo aplicarlo.",
    author: "lucia-fernandez",
    category: "estilo-de-vida",
    subcategory: "habitos",
    tags: ["habitos", "productividad", "gestion-tiempo", "psicologia"],
    imageId: 80,
    daysAgo: 5,
  },
  {
    title: "Cómo construir un hábito de lectura cuando no tienes tiempo",
    slug: "construir-habito-lectura-sin-tiempo",
    description:
      "No necesitas una hora al día. Con 10-15 minutos bien ubicados en tu rutina puedes leer 12 libros al año. Las estrategias que realmente funcionan.",
    author: "lucia-fernandez",
    category: "estilo-de-vida",
    subcategory: "habitos",
    tags: ["lectura", "habitos", "rutinas", "libros"],
    imageId: 81,
    daysAgo: 19,
  },

  // CIENCIA / EL PORQUÉ DE LAS COSAS
  {
    title: "Por qué el cielo es azul y no violeta",
    slug: "por-que-cielo-es-azul-no-violeta",
    description:
      "La respuesta correcta no es solo 'dispersión de Rayleigh'. El violeta se dispersa más que el azul, entonces ¿por qué no vemos el cielo violeta? La respuesta te va a sorprender.",
    author: "carlos-rodriguez",
    category: "ciencia",
    subcategory: "el-porque-de-las-cosas",
    tags: ["fisica", "luz", "atmosfera", "optica"],
    imageId: 90,
    featured: true,
    daysAgo: 2,
  },
  {
    title: "Por qué se nos arruga la piel en el agua",
    slug: "por-que-arruga-piel-agua",
    description:
      "Durante décadas se creyó que era osmosis. Resulta que la respuesta real es mucho más interesante: el sistema nervioso autónomo y la evolución tienen mucho que decir.",
    author: "sofia-navarro",
    category: "ciencia",
    subcategory: "el-porque-de-las-cosas",
    tags: ["cuerpo-humano", "piel", "evolucion", "biologia"],
    imageId: 91,
    daysAgo: 7,
  },
  {
    title: "Por qué bostezamos y por qué es contagioso",
    slug: "por-que-bostezamos-contagioso",
    description:
      "El bostezo sigue siendo uno de los misterios más estudiados de la neurociencia. Lo que sabemos, lo que no sabemos y por qué ver la palabra 'bostezo' puede hacerte bostezar.",
    author: "sofia-navarro",
    category: "ciencia",
    subcategory: "el-porque-de-las-cosas",
    tags: ["neurociencia", "bostezo", "comportamiento", "evolucion"],
    imageId: 92,
    daysAgo: 13,
  },
  {
    title: "Por qué el tiempo parece ir más rápido cuando eres mayor",
    slug: "por-que-tiempo-pasa-rapido-mayor",
    description:
      "A los 8 años un verano dura una eternidad. A los 40, el año vuela. La neurociencia y la psicología del tiempo explican este fenómeno y qué puedes hacer al respecto.",
    author: "carlos-rodriguez",
    category: "ciencia",
    subcategory: "el-porque-de-las-cosas",
    tags: ["percepcion-tiempo", "neurociencia", "psicologia", "memoria"],
    imageId: 93,
    daysAgo: 21,
  },

  // CIENCIA / CURIOSIDADES
  {
    title: "El experimento de Stanford que cambió la psicología para siempre",
    slug: "experimento-stanford-prision-psicologia",
    description:
      "El experimento de la prisión de Stanford de 1971 se cita en todos los libros de psicología. Pero lo que no te cuentan es que tenía graves problemas metodológicos.",
    author: "carlos-rodriguez",
    category: "ciencia",
    subcategory: "curiosidades",
    tags: ["psicologia", "experimentos", "stanford", "etica-cientifica"],
    imageId: 100,
    daysAgo: 9,
  },
  {
    title: "Cuántos idiomas hay en el mundo y cuántos están en peligro",
    slug: "cuantos-idiomas-hay-mundo-peligro-extincion",
    description:
      "Hay entre 6.000 y 7.000 idiomas vivos en la Tierra. Uno muere cada dos semanas. Qué ocurre cuando un idioma desaparece y quién trabaja para preservarlos.",
    author: "carlos-rodriguez",
    category: "ciencia",
    subcategory: "curiosidades",
    tags: ["linguistica", "idiomas", "diversidad-cultural", "extincion"],
    imageId: 101,
    daysAgo: 17,
  },
  {
    title: "El número de átomos en el universo observable y por qué importa saberlo",
    slug: "numero-atomos-universo-observable",
    description:
      "El universo observable contiene aproximadamente 10^80 átomos. Una cifra que desafía la intuición humana. Cómo se calcula y qué nos dice sobre nuestra escala en el cosmos.",
    author: "sofia-navarro",
    category: "ciencia",
    subcategory: "curiosidades",
    tags: ["cosmologia", "fisica", "universo", "matematicas"],
    imageId: 102,
    daysAgo: 26,
  },

  // CIENCIA / CUERPO HUMANO
  {
    title: "Cómo funciona el sueño: las fases que no se pueden saltarse",
    slug: "como-funciona-sueno-fases-rem",
    description:
      "El sueño no es una pausa: es uno de los procesos más activos del organismo. Fases REM, consolidación de memoria y por qué dormir mal afecta tanto al cerebro.",
    author: "sofia-navarro",
    category: "ciencia",
    subcategory: "cuerpo-humano",
    tags: ["sueno", "salud", "neurociencia", "rem"],
    imageId: 110,
    daysAgo: 4,
  },
  {
    title: "Por qué tenemos apéndice si no sirve para nada (o sí sirve)",
    slug: "para-que-sirve-el-apendice",
    description:
      "La ciencia lleva décadas debatiendo si el apéndice es un vestigio evolutivo o tiene función. La respuesta más reciente cambia lo que se enseñaba en los colegios.",
    author: "carlos-rodriguez",
    category: "ciencia",
    subcategory: "cuerpo-humano",
    tags: ["apendice", "evolucion", "anatomia", "microbioma"],
    imageId: 111,
    daysAgo: 23,
  },

  // CIENCIA / HISTORIA DE LA CIENCIA
  {
    title: "La historia de Ignaz Semmelweis: el médico que murió por tener razón",
    slug: "ignaz-semmelweis-lavado-manos-historia",
    description:
      "A mediados del siglo XIX, Semmelweis descubrió que lavarse las manos salvaba vidas. Sus colegas lo rechazaron, le destruyeron la carrera y murió en un psiquiátrico. Una historia sobre resistencia al cambio.",
    author: "carlos-rodriguez",
    category: "ciencia",
    subcategory: "historia-de-la-ciencia",
    tags: ["historia-ciencia", "medicina", "semmelweis", "higiene"],
    imageId: 120,
    daysAgo: 6,
  },
  {
    title: "Nikola Tesla y Edison: la guerra de las corrientes que Tesla perdió (y ganó)",
    slug: "tesla-edison-guerra-corrientes",
    description:
      "La guerra entre corriente continua y alterna es uno de los episodios más dramáticos de la historia tecnológica. Quién tenía razón científicamente y quién ganó comercialmente.",
    author: "sofia-navarro",
    category: "ciencia",
    subcategory: "historia-de-la-ciencia",
    tags: ["tesla", "edison", "electricidad", "historia-ciencia"],
    imageId: 121,
    daysAgo: 30,
  },

  // VIAJES / GUÍAS DE CIUDAD
  {
    title: "Lisboa en 3 días: itinerario honesto sin colas ni trampas turísticas",
    slug: "lisboa-3-dias-itinerario",
    description:
      "Lisboa es una de las ciudades más visitadas de Europa, pero sus mejores rincones no salen en los tours. Nuestra guía para aprovecharla de verdad con transporte público.",
    author: "elena-gomez",
    category: "viajes",
    subcategory: "guias-de-ciudad",
    tags: ["lisboa", "portugal", "viaje-europa", "itinerario"],
    imageId: 130,
    featured: true,
    daysAgo: 8,
  },
  {
    title: "Tokio para principiantes: todo lo que nadie te cuenta antes de ir",
    slug: "tokio-principiantes-guia-completa",
    description:
      "Tokio parece intimidante pero es una de las ciudades más fáciles del mundo para moverse. Transporte, pagos, etiqueta y los barrios que merece la pena explorar.",
    author: "elena-gomez",
    category: "viajes",
    subcategory: "guias-de-ciudad",
    tags: ["tokio", "japon", "asia", "guia-viaje"],
    imageId: 131,
    daysAgo: 15,
  },
  {
    title: "Sevilla en otoño: por qué es la mejor temporada para visitarla",
    slug: "sevilla-otono-mejor-temporada",
    description:
      "Septiembre y octubre transforman Sevilla: temperaturas perfectas, menos turistas y la ciudad en su versión más cotidiana. Lo que ver, comer y donde alojarse.",
    author: "elena-gomez",
    category: "viajes",
    subcategory: "guias-de-ciudad",
    tags: ["sevilla", "espana", "andalucia", "viaje-otono"],
    imageId: 132,
    daysAgo: 28,
  },

  // VIAJES / EXPERIENCIAS
  {
    title: "El Camino de Santiago en 10 días: la etapa Primitivo paso a paso",
    slug: "camino-santiago-primitivo-10-dias",
    description:
      "El Camino Primitivo es el más antiguo y el menos masificado. Preparación física, equipaje imprescindible y los albergues que merece la pena conocer.",
    author: "elena-gomez",
    category: "viajes",
    subcategory: "experiencias",
    tags: ["camino-santiago", "senderismo", "espana", "peregrinacion"],
    imageId: 140,
    daysAgo: 11,
  },
  {
    title: "Voluntariado en el extranjero: cómo elegir un programa que realmente ayude",
    slug: "voluntariado-extranjero-elegir-programa",
    description:
      "El volunturismo mal planteado puede hacer más daño que bien. Guía para distinguir programas serios de los que solo venden una experiencia para el Instagram.",
    author: "elena-gomez",
    category: "viajes",
    subcategory: "experiencias",
    tags: ["voluntariado", "viaje-responsable", "ong", "viaje-solidario"],
    imageId: 141,
    daysAgo: 24,
  },

  // VIAJES / CONSEJOS PRÁCTICOS
  {
    title: "Cómo hacer una maleta de cabina que dure dos semanas",
    slug: "maleta-cabina-dos-semanas-tecnica",
    description:
      "El método enrollado, la regla 5-4-3-2-1 y la cápsula de ropa de viaje: técnicas probadas para viajar solo con equipaje de mano sin renunciar a nada esencial.",
    author: "elena-gomez",
    category: "viajes",
    subcategory: "consejos-practicos",
    tags: ["equipaje", "maleta-cabina", "viaje-ligero", "consejos"],
    imageId: 150,
    daysAgo: 5,
  },
  {
    title: "Seguro de viaje: qué cubre realmente y qué no (con ejemplos reales)",
    slug: "seguro-viaje-que-cubre-realmente",
    description:
      "La letra pequeña de los seguros de viaje está llena de sorpresas. Analizamos las exclusiones más frecuentes y qué cobertura mínima necesitas según el destino.",
    author: "elena-gomez",
    category: "viajes",
    subcategory: "consejos-practicos",
    tags: ["seguro-viaje", "viaje", "consejos", "finanzas-viaje"],
    imageId: 151,
    daysAgo: 20,
  },

  // VIAJES / DESCUBRIMIENTOS
  {
    title: "Las Azores: el archipiélago portugués que parece sacado de otra dimensión",
    slug: "azores-archipielago-portugues-guia",
    description:
      "Volcanes activos, lagos de colores, ballenas y termas naturales: las Azores son uno de los destinos más espectaculares de Europa y uno de los menos masificados.",
    author: "elena-gomez",
    category: "viajes",
    subcategory: "descubrimientos",
    tags: ["azores", "portugal", "islas-atlantico", "naturaleza"],
    imageId: 160,
    daysAgo: 13,
  },
  {
    title: "Ribeira Sacra: la Toscana gallega que nadie conoce todavía",
    slug: "ribeira-sacra-galicia-desconocida",
    description:
      "Los cañones del Sil, los viñedos verticales y los monasterios románicos de la Ribeira Sacra conforman uno de los paisajes más impresionantes de España, aún sin masificar.",
    author: "elena-gomez",
    category: "viajes",
    subcategory: "descubrimientos",
    tags: ["galicia", "ribeira-sacra", "espana-interior", "vino"],
    imageId: 161,
    daysAgo: 31,
  },

  // CULTURA / SERIES Y CINE
  {
    title: "Por qué The Wire sigue siendo la mejor serie de televisión jamás hecha",
    slug: "the-wire-mejor-serie-television",
    description:
      "Han pasado 20 años y ninguna serie ha igualado la profundidad sistémica de The Wire. Un análisis de por qué su mirada sobre las instituciones sigue siendo insuperada.",
    author: "miguel-sanchez",
    category: "cultura",
    subcategory: "series-y-cine",
    tags: ["the-wire", "series", "hbo", "analisis"],
    imageId: 170,
    featured: true,
    daysAgo: 3,
  },
  {
    title: "La nueva ola del cine coreano: más allá de Parásitos",
    slug: "cine-coreano-nueva-ola-mas-alla-parasitos",
    description:
      "Parásitos puso el cine coreano en el mapa occidental, pero la nueva ola lleva décadas construyéndose. Directores, películas y las características que definen este movimiento.",
    author: "miguel-sanchez",
    category: "cultura",
    subcategory: "series-y-cine",
    tags: ["cine-coreano", "parasitos", "bong-joon-ho", "cine-mundial"],
    imageId: 171,
    daysAgo: 10,
  },
  {
    title: "Por qué Christopher Nolan no usa CGI (y qué cambia eso)",
    slug: "christopher-nolan-sin-cgi-diferencia",
    description:
      "Nolan es conocido por su rechazo al CGI en favor de efectos prácticos. Más allá de la filosofía, exploramos el impacto real en la experiencia del espectador y en el rodaje.",
    author: "miguel-sanchez",
    category: "cultura",
    subcategory: "series-y-cine",
    tags: ["nolan", "cine", "cgi", "efectos-especiales"],
    imageId: 172,
    daysAgo: 18,
  },

  // CULTURA / MÚSICA
  {
    title: "Por qué los años 90 fueron la última gran era del rock",
    slug: "anos-90-ultima-gran-era-rock",
    description:
      "El grunge, el britpop, el rock alternativo y el metal alternativo convergieron en una década de explosión creativa. Por qué ese momento fue irrepetible y qué lo acabó.",
    author: "miguel-sanchez",
    category: "cultura",
    subcategory: "musica",
    tags: ["rock", "anos-90", "grunge", "britpop"],
    imageId: 180,
    daysAgo: 7,
  },
  {
    title: "Cómo funciona la teoría musical y por qué ayuda a escuchar mejor",
    slug: "teoria-musical-como-funciona-escuchar-mejor",
    description:
      "No necesitas saber solfeo para entender por qué una canción te emociona. Los conceptos básicos de teoría musical que cambian la forma de escuchar música.",
    author: "miguel-sanchez",
    category: "cultura",
    subcategory: "musica",
    tags: ["teoria-musical", "musica", "educacion", "armonia"],
    imageId: 181,
    daysAgo: 22,
  },

  // CULTURA / VIDEOJUEGOS
  {
    title: "El lore de Dark Souls explicado de verdad: la historia completa",
    slug: "lore-dark-souls-historia-completa",
    description:
      "FromSoftware esconde su narrativa en descripciones de objetos y gestos sutiles. Una reconstrucción de la historia completa de Dark Souls para los que siempre quisieron entenderla.",
    author: "miguel-sanchez",
    category: "cultura",
    subcategory: "videojuegos",
    tags: ["dark-souls", "fromsoftware", "lore", "videojuegos"],
    imageId: 190,
    daysAgo: 5,
  },
  {
    title: "El colapso de los videojuegos de 1983: la crisis que casi destruyó la industria",
    slug: "colapso-videojuegos-1983-crisis",
    description:
      "En 1983, la industria del videojuego en EEUU colapsó de 3.200 millones a 100 millones de dólares. Cómo ocurrió, quién sobrevivió y qué cambió para siempre.",
    author: "miguel-sanchez",
    category: "cultura",
    subcategory: "videojuegos",
    tags: ["historia-videojuegos", "atari", "crisis-1983", "industria"],
    imageId: 191,
    daysAgo: 16,
  },

  // CULTURA / LIBROS
  {
    title: "Los 10 ensayos más influyentes del siglo XX que deberías leer",
    slug: "ensayos-mas-influyentes-siglo-xx",
    description:
      "Una selección razonada de los ensayos que más han cambiado la forma en que pensamos sobre política, ciencia, filosofía y sociedad en los últimos cien años.",
    author: "miguel-sanchez",
    category: "cultura",
    subcategory: "libros",
    tags: ["ensayo", "libros", "intelectual", "recomendaciones"],
    imageId: 200,
    daysAgo: 12,
  },
];

// ─── GENERATORS ──────────────────────────────────────────────────────────────

function formatDate(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().replace(/\.\d{3}Z$/, "Z");
}

function generateCategoryFile(cat: (typeof CATEGORIES)[0]): void {
  const subcatsYaml = cat.subcategories
    .map((s) => `  - slug: "${s.slug}"\n    name: "${s.name}"\n    description: "${s.description}"`)
    .join("\n");

  const content = `---
name: "${cat.name}"
slug: "${cat.slug}"
description: "${cat.description}"
subcategories:
${subcatsYaml}
---

${cat.description}
`;
  write(join(ROOT, "categories", `${cat.slug}.md`), content);
}

function generateAuthorFile(author: (typeof AUTHORS)[0]): void {
  const expertise = author.expertise.map((e) => `  - "${e}"`).join("\n");
  const twitterLine = author.twitter ? `\ntwitter: "${author.twitter}"` : "";
  const linkedinLine = author.linkedin ? `\nlinkedin: "${author.linkedin}"` : "";
  const content = `---
name: "${author.name}"
slug: "${author.slug}"
role: "${author.role}"
avatar: "${author.avatar}"
expertise:
${expertise}${twitterLine}${linkedinLine}
---

${author.bio}
`;
  write(join(ROOT, "authors", `${author.slug}.md`), content);
}

function generateArticleFile(art: ArticleDef): void {
  const publishedAt = formatDate(art.daysAgo);
  const updatedAt = formatDate(Math.max(0, art.daysAgo - 1));
  const tags = art.tags.map((t) => `  - "${t}"`).join("\n");
  const imageUrl = `https://picsum.photos/seed/${art.imageId}/1200/675`;
  const featured = art.featured ? "true" : "false";

  const content = `---
title: "${art.title}"
slug: "${art.slug}"
description: "${art.description}"
publishedAt: "${publishedAt}"
updatedAt: "${updatedAt}"
author: "${art.author}"
category: "${art.category}"
subcategory: "${art.subcategory}"
tags:
${tags}
heroImage:
  src: "${imageUrl}"
  alt: "${art.title}"
  credit: "picsum.photos"
  width: 1200
  height: 675
readingTime: 5
featured: ${featured}
breaking: false
---

${art.title}

${LOREM}

## Más sobre este tema

${LOREM}

## Conclusión

${LOREM.split("\n\n")[0]}
`;

  const dir = join(ROOT, "articles", art.category, art.subcategory);
  const today = new Date();
  today.setDate(today.getDate() - art.daysAgo);
  const dateStr = today.toISOString().slice(0, 10);
  write(join(dir, `${dateStr}-${art.slug}.md`), content);
}

function generateSiteFiles(): void {
  write(
    join(ROOT, "site", "about.md"),
    `---\ntitle: "Sobre nosotros"\n---\n\ncrush.news es un medio digital hispanohablante dedicado a la divulgación de tecnología, ciencia, cultura, viajes y estilo de vida.\n`,
  );
  write(
    join(ROOT, "site", "ethics-policy.md"),
    `---\ntitle: "Política Editorial"\n---\n\nEn crush.news nos comprometemos con la precisión, la transparencia y la independencia editorial.\n`,
  );
  write(
    join(ROOT, "site", "corrections-policy.md"),
    `---\ntitle: "Política de Correcciones"\n---\n\nCuando cometemos un error, lo corregimos de forma transparente indicando qué cambió y cuándo.\n`,
  );
  write(
    join(ROOT, "site", "masthead.md"),
    `---\ntitle: "Equipo"\n---\n\nPlaceholder — se actualizará antes del lanzamiento público con el equipo real.\n`,
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

console.log("\n🌱 Generating mock content for crush.news...\n");

console.log("📁 Categories:");
CATEGORIES.forEach(generateCategoryFile);

console.log("\n👤 Authors:");
AUTHORS.forEach(generateAuthorFile);

console.log("\n📄 Articles:");
ARTICLES.forEach(generateArticleFile);

generateSiteFiles();

console.log(`\n✅ Done! Generated:
  - ${CATEGORIES.length} categories
  - ${AUTHORS.length} authors
  - ${ARTICLES.length} articles
  - 4 site pages\n`);

# AGENT.md — Motor de Landing Pages con Astro

## Rol

Eres un motor de generación de landing pages profesionales con **Astro**. No generas páginas ad-hoc: ensamblas páginas a partir de un **sistema de secciones genéricas reutilizables** y **plantillas por industria**. Tu trabajo es recibir datos de una empresa, seleccionar (o recibir) una plantilla, y producir una landing page lista para producción.

---

## Stack Tecnológico

| Capa        | Tecnología                                |
| ----------- | ----------------------------------------- |
| Framework   | Astro (última versión estable)        |
| Estilos     | TailwindCSS v3+                           |
| Iconos      | Lucide Icons (`lucide-react` (o astro-icon))            |
| Animaciones | View Transitions (Astro) + CSS nativo           |
| Despliegue  | Modo SSG nativo de Astro                |
| Fuentes     | Google Fonts (via `<link>` en `app.html`) |

---

## Arquitectura: Motor de Secciones

El motor funciona en 3 capas:

```
┌─────────────────────────────────────┐
│  PLANTILLA (template)               │  ← Define qué secciones usar y en qué orden
│  Ej: "restaurante", "taller"        │
├─────────────────────────────────────┤
│  SECCIONES GENÉRICAS                │  ← Componentes reutilizables sin lógica de negocio
│  Ej: HeroBanner, CardGrid, CTA...  │
├─────────────────────────────────────┤
│  DATOS (empresa.js)                 │  ← Contenido real del cliente
└─────────────────────────────────────┘
```

**Principio clave**: Las secciones NO conocen el negocio. Una `CardGrid` muestra cards — no sabe si son servicios, productos o menú de restaurante. La plantilla decide qué datos van a qué sección.

---

## Estructura del Proyecto

```
landing-[nombre]/
├── src/
│   ├── lib/
│   │   ├── sections/               ← Secciones genéricas del motor
│   │   │   ├── HeroBanner.astro
│   │   │   ├── HeroSplit.astro
│   │   │   ├── CardGrid.astro
│   │   │   ├── FeatureList.astro
│   │   │   ├── TextBlock.astro
│   │   │   ├── Gallery.astro
│   │   │   ├── Testimonials.astro
│   │   │   ├── StatsBar.astro
│   │   │   ├── PricingTable.astro
│   │   │   ├── ContactForm.astro
│   │   │   ├── MapSection.astro
│   │   │   ├── FAQ.astro
│   │   │   ├── LogoBanner.astro
│   │   │   └── CtaBanner.astro
│   │   ├── layout/                 ← Estructura global
│   │   │   ├── Navbar.astro
│   │   │   ├── Footer.astro
│   │   │   ├── WhatsAppButton.astro
│   │   │   └── ScrollToTop.astro
│   │   ├── data/
│   │   │   └── empresa.js
│   │   └── utils/
│   │       └── seo.js
│   ├── pages/
│   │   ├── Layout.astro
│   │   └── index.astro            ← Ensambla secciones según plantilla
│   └── app.html
├── static/
│   └── images/
├── astro.config.mjs
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## Catálogo de Secciones Genéricas

Cada sección recibe props genéricos. Nunca hardcodea texto ni asume contexto.

### 1. HeroBanner

Hero de ancho completo con contenido centrado.

```astro
<!-- Props -->
{
  titulo: string,
  subtitulo: string,
  cta: { texto: string, enlace: string },
  ctaSecundario?: { texto: string, enlace: string },
  imagen?: string,
  estilo: "centrado" | "gradiente" | "imagen-fondo"
}
```

**Restricciones de diseño:**

- El contenedor de contenido dentro del hero: `max-w-4xl mx-auto`
- El título h1: `max-w-3xl mx-auto`
- El subtítulo: `max-w-2xl mx-auto`
- Altura: `min-h-[85vh]` en desktop, `min-h-[70vh]` en móvil
- Padding vertical interno: `py-20 md:py-32`
- El hero NUNCA ocupa `h-screen` completo — siempre deja pista visual del contenido siguiente

### 2. HeroSplit

Hero dividido en 2 columnas (texto + imagen/visual).

```astro
{
  titulo: string,
  subtitulo: string,
  cta: { texto: string, enlace: string },
  imagen?: string,
  invertir: boolean         // imagen izquierda o derecha
}
```

**Restricciones de diseño:**

- Grid: `grid-cols-1 lg:grid-cols-2 gap-12`
- Contenedor: `max-w-7xl mx-auto`
- En móvil se apila: imagen arriba, texto abajo
- Columna de texto: `max-w-xl`

### 3. CardGrid

Grilla de tarjetas. Sirve para servicios, productos, menú, equipo, lo que sea.

```astro
{
  titulo: string,
  subtitulo?: string,
  items: [
    {
      titulo: string,
      descripcion: string,
      icono?: string,          // Nombre Lucide
      imagen?: string,
      precio?: string,
      etiqueta?: string,       // "Popular", "Nuevo", etc.
      enlace?: { texto: string, url: string }
    }
  ],
  columnas: 2 | 3 | 4,        // Default: 3
  estilo: "simple" | "con-imagen" | "horizontal" | "destacada"
}
```

**Restricciones de diseño:**

- Contenedor: `max-w-7xl mx-auto`
- 1 columna en móvil, `columnas` en desktop
- Cards: padding `p-6`, gap `gap-6 md:gap-8`
- Imágenes en cards: `aspect-video object-cover rounded-lg`
- Si `estilo = "destacada"`: primer item ocupa 2 columnas en desktop

### 4. FeatureList

Lista de características con icono + texto, ideal para "por qué elegirnos".

```astro
{
  titulo: string,
  subtitulo?: string,
  items: [
    {
      titulo: string,
      descripcion: string,
      icono: string
    }
  ],
  layout: "grid" | "lista" | "alternado"
}
```

**Restricciones:**

- Layout `grid`: 2 columnas md, 1 móvil. Max `max-w-5xl`.
- Layout `lista`: items apilados, `max-w-3xl mx-auto`.
- Layout `alternado`: icono-texto alterna izquierda/derecha.

### 5. TextBlock

Bloque de texto libre. Para "sobre nosotros", historia, filosofía, lo que sea.

```astro
{
  titulo: string,
  contenido: string,          // Texto largo, puede incluir párrafos
  imagen?: string,
  layout: "centrado" | "texto-imagen" | "imagen-texto"
}
```

**Restricciones:**

- Texto: `max-w-3xl mx-auto` en centrado, `max-w-none` en layouts con imagen.
- Párrafos: `text-lg leading-relaxed text-gray-600`
- La imagen en layout split: `rounded-xl shadow-lg`
- El contenido centrado: `text-center`

### 6. Gallery

Galería de imágenes o portafolio.

```astro
{
  titulo?: string,
  items: [
    { imagen: string, alt: string, caption?: string }
  ],
  columnas: 2 | 3 | 4,
  estilo: "grid" | "masonry"
}
```

**Restricciones:**

- Contenedor: `max-w-7xl`
- Imágenes: `rounded-lg overflow-hidden`
- Gap: `gap-4`
- Si no hay imágenes reales, NO generes esta sección. Nunca placeholders de galería.

### 7. Testimonials

Carrusel o grid de testimonios.

```astro
{
  titulo?: string,
  items: [
    {
      nombre: string,
      cargo?: string,
      texto: string,
      avatar?: string,
      estrellas?: number
    }
  ],
  layout: "carrusel" | "grid" | "destacado"
}
```

**Restricciones:**

- Layout `destacado`: 1 testimonio grande + los demás pequeños.
- Layout `grid`: max 3 columnas, `max-w-6xl`.
- Texto del testimonio: itálicas, con comillas decorativas CSS.
- Estrellas: iconos `Star` de Lucide, fill amarillo.

### 8. StatsBar

Barra de estadísticas/cifras impactantes.

```astro
{
  items: [
    { valor: string, label: string, icono?: string }
  ],
  fondo: "primario" | "oscuro" | "claro"
}
```

**Restricciones:**

- Siempre ancho completo con fondo contrastante.
- Flex horizontal: `flex justify-around items-center`
- Contenido: `max-w-6xl mx-auto`
- Valores: `text-4xl md:text-5xl font-bold`
- En móvil: grid de 2 columnas si hay 4+ items.

### 9. PricingTable

Tabla de precios / planes.

```astro
{
  titulo: string,
  subtitulo?: string,
  items: [
    {
      nombre: string,
      precio: string,
      periodo?: string,        // "/mes", "/hora", etc.
      descripcion?: string,
      caracteristicas: string[],
      destacado: boolean,
      cta: { texto: string, enlace: string }
    }
  ]
}
```

**Restricciones:**

- Max 4 items en fila, `max-w-6xl`.
- Item `destacado`: escala `scale-105`, borde primario, badge "Popular".
- En móvil: scroll horizontal o apilado.

### 10. ContactForm

Formulario de contacto + información.

```astro
{
  titulo?: string,
  campos: string[],            // ["nombre", "email", "telefono", "mensaje"]
  info: {
    telefono?: string,
    email?: string,
    whatsapp?: string,
    direccion?: string,
    horario?: string
  },
  layout: "split" | "centrado"
}
```

**Restricciones:**

- Layout `split`: grid 2 cols (formulario + info), `max-w-6xl`.
- Layout `centrado`: formulario solo, `max-w-2xl mx-auto`.
- Formulario decorativo solamente. Incluir comentario HTML `<!-- TODO: Conectar backend -->`.
- Agregar link alternativo: "O escríbenos directo por WhatsApp".

### 11. MapSection

Mapa de Google embebido.

```astro
{
  titulo?: string,
  embedUrl: string,
  altura: "sm" | "md" | "lg"   // 300px | 400px | 500px
}
```

**Restricciones:**

- Ancho completo o `max-w-7xl` con bordes redondeados.
- `loading="lazy"` obligatorio en el iframe.

### 12. FAQ

Preguntas frecuentes con acordeón.

```astro
{
  titulo: string,
  items: [
    { pregunta: string, respuesta: string }
  ]
}
```

**Restricciones:**

- Contenedor: `max-w-3xl mx-auto`
- Acordeón con transiciones `slide` de Astro.
- Un solo item abierto a la vez.

### 13. CtaBanner

Banner de llamada a la acción intermedio o final.

```astro
{
  titulo: string,
  subtitulo?: string,
  cta: { texto: string, enlace: string },
  fondo: "primario" | "gradiente" | "oscuro"
}
```

**Restricciones:**

- Ancho completo, texto centrado.
- Contenido: `max-w-3xl mx-auto`
- Padding: `py-16 md:py-24`
- Botón CTA grande: `px-8 py-4 text-lg`

### 14. LogoBanner

Fila de logos de clientes / aliados / marcas.

```astro
{
  titulo?: string,
  logos: [{ imagen: string, alt: string }],
  estilo: "estatico" | "scroll-infinito"
}
```

---

## Sistema de Plantillas

Una plantilla define: qué secciones usar, en qué orden, con qué configuración visual, y cómo mapear los datos de `empresa.js` a cada sección.

### Formato de Plantilla

```javascript
const plantilla = {
  nombre: "restaurante",
  descripcion: "Landing para restaurantes, cafés y bares",
  estilo: "moderno",
  secciones: [
    {
      seccion: "HeroBanner",
      props: {
        estilo: "imagen-fondo",
      },
      mapeo: {
        titulo: "nombre",
        subtitulo: "slogan",
        cta: "cta",
      },
    },
    {
      seccion: "CardGrid",
      props: {
        columnas: 3,
        estilo: "con-imagen",
      },
      mapeo: {
        titulo: "'Nuestro Menú'",
        items: "productos",
      },
      condicion: "productos.length > 0",
    },
  ],
};
```

### Plantillas Incluidas

---

#### `taller-automotriz`

Ideal para talleres mecánicos, autolavados, servicios automotrices.

```
Secciones:
1. HeroBanner        → estilo: "gradiente", tono oscuro/industrial
2. StatsBar          → "Años de experiencia", "Clientes atendidos", "Servicios"
3. CardGrid          → Servicios con iconos (columnas: 3, estilo: "simple")
4. FeatureList       → "¿Por qué elegirnos?" (layout: "grid")
5. Testimonials      → layout: "grid"
6. ContactForm       → layout: "split" con mapa
7. CtaBanner         → "Agenda tu cita hoy"

Colores sugeridos: Gris oscuro (#1a1a2e), Rojo (#e63946), Naranja acento
Iconos clave: wrench, car, gauge, shield-check, clock, star
```

---

#### `restaurante`

Para restaurantes, cafés, panaderías, food trucks.

```
Secciones:
1. HeroBanner        → estilo: "imagen-fondo", con overlay oscuro
2. TextBlock         → Historia / "Sobre nosotros" (layout: "texto-imagen")
3. CardGrid          → Menú / Platos (columnas: 3, estilo: "con-imagen")
4. Gallery           → Fotos del local (columnas: 3)
5. Testimonials      → layout: "destacado"
6. StatsBar          → "Platos servidos", "Años", "Estrellas Google"
7. ContactForm       → layout: "split" con horario + mapa
8. CtaBanner         → "Reserva tu mesa"

Colores sugeridos: Dorado (#d4a574), Marrón oscuro (#3d2c2e), Crema fondo
Iconos clave: utensils, coffee, wine, clock, map-pin, phone
```

---

#### `consultorio-medico`

Para médicos, odontólogos, psicólogos, clínicas.

```
Secciones:
1. HeroBanner        → estilo: "centrado", tono limpio/confiable
2. FeatureList       → Especialidades (layout: "grid")
3. TextBlock         → Sobre el doctor/clínica (layout: "imagen-texto")
4. CardGrid          → Servicios (columnas: 3, estilo: "simple")
5. StatsBar          → "Pacientes", "Años de experiencia", "Especialidades"
6. Testimonials      → layout: "grid"
7. FAQ               → Preguntas frecuentes del consultorio
8. ContactForm       → layout: "split"
9. MapSection        → Ubicación

Colores sugeridos: Azul (#0077b6), Verde suave (#06d6a0), Blanco fondo
Iconos clave: stethoscope, heart-pulse, shield-check, calendar, clock
```

---

#### `tienda-retail`

Para tiendas, ferreterías, boutiques, distribuidoras.

```
Secciones:
1. HeroBanner        → estilo: "centrado" o "gradiente"
2. CardGrid          → Productos destacados (columnas: 4, estilo: "con-imagen")
3. FeatureList       → Ventajas de comprar (envío, garantía, etc.)
4. PricingTable      → Si manejan planes o paquetes
5. LogoBanner        → Marcas que venden
6. Testimonials      → layout: "grid"
7. CtaBanner         → "Visítanos" o "Compra por WhatsApp"
8. ContactForm       → layout: "split"

Colores sugeridos: Según marca del cliente
Iconos clave: shopping-bag, truck, shield, tag, star, package
```

---

#### `freelancer-profesional`

Para profesionales independientes, consultores, abogados, contadores.

```
Secciones:
1. HeroSplit         → Foto profesional + intro (invertir: false)
2. StatsBar          → "Años", "Clientes", "Proyectos"
3. CardGrid          → Servicios (columnas: 3, estilo: "simple")
4. TextBlock         → Trayectoria / CV resumido (layout: "centrado")
5. Testimonials      → layout: "destacado"
6. FAQ               → Preguntas sobre el servicio
7. CtaBanner         → "Agenda una consulta gratuita"
8. ContactForm       → layout: "centrado"

Colores sugeridos: Azul oscuro (#1e3a5f), Gris elegante, Dorado acento
Iconos clave: briefcase, award, users, file-text, phone, mail
```

---

#### `evento`

Para eventos únicos, conferencias, lanzamientos, bodas.

```
Secciones:
1. HeroBanner        → estilo: "imagen-fondo", con countdown si hay fecha
2. TextBlock         → Descripción del evento (layout: "centrado")
3. CardGrid          → Ponentes / Agenda (columnas: 3)
4. PricingTable      → Entradas / Paquetes
5. FAQ               → Logística, estacionamiento, dress code
6. StatsBar          → "Ediciones anteriores", "Asistentes", "Ponentes"
7. CtaBanner         → "Reserva tu lugar"
8. ContactForm       → layout: "centrado"

Colores sugeridos: Según temática del evento
Iconos clave: calendar, map-pin, ticket, users, clock, star
```

---

#### `inmobiliaria`

Para inmobiliarias, bienes raíces, alquileres.

```
Secciones:
1. HeroBanner        → estilo: "imagen-fondo", propiedad destacada
2. CardGrid          → Propiedades (columnas: 3, estilo: "con-imagen")
3. StatsBar          → "Propiedades", "Clientes satisfechos", "Años"
4. FeatureList       → "¿Por qué trabajar con nosotros?"
5. Testimonials      → layout: "grid"
6. TextBlock         → Sobre la empresa (layout: "texto-imagen")
7. ContactForm       → layout: "split" con mapa
8. CtaBanner         → "Encuentra tu hogar ideal"

Colores sugeridos: Azul confianza (#1a56db), Verde (#059669), Blanco
Iconos clave: home, key, map-pin, building, shield-check, phone
```

---

#### `educacion`

Para academias, cursos, tutores, colegios, talleres formativos.

```
Secciones:
1. HeroBanner        → estilo: "centrado", tono amigable
2. CardGrid          → Cursos / Programas (columnas: 3, estilo: "con-imagen")
3. FeatureList       → Metodología / Ventajas (layout: "alternado")
4. StatsBar          → "Egresados", "Cursos", "Años enseñando"
5. Testimonials      → layout: "grid"
6. PricingTable      → Planes / Inscripciones
7. FAQ               → Modalidad, certificados, horarios
8. ContactForm       → layout: "split"
9. CtaBanner         → "Inscríbete ahora"

Colores sugeridos: Azul (#3b82f6), Amarillo (#fbbf24), Blanco
Iconos clave: book-open, graduation-cap, users, award, calendar, laptop
```

---

#### `generico`

Plantilla base cuando no hay una industria específica. El agente elige las mejores secciones según los datos disponibles.

```
Secciones (todas condicionales):
1. HeroBanner        → Siempre
2. TextBlock          → Si hay "sobreNosotros"
3. CardGrid          → Si hay servicios O productos
4. FeatureList       → Si hay valores o ventajas
5. StatsBar          → Si hay cifras
6. Testimonials      → Si hay testimonios
7. FAQ               → Si hay preguntas
8. ContactForm       → Si hay datos de contacto
9. CtaBanner         → Siempre (con CTA principal)

Colores sugeridos: Azul (#2563eb) + Gris
```

---

## Selección Automática de Plantilla

Si el usuario **no especifica** una plantilla, el agente debe inferirla:

1. Busca palabras clave en el nombre o descripción del negocio.
2. Si no hay match claro, usa `generico`.
3. Siempre informa al usuario qué plantilla seleccionó y por qué.

| Palabras clave                                          | Plantilla                |
| ------------------------------------------------------- | ------------------------ |
| taller, mecánico, auto, autolavado, repuestos           | `taller-automotriz`      |
| restaurante, café, panadería, comida, menú, chef        | `restaurante`            |
| doctor, clínica, odontólogo, médico, salud, consultorio | `consultorio-medico`     |
| tienda, ferretería, boutique, distribuidora, venta      | `tienda-retail`          |
| abogado, contador, consultor, freelance, diseñador      | `freelancer-profesional` |
| evento, conferencia, boda, fiesta, lanzamiento          | `evento`                 |
| inmobiliaria, bienes raíces, alquiler, apartamento      | `inmobiliaria`           |
| academia, curso, colegio, instituto, clase, tutor       | `educacion`              |

---

## Datos de Entrada (empresa.js)

Esquema completo del objeto de datos. El agente mapea la información del usuario a esta estructura.

```javascript
export const empresa = {
  // ── Identidad ──
  nombre: "",
  slogan: "",
  descripcion: "",
  logo: "/images/logo.png",

  // ── Sobre Nosotros ──
  sobreNosotros: {
    titulo: "",
    texto: "",
    imagen: "",
    valores: [],
    anioFundacion: null,
    mision: "",
    vision: "",
  },

  // ── Items Principales (servicios, productos, menú, cursos, etc.) ──
  servicios: [
    {
      nombre: "",
      descripcion: "",
      icono: "",
      imagen: "",
    },
  ],

  productos: [
    {
      nombre: "",
      descripcion: "",
      precio: null,
      imagen: "",
      caracteristicas: [],
      destacado: false,
      etiqueta: "",
    },
  ],

  // ── Cifras ──
  estadisticas: [{ valor: "", label: "", icono: "" }],

  // ── Testimonios ──
  testimonios: [
    {
      nombre: "",
      cargo: "",
      texto: "",
      avatar: "",
      estrellas: 5,
    },
  ],

  // ── FAQ ──
  preguntas: [{ pregunta: "", respuesta: "" }],

  // ── Precios / Planes ──
  planes: [
    {
      nombre: "",
      precio: "",
      periodo: "",
      descripcion: "",
      caracteristicas: [],
      destacado: false,
      cta: { texto: "", enlace: "" },
    },
  ],

  // ── Contacto ──
  contacto: {
    telefono: "",
    whatsapp: "",
    email: "",
    direccion: "",
    ciudad: "",
    pais: "",
    horario: "",
    googleMapsEmbed: "",
  },

  // ── Redes Sociales ──
  redesSociales: {
    instagram: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    youtube: "",
    tiktok: "",
  },

  // ── Galería ──
  galeria: [{ imagen: "", alt: "", caption: "" }],

  // ── Logos de Aliados/Clientes ──
  aliados: [{ imagen: "", alt: "" }],

  // ── Configuración Visual ──
  tema: {
    colorPrimario: "#2563eb",
    colorSecundario: "#1e40af",
    colorAcento: "#f59e0b",
    colorFondo: "#ffffff",
    colorTexto: "#1f2937",
    fuenteTitulos: "Inter",
    fuenteCuerpo: "Inter",
    borderRadius: "0.5rem",
    estilo: "moderno",
  },

  // ── SEO ──
  seo: {
    titulo: "",
    descripcion: "",
    palabrasClave: [],
    ogImage: "/og-image.png",
    urlCanonica: "",
  },

  // ── Call to Action Principal ──
  cta: {
    texto: "Contáctanos",
    enlace: "#contacto",
    tipo: "whatsapp",
  },
};
```

---

## Restricciones Globales de Diseño

### Anchos Máximos (OBLIGATORIO)

```
REGLA: Ningún contenido de texto supera max-w-4xl.
REGLA: Ningún contenedor de sección supera max-w-7xl.

Jerarquía de anchos:
─────────────────────────────────────────────────
  Elemento                    │  Ancho máximo
─────────────────────────────────────────────────
  Contenedor de sección       │  max-w-7xl mx-auto
  Títulos h1 (Hero)           │  max-w-3xl mx-auto
  Títulos h2 (Secciones)      │  max-w-2xl mx-auto
  Subtítulos / descripciones  │  max-w-2xl mx-auto
  Párrafos de texto largo     │  max-w-3xl mx-auto
  Grid de cards               │  max-w-7xl mx-auto
  Formularios solos           │  max-w-2xl mx-auto
  FAQ                         │  max-w-3xl mx-auto
  Stats bar contenido         │  max-w-6xl mx-auto
  CTA banner contenido        │  max-w-3xl mx-auto
─────────────────────────────────────────────────
```

### Espaciado entre Secciones

```
Cada sección: py-16 md:py-24
Padding horizontal global: px-4 sm:px-6 lg:px-8
Gap entre título de sección y contenido: mb-12 md:mb-16
```

### Tipografía

```
h1 (Hero):      text-4xl md:text-5xl lg:text-6xl font-bold leading-tight
h2 (Sección):   text-3xl md:text-4xl font-bold
h3 (Cards):     text-xl font-semibold
Cuerpo:         text-base md:text-lg leading-relaxed
Caption/small:  text-sm text-gray-500
```

### Navbar

```
- Position: fixed top-0 w-full z-50
- Altura: h-16 md:h-20
- Transición: transparente → fondo sólido con backdrop-blur al scroll
- Logo: h-8 md:h-10 max-w-[160px]
- Contenido: max-w-7xl mx-auto
- Móvil: menú hamburguesa con panel slide desde la derecha
- El body debe tener padding-top igual a la altura del navbar
```

### Imágenes

```
- NUNCA usar URLs externas (Unsplash, Pexels, etc.)
- Placeholder: div con gradiente del color primario + icono Lucide centrado en blanco/semitransparente
- Todas las imágenes debajo del fold: loading="lazy"
- Aspecto en cards: aspect-video
- Aspecto en hero: aspect-auto o cover
- Siempre alt descriptivo
```

### Botones

```
Primario:   bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors
Secundario: border-2 border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white
Ghost:      text-primary hover:underline
Grande:     px-8 py-4 text-lg (para CTA banners)
```

### WhatsApp Button

```
- Posición: fixed bottom-6 right-6 z-40
- Tamaño: w-14 h-14 rounded-full
- Color: bg-[#25d366]
- Sombra: shadow-lg
- Animación: pulse cada 3 segundos (sutil)
- Solo visible si contacto.whatsapp existe
- Link: https://wa.me/{numero}?text={mensaje_codificado}
```

### Animaciones

```
- Usar IntersectionObserver para revelar secciones al scroll
- Transiciones: fade + slide-up de 20px
- Duración: 500ms, easing: ease-out
- Respetar prefers-reduced-motion: reducir a opacity-only
- NO animar el navbar ni el WhatsApp button al scroll
- Delay escalonado en grids de cards: cada card +100ms
```

### Colores y Accesibilidad

```
- Contraste mínimo texto/fondo: 4.5:1 (WCAG AA)
- Contraste mínimo texto grande/fondo: 3:1
- Focus ring: ring-2 ring-primary ring-offset-2 en todos los interactivos
- Skip link como primer elemento del body
- aria-label en todos los botones solo con icono
```

---

## Estilos Visuales

### Moderno (default)

- Gradientes sutiles en Hero y CTA
- Sombras: `shadow-md` en cards, `shadow-lg` en hover
- Bordes: redondeados `rounded-xl`
- Transiciones suaves en hover

### Minimalista

- Sin sombras. Bordes finos: `border border-gray-200`
- Mucho whitespace: secciones con `py-24 md:py-32`
- 2 colores máximo + neutros
- Tipografía protagonista

### Corporativo

- Líneas divisorias entre secciones: `border-t`
- Colores sobrios (azules, grises)
- Badges y certificaciones
- Layout simétrico y formal

### Creativo

- Clip-path en fondos de secciones
- Colores vibrantes, gradientes múltiples
- Cards con bordes de colores variados
- Micro-interacciones: rotación sutil, scale en hover

---

## SEO Obligatorio

En `Layout.astro` incluir dentro del tag `<head>`:

1. `<title>` con nombre de empresa + keywords
2. `<meta name="description">` (max 160 chars)
3. Open Graph: `og:title`, `og:description`, `og:image`, `og:url`
4. Twitter Card: `twitter:card`, `twitter:title`, `twitter:description`
5. Schema.org `LocalBusiness` JSON-LD con datos reales
6. `<link rel="canonical">` si se provee URL
7. Etiquetas semánticas: `header`, `main`, `section`, `footer`, `nav`
8. Un solo `<h1>` en toda la página (en el Hero)

---

## Proceso de Generación

1. **Recibir datos** del usuario.
2. **Normalizar** al esquema `empresa.js`.
3. **Seleccionar plantilla**: la que indique el usuario o inferirla automáticamente.
4. **Filtrar secciones**: eliminar las que no tienen datos suficientes.
5. **Scaffolding**: crear proyecto Astro con toda la config.
6. **Generar secciones**: crear solo los `.astro` necesarios con datos reales.
7. **Ensamblar** `index.astro` importando las secciones en el orden de la plantilla.
8. **Generar SEO**: meta tags + JSON-LD.
9. **Validar**: sin placeholders, sin secciones vacías, sin errores.
10. **Entregar** con instrucciones: `npm install && npm run dev`.

---

## Restricciones Absolutas

1. **Nunca inventes contenido**. Si no hay datos para una sección, no la generes. Cero "Lorem ipsum", cero textos genéricos tipo "Somos una empresa líder...".
2. **Nunca uses imágenes externas**. Placeholders con gradientes + iconos Lucide.
3. **Formularios decorativos**. Sin backend. Comentario `<!-- TODO: Conectar backend -->`.
4. **Español por defecto**. Labels, botones, placeholders en español salvo que se indique otro idioma.
5. **JavaScript plano**. Sin TypeScript.
6. **Single-page**. Todo en `index.astro`. Sin rutas adicionales.
7. **Anchos máximos respetados**. Nunca texto a ancho completo sin `max-w-*`.
8. **Un solo h1**. En el Hero. Las secciones usan h2.
9. **Sin dependencias innecesarias**. Solo Astro + Tailwind + Lucide. Nada más.
10. **Código limpio**. Componentes enfocados, sin lógica duplicada, props bien tipados.

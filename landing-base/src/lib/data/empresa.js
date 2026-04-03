export const empresa = {
  // ── Identidad ──
  nombre: "Proyecto Base",
  slogan: "Tu empresa, tu éxito",
  descripcion: "Descripción genérica para la plantilla base de Astro.",
  logo: "/images/logo.png",

  // ── Sobre Nosotros ──
  sobreNosotros: {
    titulo: "Sobre Nosotros",
    texto: "Somos una empresa comprometida con la excelencia...",
    imagen: "",
    valores: [],
    anioFundacion: null,
    mision: "",
    vision: "",
  },

  // ── Items Principales (servicios, productos, menú, cursos, etc.) ──
  servicios: [
    {
      nombre: "Servicio 1",
      descripcion: "Descripción del servicio 1",
      icono: "star",
      imagen: "",
    },
  ],

  productos: [],

  // ── Cifras ──
  estadisticas: [{ valor: "10+", label: "Años de experiencia", icono: "calendar" }],

  // ── Testimonios ──
  testimonios: [
    {
      nombre: "María García",
      cargo: "Directora de Ventas",
      texto: "Desde que empezamos a trabajar con ellos, nuestros resultados mejoraron un 200%. Increíble el servicio y la atención.",
      avatar: "",
      estrellas: 5,
    },
    {
      nombre: "Juan Pérez",
      cargo: "CEO en TechStart",
      texto: "La implementación fue rapidísima. Destaco especialmente el profesionalismo del equipo de soporte.",
      avatar: "",
      estrellas: 4,
    }
  ],

  // ── FAQ ──
  preguntas: [
    { pregunta: "¿Cómo funciona el servicio?", respuesta: "Es muy sencillo, te contactás, armamos un plan y arrancamos en menos de 48 hs." },
    { pregunta: "¿Tienen soporte técnico incluido?", respuesta: "Sí, todos nuestros planes vienen con soporte técnico garantizado por nuestro equipo de expertos." },
    { pregunta: "¿Puedo cancelar en cualquier momento?", respuesta: "¡Por supuesto! No hay ataduras ni contratos a largo plazo. Sos dueño." }
  ],

  // ── Precios / Planes ──
  planes: [
    {
      nombre: "Básico",
      precio: "$99",
      periodo: "mes",
      descripcion: "Ideal para empezar.",
      caracteristicas: ["1 Proyecto", "Soporte email", "Updates básicos"],
      destacado: false,
      cta: { texto: "Elegir Básico", enlace: "#" },
    },
    {
      nombre: "Profesional",
      precio: "$199",
      periodo: "mes",
      descripcion: "El más elegido.",
      caracteristicas: ["5 Proyectos", "Soporte prioritario", "Updates automáticos", "Reportes mensuales"],
      destacado: true,
      cta: { texto: "Empezar Ahora", enlace: "#" },
    }
  ],

  // ── Contacto ──
  contacto: {
    telefono: "+1 234 567 890",
    whatsapp: "+1 234 567 890",
    email: "contacto@empresa.com",
    direccion: "Av. Principal 123",
    ciudad: "Ciudad",
    pais: "País",
    horario: "Lun - Vie, 9am - 6pm",
    googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113429.62568609555!2d-58.4287869!3d-34.6156942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccab5ba00874b%3A0x88ec8513511eb0c8!2sBuenos%20Aires!5e0!3m2!1sen!2sar!4v1714400000000!5e0!3m2!1sen!2sar",
  },

  // ── Redes Sociales ──
  redesSociales: {
    instagram: "https://instagram.com",
    facebook: "",
    twitter: "https://twitter.com",
    linkedin: "",
    youtube: "",
    tiktok: "",
  },

  // ── Galería ──
  galeria: [
    { imagen: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800", alt: "Oficina", caption: "Nuestras instalaciones" },
    { imagen: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=800", alt: "Equipo", caption: "Trabajo en equipo" },
    { imagen: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800", alt: "Reunión", caption: "Colaboración constante" },
    { imagen: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800", alt: "Planning", caption: "Planeamiento estratégico" }
  ],

  // ── Logos de Aliados/Clientes ──
  aliados: [
    { imagen: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", alt: "Amazon" },
    { imagen: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", alt: "Google" },
    { imagen: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", alt: "Microsoft" },
    { imagen: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", alt: "Netflix" }
  ],

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
    titulo: "Proyecto Base | Astro + Tailwind",
    descripcion: "Página de inicio del proyecto base",
    palabrasClave: ["landing", "astro", "base"],
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

# 🏗️ Landing Base Engine

> **Architectural Minimalism & Precision Fluidity**

A high-performance, developer-centric landing page engine built with **Astro** and **Tailwind CSS 4**. Designed for speed, scalability, and aesthetic excellence.

---

## ✨ Key Features

- 🚀 **Astro Power**: Lightning-fast static site generation with partial hydration.
- 🎨 **Tailwind CSS 4**: Leveraging the latest in CSS-in-JS evolution and performance.
- 💎 **Precision Fluidity**: A proprietary design philosophy focused on surface hierarchy and ambient shadows.
- 📦 **Modular Sections**: Over 15+ pre-built, accessible, and responsive sections.
- 🌍 **SEO Ready**: Automatic metadata management and semantic HTML structure.
- 🧩 **Single Point of Truth**: Manage all content from a centralized `empresa.js` configuration.

---

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/) (v6.x)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4.x)
- **Icons**: [Lucide Icons](https://lucide.dev/) (via `@iconify-json/lucide`)
- **Language**: TypeScript / JavaScript (ESM)

---

## 📂 Project Structure

```bash
src/
├── lib/
│   ├── data/       # Centralized business data (empresa.js)
│   ├── layout/     # Core components (Navbar, Footer, Buttons)
│   ├── sections/   # Reusable landing page sections
│   └── utils/      # SEO and helper functions
├── pages/          # Astro routes and main Layout
└── styles/         # Global CSS and Tailwind directives
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v22.12.0` or higher (Check `package.json` engines)
- **npm**: Standard installation

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:4321`.

### Production Build

```bash
npm run build
npm run preview
```

---

## ⚙️ Configuration

All the content of the landing page is managed in:
`file:///src/lib/data/empresa.js`

Simply update the `empresa` object with your branding, services, testimonials, and contact info. The sections will automatically reflect these changes.

### Available Sections

| Section | Component | Purpose |
| :--- | :--- | :--- |
| **Hero** | `HeroBanner.astro` | Main landing entry with CTAs |
| **Logos** | `LogoBanner.astro` | Partners and social proof |
| **Stats** | `StatsBar.astro` | Key performance indicators |
| **Services** | `CardGrid.astro` | Detailed service offerings |
| **FAQ** | `FAQ.astro` | Frequently asked questions |
| **Contact** | `ContactForm.astro` | Lead generation form |

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

Built with ❤️ and architectural precision.

---

> [!TIP]
> To maintain the **Precision Fluidity** aesthetic, avoid adding `1px` solid borders. Use subtle shadows and background surface contrasts instead.

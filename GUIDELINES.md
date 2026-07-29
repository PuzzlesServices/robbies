# 📘 Directrices y Convenciones de Desarrollo | Robbies

Bienvenido al proyecto **Robbies** (Puzzles Services). Este documento establece las directrices de arquitectura, diseño, calidad de código y flujo de trabajo para mantener un código limpio, escalable y seguro.

---

## 🛠️ 1. Stack Tecnológico

- **Framework Core**: [Astro 5](https://astro.build) (Renderizado ultra-rápido, arquitectura de islas).
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com) + Vanilla CSS para variables globales.
- **Gestor de Paquetes**: `pnpm` (Estricto, eficiente en espacio y seguro).
- **Lenguaje**: TypeScript (`strict` mode activado en `tsconfig.json`).
- **Iconografía**: `@lucide/astro` (Iconos optimizados en SVG).
- **Despliegue**: Vercel (Integración continua mediante Git).

---

## 📁 2. Estructura de Directorios

El código fuente habita en el directorio `src/` bajo la siguiente jerarquía organizada:

```text
Robbies/
├── public/                # Archivos estáticos (favicons, imágenes públicas, robots.txt)
├── src/
│   ├── assets/            # Imágenes, vectores y recursos procesados por Astro
│   ├── components/        # Componentes UI reutilizables (.astro, .tsx, etc.)
│   │   ├── common/        # Botones, tarjetas, badges, modales genéricos
│   │   ├── layout/        # Navbar, Footer, Sidebar
│   │   └── features/      # Componentes específicos de un módulo/sección
│   ├── content/           # Colecciones de contenido (Markdown / MDX)
│   ├── layouts/           # Plantillas base de página (Layout.astro)
│   ├── pages/             # Enrutamiento basado en archivos (index.astro, etc.)
│   ├── styles/            # Estilos globales (global.css)
│   └── utils/             # Funciones helper, formateadores y clientes API
├── astro.config.mjs       # Configuración de Astro & plugins de Vite
├── package.json           # Declaración de dependencias del proyecto
├── pnpm-lock.yaml         # Lockfile oficial de pnpm
└── GUIDELINES.md          # Guía de directrices del proyecto (este archivo)
```

---

## ⚡ 3. Gestión de Paquetes con pnpm

> **Importante**: Utilizar exclusivamente `pnpm` para asegurar la coherencia del árbol de dependencias.

- **Instalar dependencias**: `pnpm install`
- **Agregar librería**: `pnpm add <nombre-paquete>`
- **Agregar dependencia de dev**: `pnpm add -D <nombre-paquete>`
- **Servidor de desarrollo**: `pnpm dev`
- **Compilar para producción**: `pnpm build`
- **Previsualizar build**: `pnpm preview`

---

## 🎨 4. Estándares de Diseño y UI/UX

1. **Estética Premium y Moderna**:
   - Preferir paletas armoniosas (tonos slate/zinc para modo oscuro con acentos de color indigo, violet y cyan).
   - Uso de bordes sutiles con transparencia (`border-slate-800/80`), efectos de cristal/glassmorphism (`backdrop-blur-md`).
   - Sombra y brillo suave (`shadow-lg shadow-indigo-500/10`).

2. **Tipografía**:
   - Titulares destacados: Fuente `Outfit` (`font-outfit`).
   - Texto de cuerpo e interfaz: Fuente `Inter` (`font-sans`).

3. **Responsividad (Mobile-First)**:
   - Diseñar y validar siempre los puntos de interrupción estándar de Tailwind (`sm:`, `md:`, `lg:`, `xl:`).

4. **Accesibilidad (a11y)**:
   - Mantener contraste adecuado de texto sobre fondo.
   - Incluir texto alternativo (`alt`) en imágenes e identificadores descriptivos (`aria-label`) en botones de solo icono.

---

## 💻 5. Reglas de Código (Astro & TypeScript)

1. **Tipado Estricto**:
   - Definir interfaces TypeScript para todas las props de componentes Astro:
     ```astro
     ---
     interface Props {
       title: string;
       subtitle?: string;
     }
     const { title, subtitle } = Astro.props;
     ---
     ```
2. **Reusabilidad de Componentes**:
   - Mantener los componentes enfocados en una sola responsabilidad.
   - Evitar duplicación de clases de estilos mediante componentes comunes o utilidades (`clsx` / `tailwind-merge`).

3. **SEO y Metadatos**:
   - Toda página debe utilizar `Layout.astro` y especificar títulos y descripciones SEO descriptivas.

---

## 🔄 6. Flujo de Trabajo en Git y Despliegue en Vercel

### Convención de Commits (Conventional Commits)
Al realizar commits en el repositorio, utilizar prefijos claros:
- `feat:` Nuevas funcionalidades o páginas.
- `fix:` Corrección de errores o bugs.
- `style:` Cambios visuales o ajustes de diseño CSS/Tailwind.
- `docs:` Cambios en documentación (`README.md`, `GUIDELINES.md`).
- `refactor:` Mejoras en estructura de código sin cambiar comportamiento.

### Despliegues en Vercel
- La rama `main` está conectada al despliegue en producción de Vercel.
- Cada `git push origin main` desencadenará un build automático en la cuenta `alvaro@puzzels.consulting`.

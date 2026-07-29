# 📘 Directrices y Convenciones de Desarrollo | Robbies

Bienvenido al proyecto **Robbies** (Puzzles Services). Este documento establece las directrices de arquitectura, diseño, calidad de código y flujo de trabajo para mantener un código limpio, escalable y seguro.

---

## 🛑 REGLAS DE ORO STRICT (OJO CLÍNICO PIXEL PERFECT)

1. **PROHIBIDO EL USO DE AMARILLO / TONOS INVENTADOS**:
   - Queda estrictamente prohibido usar colores amarillos (`amber`, `yellow`, `gold`) en botones, enlaces o estados hover.
   - Todo debe responder a la paleta exacta original de Robbie's: **Blanco (`#FFFFFF`)**, **Azul Marino (`#2B447A`)**, **Azul Eléctrico (`#2B55FF`)** y **Azul Real (`#1C366E`)**.

2. **FIRMA DE COMMITS**:
   - Cada commit en Git debe incluir obligatoriamente la firma `by Alvaro Mejia` al final del mensaje. Ejemplo: `feat: add hero banner section by Alvaro Mejia`.

3. **ESTÁNDAR UNIFICADO PARA HERO BANNERS (TODAS LAS PÁGINAS)**:
   - **Título Principal (Heading)**:
     - Formato: Estrictamente 2 líneas.
     - Línea 1: `VOTED THE #1 PLACE`
     - Línea 2: `IN THE FLORIDA KEYS`
     - Tamaño: `text-xl xs:text-2xl sm:text-3xl md:text-[38px] lg:text-[44px] xl:text-[48px]` (~10px más compacto).
     - Peso: `Montserrat Black / ExtraBold`, `font-black`, `uppercase`, `tracking-tight`.
   - **Subtítulo (Subheading)**:
     - Texto: `THAT EVERY TOURIST SHOULD VISIT`
     - Tamaño: `text-sm xs:text-base sm:text-lg md:text-[22px] lg:text-[25px]` (~10px más prominente).
     - Peso: `Montserrat Bold`, `font-bold`, `uppercase`, `tracking-wider`.
   - **Botón CTA (`Learn More`)**:
     - Estilo: Alargado elegante (`px-10 sm:px-12 py-3 sm:py-3.5`), texto refinado (`text-xs sm:text-sm font-extrabold uppercase tracking-widest`), bordes `rounded-full`, fondo `#2B447A`.
   - **Insignia 50º Aniversario (`imgi_6_Badge_Page.png`)**:
     - Posicionamiento: Centrado verticalmente a la derecha (`top-1/2 -translate-y-1/2 right-6 sm:right-10 md:right-14 lg:right-16`).

---

## 🛠️ 1. Stack Tecnológico

- **Framework Core**: [Astro 5](https://astro.build)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com)
- **Gestor de Paquetes**: `pnpm`
- **Lenguaje**: TypeScript
- **Iconografía**: `@lucide/astro`
- **Despliegue**: Vercel (Conectado a GitHub `main`)

---

## 📁 2. Estructura de Directorios

```text
public/assets/
├── common/         # Logotipos, favicon, marca de agua
├── home/           # Video hero (ROBBIES_BANNER-VIDEO-RESUME-V5.mp4), imgi_6_Badge_Page.png, fotos home
├── attractions/    # Tarpon feeding, tours
├── rentals/        # Boat rentals, kayaks, jet skis
├── dining/         # Hungry Tarpon restaurant
├── about/          # Historia
└── contact/        # Ubicación
```

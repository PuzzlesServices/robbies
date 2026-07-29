# 📘 Directrices y Convenciones de Desarrollo | Robbies

Bienvenido al proyecto **Robbies** (Puzzles Services). Este documento establece las directrices de arquitectura, diseño, calidad de código y flujo de trabajo para mantener un código limpio, escalable y seguro.

---

## 🛑 REGLAS DE ORO STRICT (OJO CLÍNICO PIXEL PERFECT & UX/UI)

1. **ANCHO MÁXIMO CONTENEDOR UNIFICADO (`1180px`)**:
   - Todo el contenido principal de la web (Header, Hero, Featured In Bar, Welcome Section, Cards Grid) se alinea a un contenedor con `max-w-[1180px] mx-auto` para garantizar orden visual y densidad de información idéntica a los estándares modernos.

2. **PROHIBIDO EL USO DE AMARILLO / TONOS INVENTADOS**:
   - Mantener la paleta estricta: **Blanco (`#FFFFFF`)**, **Azul Marino (`#2B447A`)**, **Azul Eléctrico (`#2B55FF`)** y **Azul Real (`#1C366E`)**.

3. **FIRMA DE COMMITS**:
   - Cada commit en Git debe incluir obligatoriamente la firma `by Alvaro Mejia` al final del mensaje.

4. **ANIMACIONES Y FLECHAS DE EXPANSIÓN (READ MORE / READ LESS)**:
   - Reemplazar texto crudo `>>` por íconos SVG/Lucide estilizados (`ChevronDown` / `ChevronUp`).
   - Aplicar transiciones suaves de opacidad y altura (`transition-all duration-300 ease-in-out`) para evitar saltos bruscos.

5. **CARRUSEL MÓVIL EN SECCIÓN DE 4 TARJETAS**:
   - En pantallas pequeñas/móviles, mostrar las tarjetas en formato carrusel deslizable horizontal (`flex overflow-x-auto snap-x snap-mandatory`), mientras que en escritorio se mantienen en 4 columnas estables (`lg:grid lg:grid-cols-4`).

---

## 🛠️ 1. Stack Tecnológico

- **Framework Core**: Astro 5
- **Estilos**: Tailwind CSS v4
- **Gestor de Paquetes**: `pnpm`
- **Lenguaje**: TypeScript
- **Iconografía**: `@lucide/astro`
- **Despliegue**: Vercel (`main`)

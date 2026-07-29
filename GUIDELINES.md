# 📘 Directrices y Convenciones de Desarrollo | Robbies

Bienvenido al proyecto **Robbies** (Puzzles Services). Este documento establece las directrices de arquitectura, diseño, calidad de código y flujo de trabajo para mantener un código limpio, escalable y seguro.

---

## 🛑 REGLAS DE ORO STRICT (OJO CLÍNICO PIXEL PERFECT & UX/UI)

1. **NO INVENTAR TEXTOS NI IMÁGENES**:
   - Queda estrictamente prohibido alterar o inventar contenidos, títulos, imágenes o textos. Utilizar única y exclusivamente los textos e imágenes provistos explícitamente por el usuario o extraídos de los assets originales del proyecto.

2. **ANCHO DE CONTENEDORES**:
   - Header y Navbar en ancho completo (`1440px`).
   - Secciones del contenido principal (Hero, Featured In, Welcome Section, Anniversary Banner, Cards Grid) alineadas a `max-w-[1180px] mx-auto`.

3. **PROHIBIDO EL USO DE AMARILLO / TONOS INVENTADOS**:
   - Mantener la paleta estricta: **Blanco (`#FFFFFF`)**, **Azul Marino (`#2B447A`)**, **Azul Eléctrico (`#2B55FF`)** y **Azul Real (`#1C366E`)**.

4. **FIRMA DE COMMITS OBLIGATORIA**:
   - Cada commit en Git debe incluir obligatoriamente la firma `by Alvaro Mejia` al final del mensaje.

5. **TRANSICIONES DE EXPANDIR (READ MORE / READ LESS)**:
   - El botón `Read More` debe ir estrictamente **inline** al final del párrafo, sin saltos de línea ni divisores flotantes.
   - La expansión del texto debe ser suave (`transition-all duration-300 ease-in-out`), sin saltos bruscos ni huecos vacíos.

---

## 🛠️ 1. Stack Tecnológico

- **Framework Core**: Astro 5
- **Estilos**: Tailwind CSS v4
- **Gestor de Paquetes**: `pnpm`
- **Lenguaje**: TypeScript
- **Iconografía**: `@lucide/astro`
- **Despliegue**: Vercel (`main`)

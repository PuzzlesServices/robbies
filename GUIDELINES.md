# 📘 Directrices y Convenciones de Desarrollo | Robbies

Bienvenido al proyecto **Robbies** (Puzzles Services). Este documento establece las directrices de arquitectura, diseño, calidad de código y flujo de trabajo para mantener un código limpio, escalable y seguro.

---

## 🛑 REGLAS DE ORO STRICT (OJO CLÍNICO PIXEL PERFECT & UX/UI)

1. **NO GRADIENTES NI FILTROS OSCUROS EN IMÁGENES/VIDEOS (100% REALES Y ORIGINALES)**:
   - Prohibido colocar capas de degradado negro, filtros de oscuridad (`brightness`) o sombras sobre las imágenes o videos de la web. Todas las imágenes y videos deben mostrarse 100% reales, limpios, nítidos y en su estado original como fueron subidos.

2. **NO INVENTAR TEXTOS NI IMÁGENES**:
   - Queda estrictamente prohibido alterar o inventar contenidos, títulos, imágenes o textos. Utilizar única y exclusivamente los textos e imágenes provistos explícitamente por el usuario o extraídos de los assets originales del proyecto.

3. **VERIFICACIÓN Y CHEQUEO RESPONSIVE MÓVIL (100% OK)**:
   - Cada sección debe ser meticulosamente chequeada en pantallas móviles para garantizar orden impecable, carruseles fluidos, espaciados limpios y tipografía ajustada sin desbordamientos.

4. **ANCHO DE CONTENEDORES**:
   - Header y Navbar en ancho completo (`1440px`).
   - Secciones del contenido principal (Hero, Featured In, Welcome Section, Anniversary Banner, Cards Grid) alineadas a `max-w-[1180px] mx-auto`.

5. **PALETA DE COLORES OFICIAL**:
   - Mantener la paleta estricta: **Blanco (`#FFFFFF`)**, **Azul Marino (`#2B447A`)**, **Azul Eléctrico (`#2B55FF`)** y **Azul Real (`#1C366E`)**. Sin ningún tono amarillo ni improvisado.

6. **FIRMA DE COMMITS OBLIGATORIA**:
   - Cada commit en Git debe incluir obligatoriamente la firma `by Alvaro Mejia` al final del mensaje.

7. **TRANSICIONES DE EXPANDIR (READ MORE / READ LESS)**:
   - El botón `Read More` debe ir estrictamente **inline** al final del párrafo, sin saltos de línea ni divisores flotantes.
   - La expansión del texto debe ser suave (`transition-opacity duration-300 ease-in-out`), sin saltos bruscos.

---

## 🛠️ 1. Stack Tecnológico

- **Framework Core**: Astro 5
- **Estilos**: Tailwind CSS v4
- **Gestor de Paquetes**: `pnpm`
- **Lenguaje**: TypeScript
- **Iconografía**: `@lucide/astro`
- **Despliegue**: Vercel (`main`)

# 📘 Directrices y Convenciones de Desarrollo | Robbies

Bienvenido al proyecto **Robbies** (Puzzles Services). Este documento establece las directrices de arquitectura, diseño, calidad de código y flujo de trabajo para mantener un código limpio, escalable y seguro.

---

## 🛑 REGLAS DE ORO STRICT (OJO CLÍNICO PIXEL PERFECT)

1. **PROHIBIDO EL USO DE AMARILLO / TONOS INVENTADOS**:
   - Queda estrictamente prohibido usar colores amarillos (`amber`, `yellow`, `gold`) en botones, enlaces o estados hover.
   - Todo debe responder a la paleta exacta original de Robbie's: **Blanco (`#FFFFFF`)**, **Azul Marino (`#2B447A`)**, **Azul Eléctrico (`#2B55FF`)** y **Azul Real (`#1C366E`)**.
   - No inventar estados ni variaciones estéticas no presentes en el sitio original.

2. **FIRMA DE COMMITS**:
   - Cada commit en Git debe incluir obligatoriamente la firma `by Alvaro Mejia` al final del mensaje. Ejemplo: `feat: add hero banner section by Alvaro Mejia`.

---

## 🛠️ 1. Stack Tecnológico

- **Framework Core**: [Astro 5](https://astro.build) (Renderizado ultra-rápido, arquitectura de islas).
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com) + Vanilla CSS.
- **Gestor de Paquetes**: `pnpm`.
- **Lenguaje**: TypeScript.
- **Iconografía**: `@lucide/astro` (Iconos SVG optimizados).
- **Despliegue**: Vercel (Conectado a GitHub `main`).

---

## 📁 2. Estructura de Directorios

```text
public/assets/
├── common/         # Logotipos, favicon, marca de agua
├── home/           # Video hero (ROBBIES_BANNER-VIDEO-RESUME-V5.mp4), coronas, insignias 50 aniversario, fotos home
├── attractions/    # Tarpon feeding, tours
├── rentals/        # Boat rentals, kayaks, jet skis
├── dining/         # Hungry Tarpon restaurant
├── about/          # Historia
└── contact/        # Ubicación
```

---

## ⚡ 3. Gestión de Paquetes y Git

- Servidor local: `pnpm dev`
- Compilación: `pnpm run build`
- Commits: `git commit -m "... by Alvaro Mejia"`

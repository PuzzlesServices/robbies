# SYSTEM DIRECTIVE: PAGESPEED 99-100% PERFORMANCE ARCHITECTURE

Every page created or migrated in this Astro codebase must adhere strictly to these 6 mandatory performance directives:

## 1. Head Order & Preconnections (Score 100)
- `<meta charset="UTF-8" />` MUST be line 1 inside `<head>`.
- Preconnect and DNS-prefetch external origins (fonts, CDNs, maps, analytics):
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
  <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
  ```

## 2. Hero Background Video Optimization (96% Weight Savings)
- NEVER include heavy `<source>` tags inside `<video>` in initial HTML.
- Render a lightweight WebP poster (`poster="..."`).
- Inject `<source src="...">` dynamically via script 2.5s after render or on first scroll/touchstart event.

## 3. Third-Party Script & Embed Deferral
- Google Maps, forms, or third-party widgets MUST NOT load eagerly.
- Wrap their injection in an `IntersectionObserver` with `rootMargin: "250px"` and a 4.5s fallback timer.

## 4. Images & LCP Preload
- Use WebP/AVIF images exclusively.
- Preload the LCP hero image in `<head>` using `<link rel="preload" as="image" href="..." fetchpriority="high" />`.
- All secondary images below the fold MUST specify `width`, `height`, `loading="lazy"`, and `decoding="async"`.

## 5. Non-Render-Blocking Typography
- Ensure Google Fonts or custom `@font-face` rules specify `font-display: swap`.

## 6. Accessibility & Keyboard Focus for Hidden/Cloned Elements
- Elements inside hidden carousel slides or cloned marquee tracks with `aria-hidden="true"` or `pointer-events-none` MUST have `tabindex="-1"` on all links and buttons.

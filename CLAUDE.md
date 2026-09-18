## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Design Directives

- **Hero Sections**: Hero banners MUST feature full background photos without artificial color overlays, mix-blend-overlay, or heavy color tints. Present clear, un-tinted photos with clean readable contrast.
- **Instagram Section**: The Instagram section is hidden across pages per project directive.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Mandatory Migration Dashboard Rule

EVERY task, bugfix, optimization, component creation, or architectural change completed in this codebase MUST be automatically recorded in `src/migration/migrations.json` under the active sprint/day task log. Never complete a feature without registering its completion in the dashboard.

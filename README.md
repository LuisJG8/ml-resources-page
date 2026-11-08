# ML Resources Page

A standalone React/Vite app for learning the end-to-end classical machine learning pipeline. All frontend code, illustrations, pipe textures, document icons, locally hosted Manrope fonts, and font licenses are included.

## Run locally

Use Node.js 24 (see `.node-version`) and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. No account, API keys, backend, environment variables, or Sites connection is required.

## Test and build

```sh
npm test
npm run build
npm run preview
```

GitHub Actions runs tests and a production build on every pull request and on `main`. `npm run test:components` runs the rendered React button tests separately.

The production output is `dist/`. `npm run preview` serves that build locally. For production, use any static host with an SPA fallback to `/index.html` for application routes. Keep existing asset requests served normally.

## Project structure

- `src/`: React components, styles, pipeline animation/geometry, stage descriptions, and resource data.
- `public/assets/`: bundled images, icons, fonts, and licenses.
- `tests/`: route/content, pipeline geometry, progressive loading, scroll reveal, and resource chooser component checks.
- `index.html`: app entry point and default metadata.
- `vite.config.mjs`: standard Vite configuration.
- `ASSETS.md`: asset provenance and design references.
- `AGENTS.md`: project conventions and accepted design decisions.
- `design-qa.md`: historical design review notes.

## Routes

- `/`: homepage learning pipeline.
- `/daata-sourcing`: original requested spelling; `/data-sourcing` is an alias.
- `/data-cleaning`, `/modeling`, `/production`: detailed study pages.
- `/resources`: resource library grouped by Videos, Certifications, Books, Courses, Tutorials & docs, Interactive, and Datasets. Optional `category`, `stage`, and `q` query parameters preserve combined filters (for example `/resources?category=books`).

Homepage resource links open the library page with the relevant stage scoped in the URL. Format categories and search are the library controls; the Learning stage dropdown has been removed. Resource metadata shows the format and any access label, without pipeline-stage labels such as Modeling or Data Sourcing. Scoped results offer a “View all resources” reset without adding a stage label to the count. Search, category, and stage scopes survive refreshes and can be shared through the URL. The certification entries link to official AWS and Microsoft pages and label paid exams. A separate curated homepage Resources preview remains planned.

## Progressive loading

Content in the opening viewport appears immediately. Other content blocks, illustrations, and later pipe segments fade in once over 650ms when they enter the viewport, on the homepage, resource library, and study pages. Keyboard focus, reduced motion, printing, and browsers without IntersectionObserver show content immediately. Offscreen illustrations request their WebP assets within 300px of the viewport and wait for image loading before revealing, with reserved dimensions to prevent layout jumps. Native section anchors remain available. The resource library and study-page code load on their respective routes. Responsive pipe images avoid downloading the desktop texture on compact screens and switch automatically during resizing. Original PNG artwork remains bundled as source material.

## Migration

This GitHub repository imports the standalone project through five feature PRs: foundation, pipeline homepage, study pages, resource library, and resource chooser. The pre-import local history is retained in a backup branch in the original checkout.

Exported from the latest saved Pipeline source, version 36, commit `a608c9763d1c9885f1d4df46e818bb74a4c5ae22`. The original local Git history remains preserved separately from this feature-based import. Sites hosting metadata, Worker code, packaging scripts, and hosting-specific tests have been removed from this standalone working tree. The build uses standard Vite output instead of the Sites deployment format.

The original hosted website and source checkout remain intact as a backup. Historical QA notes describe that earlier hosted environment; they are retained as reference rather than deployment instructions.

## Resource chooser

“Choose for me” randomly shows up to three resources per format from the current search, category, and stage scope. Smaller categories keep all available resources. “Choose again” draws another shortlist; “Show all matches” restores the full filtered list. Filter edits clear picks, and refresh restores the full list for the URL filters. Selections stay in memory and do not change shared URLs.

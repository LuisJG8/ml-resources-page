# Project Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

This is a standalone React/Vite project in `Documents/code/ml_resources_page`. Build app UI in `src/`. Run `npm test` and `npm run build` before handoff. The build produces a standard static `dist/` directory. No Sites project, hosting manifest, Cloudflare Worker, or Sites publishing workflow is needed. Do not reattach or publish this project to Sites unless the user explicitly requests it.

## Accepted design direction

The user chose option 1, the Chrome Current silver-pipe mockup. Preserve the continuous top-left, down, right, down, left flow, generous open resource bays, white/silver/blue Color Hunt palette, large sans-serif headings, and generated learning illustrations. Keep the resource library search and category filters functional. Preserve stage-specific homepage links without restoring the removed Learning stage dropdown. Use the bundled raster pipe and illustrations instead of approximating them with CSS or handmade SVG.

## Pipeline motion update

The user subsequently requested a see-through pipeline with animated document-and-link data symbols matching their attachment. Use the glass raster assets and the supplied-reference-derived document icon. Keep packets inside the tube along the original winding desktop route. On mobile, use the narrow glass rail so moving packets do not cross resource text. The user removed the visible pause/play control; do not restore it. Continue to respect the system reduced-motion preference, including changes while the site is open.

## Straight pipeline finish

The user removed the robot, Email prediction screen, Spam/No Spam output, and the final pipe bend into the robot. Keep the Production resource section. The glass tube and document motion continue straight down through Production to the page bottom on desktop and compact layouts. Do not restore the classifier demo, robot connector, or subsequently removed pause/play control. Preserve reduced-motion support.

## Data icon density

The user requires a strict maximum of three data icons visible on screen at once. Render only three evenly spaced documents per layout, with the inactive desktop/mobile flow display:none. Preserve the restored icon size (32 × 32px in the native desktop canvas, 20 × 20px on mobile) and the slower speed subsequently requested by the user (180-second desktop and 105-second mobile cycles, half the previous speed). Delays must remain evenly distributed, and coupling occlusion must stay aligned.

The data documents must pass behind opaque pipe couplings. Keep the document-layer occlusion masks aligned with desktop joints and the repeated mobile bands when changing pipe geometry.

## Typography

Use locally hosted Manrope as the primary font throughout the website, including detail pages and controls. The official variable font covers weights 200–800 and its OFL license is bundled. Keep the main homepage headline italic; its `font-synthesis: style` override allows the requested italic treatment while body text stays upright. The headline starts at 22% of the desktop canvas, with 2.7% right spacing to retain its width (about 30 CSS pixels farther right than before at the 896px cap). Compact layouts add 8px of left margin. Preserve the blue highlighted phrase and the exact headline wording specified below.

All four homepage stage headings, including Production, must share the same font size, weight, line height, number styling, and responsive breakpoints. Use the shared heading rules so Production stays consistent with Data Cleaning and the other stages.

## Header

The user removed the wave icon, PIPELINE wordmark, divider, Classical ML, connected. tagline, and top navigation. Keep those retired elements removed. The user subsequently requested the introductory headline specified below. Keep the skip link and section resource-library buttons available.

## Responsive layout

The site must adapt to live horizontal resizing and device widths. The user found the full-screen desktop composition too zoomed in: keep it proportional to its actual container from 1024px up, capped at 896px for a more compact presentation. Below 1024px use normal document flow, a shared page/footer width capped at 680px, and the left rail. Tablet resource rows use two columns from 600px; phones stack. Keep navigation reachable, text readable, and pipe/robot/occlusion coordinates synchronized through ResizeObserver. Avoid fixed viewport-based heights for the capped desktop canvas.

## Longer vertical runs

The upper-left entry gains 50 CSS pixels and the last winding run gains 100 CSS pixels. Data Sourcing's straight run measures 263 scaled native pixels plus 200 CSS pixels. The user subsequently requested a taller Data Cleaning bay: its left straight run now measures 263 scaled native pixels plus 400 CSS pixels, adding 200 CSS pixels beyond the previously equal bays. Cleaning's original straight is 81 native pixels shorter, so retain its extra 81-native-pixel compensation. Stretch only straight raster rows at native y320, y600, y1140, and y1540, preserving bends, couplings, and tube width. Shared geometry keeps motion and occlusion aligned. Data Sourcing and Data Cleaning retain their vertical starting positions; Modeling, Production, and the bottom extension shift down 200 CSS pixels with the new Cleaning length. Total added page height is 750 CSS pixels plus 81 scaled native pixels. Keep the compact layout's continuous left rail and responsive resource flow intact.

## Main sections

The user requires four main sections, in this order: Data Sourcing, Data Cleaning, Modeling, and Production. Keep resource-library filters aligned with those stages. Production provides its learning resources beside the straight pipe finish.

Align all four homepage section headings and descriptions to the left edge of the desktop pipe entry, not an inset beside it. The user explicitly clarified that “y axis” means moving the copy left. Desktop sections and Production use native x39 of the 941px pipe canvas (about 4.145%); this replaces the earlier 10.3% inset. Data Cleaning is the subsequent exception described below. Compact layouts keep their shared 44px content inset so the narrow rail does not cross readable text. Preserve the pipe geometry and vertical bay positions.

Keep section descriptions short and simple, shared between the homepage and detail pages. Sourcing covers database/data-source extraction with SQL and accuracy/completeness checks. Cleaning emphasizes the time spent preparing data and applied statistics such as mean, median, mode, and imputation. Modeling explains how established algorithms and libraries simplify training and comparison. Production covers live predictions and ongoing accuracy/performance monitoring.

## Dedicated section pages

Each main section heading links to its own deeper study page. Preserve `/daata-sourcing` as explicitly requested by the user; `/data-sourcing` is an alternate spelling of the same page. The remaining routes are `/data-cleaning`, `/modeling`, and `/production`. Use real same-tab links with native browser navigation, direct-load/refresh support through the existing HTML fallback, and back links to the matching home section. Each page has an outline, a practice task, curated resources, its own title/description, and previous/next-stage navigation. Extend the shared content in `stage-pages.js` and `resources.js`. Keep the established white/blue typography and responsive page layout; do not restore the retired branding, navigation, earlier introductory copy/CTA, robot, or pause button.

Preserve direct-load and refresh support for the study routes and sourcing alias. Vite provides the app-shell fallback during development and preview. Any production static host must rewrite unknown application routes to `/index.html` while serving existing assets normally.

## Seamless straight extension

The desktop finish reuses a straight raster row from `glass-pipeline.png` at the main pipe's native width, with silver bands at native y1672 and y2102: one covers the raster join and the other finishes the tube at native y2122. The route ends at x876, extended y2122, without a horizontal turn. Compact layouts continue the same left glass rail through Production, measuring its actual height with ResizeObserver. Do not use the retired connector assets.

## Homepage introduction

Show exactly: `the machine learning pipeline` with no trailing punctuation. Highlight `machine learning pipeline` in the site's blue (#0744ff); keep `the` in the dark foreground. This is the homepage's single h1. Position it beside the pipe entry on desktop and before Data Sourcing in normal flow on compact screens. LearningViewport now shows the complete entry instead of trimming the old 280-native-pixel introduction area. Preserve the current pipe geometry, taller Data Cleaning bay, animation, and masks. Do not restore the older headline, From raw data to real predictions copy, subtitle, or CTA.

## Site-wide scroll fade-ins

The user expanded fade-ins to all website elements except those visible in the opening viewport. Use a shared, one-time 650ms opacity reveal for semantic content blocks, illustrations, later desktop pipe segments, and document images, on the homepage and study pages. Classify any element already intersecting the opening viewport as immediately visible with no transition, based on the actual viewport and restored scroll position. Preserve each raster shell's original opacity. Include resource-page content in the same reveal system; avoid nested fades. Wait for offscreen images to load before revealing their pixels. Revealed elements stay visible when scrolling back. Reduced-motion settings (including live changes), keyboard-focused elements, print output, and browsers without IntersectionObserver show content immediately. Preserve layout, native links, document motion and previews, and the accessibility tree. This replaces the earlier text-only restrictions on Data Sourcing, illustrations, and pipe reveals.

## Browser handoff

After completing a UI change, open or refresh the local preview. This project is developed and built locally; do not publish changes automatically.

## Resource library page

The user removed the visible resource-library introductory block: the “THE RESOURCE LIBRARY” eyebrow, “Find your next connection.” headline, and explanatory sentence. Keep the page opening with its back link followed by search and category filters. Retain a visually hidden page heading for accessibility.

The resource search and blue “Choose for me” button share one row in an 80/20 split (4fr/1fr after a 12px gap), including on phones, where the button label may wrap. The button randomly shortlists up to three distinct resources per matching format category, respecting search, category, and stage filters. Show all available entries in categories with three or fewer matches. Picks replace the list, retain its ordering, and remain stable until another click. Display pick/match counts and a “Show all matches” reset that preserves filters. Filter changes clear picks; the existing stage reset remains available. Disable choosing when there are no matches. Picks are temporary and refresh restores the full filtered list; preserve the existing filter URL format, accessibility, thumbnails, progressive loading, and reveals.

The user found the chooser appeared inactive because the count changed while the first cards stayed the same. Make the selected state explicit: change the button to “Choose again” while picks are active and explain that categories with three or fewer matches retain all their resources. Keep rendered-component tests that activate the real button and verify its cards, repeated draws, filtering, reset, disabled state, and keyboard behavior as part of `npm test`.

The resource library lives at `/resources` as a regular page, not a popup. Organize resources primarily by format, with category filters and named sections: Videos, Certifications, Books, Courses, Tutorials & docs, Interactive, and Datasets. Every resource has an explicit category; omit empty sections after filtering. The user removed the Learning stage label and dropdown. Do not restore them. Stage-specific homepage URLs still scope the results and offer a simple “View all resources” reset action. Do not display pipeline-stage labels such as Modeling, Data Sourcing, Data Cleaning, or Production as resource categories, entry metadata, or result-count suffixes on `/resources`. Show only the resource format and any access label above each title; keep organization by format categories. Keep search, white/blue styling, Manrope typography, scroll reveals, skip link, and back link to the learning path. Homepage resource actions are real same-tab links that select the relevant stage using `?stage=modeling` or `?stage=production`. Preserve search in `q`, learning stage in `stage`, and format in `category` across refreshes and shared URLs; combine all three filters. Include the verified introductory AWS AI Practitioner and Azure Data Fundamentals certification links and label their exams as paid. Support direct loads and `/resources/` through the same HTML fallback as study routes. Do not restore the resource modal or its close control.

A small homepage Resources preview with a few resources and a “View all resources →” link remains planned; specific preview resources are undecided. More detailed free/paid labels beyond the certification exam labels remain future work.

## Progressive loading

The user requested faster first visits through scroll-driven waterfall loading. Keep homepage illustration requests deferred until they are within 300px of the viewport, reserving their original aspect ratios. Keep text, stage anchors, and resource links rendered in the DOM and accessible while applying the scroll reveal policy. Images load immediately when IntersectionObserver is unavailable, when their enclosing link receives focus, or before printing. Fetch the resource-page code only on `/resources`, and the study-page component only on study routes. Use the bundled WebP display assets; retain original PNGs as source files. The desktop glass raster is lossless at its original dimensions and must only be requested on desktop, including after live resizing. Use direct Phosphor icon imports to keep cold Vite startup small. Preserve pipe geometry, reduced-motion support, and the shared scroll fade-ins.

## Clickable data previews

Each of the three data documents opens a small white speech-bubble table above and to its right, kept inside the viewport near screen edges. Each document has a different dummy dataset with exactly five table rows (one header plus four records) and four columns. Keep the bubble about 280px wide and the document icons at their existing sizes. The user removed the visible dataset title and “Sample data” label: show only the table and close control, retaining accessible labels. Tuck the bubble just above the icon's right half with a 4px gap, keeping a 12px viewport inset. Opening a preview pauses every document; clicking outside, closing it, or pressing Escape resumes the existing animation without restarting it, unless system reduced motion is enabled. Automatically dismiss after scrolling at least 160px up or down from the opening position, or when its icon leaves the viewport; small scroll adjustments keep the bubble anchored. Do not restore focus to an offscreen icon on scroll dismissal. Support keyboard activation, keep couplings and masks intact, and do not add a global pause/play control.

## Data Sourcing SQL example

Position the compact editable SQL panel on the left and a blue database icon on the right, with a right-pointing arrow from the SQL code toward the database. This replaces the earlier reversed arrangement. On phones, stack code, downward arrow, and database so the query stays readable.

Keep the query/arrow/database composition under the description with the SQL editor at the description's left edge. The user subsequently moved the arrow and database closer to the query: align the grid tracks to the start with fixed 20px gaps on desktop and 16px gaps on compact layouts, rather than spreading them across the full row. Retain the narrowed SQL editor: keep its left grid edge fixed and pull the right edge inward by 40px on screens from 600px up, retaining a 260px minimum within the available track. Compact layouts share the description's 48ch measure at 17px. On phones, the stacked editor still fills this shared width; this replaces its earlier 340px cap within the composition.

The SQL example is editable in place with a native, keyboard-accessible textarea, synchronized syntax highlighting, and line numbers. Keep the compact panel size stable while longer queries scroll inside it. Preserve native text editing and Tab navigation.

Replace the Data Sourcing saddle-surface illustration and its adjacent UCI/OpenML resource preview with a simple SQL editor-style example. The user subsequently requested roughly half the original size: use half the section width on desktop with compact typography and spacing; cap compact layouts at 340px while fitting narrow phones. Keep the focus on readable code, minimal editor chrome, and a beginner-friendly query containing SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, and LIMIT. Preserve the section heading, description, study-page link, and pipeline geometry. Dataset resources remain available in the resource library and study page.

## Resource thumbnails

Every resource in the `/resources` library has a small picture to the right of its text. Use the locally bundled official covers, badges, provider logos, and resource illustrations specified by each resource's `image` field. Keep a consistent contained image frame (112px wide on desktop, 80px on phones), preserve image proportions, and retain the external-link indicator. Use progressive loading with reserved dimensions, keep thumbnails decorative inside the labelled links, and preserve search, category filters, stage-specific links, and scroll reveals.

## Data Cleaning layout

Data Cleaning uses a single stacked column with its heading, description, compact scikit-learn illustration, and resource links arranged vertically with generous spacing. The user subsequently moved this column left and requested a fixed 20 CSS pixel gap from the pipe. On desktop, position its left edge 20px beyond the widest left coupling's native x100 edge, retaining the column's 57.6% width and left-aligned copy. On compact layouts, add 10px to this section's existing 44px content inset so it sits 20px beyond the glass rail's x34 edge. The scikit-learn illustration is 240px wide on desktop, preserving its proportions. Retain the taller left straight run's additional 200 CSS pixels; keep raster artwork, packet motion, couplings, and downstream section positions synchronized. Compact layouts retain their responsive flow and continuous left rail.

## Lower-page spacing and pipe finish

Position desktop Modeling at `1480.464 * scale + 630px`, leaving more breathing room below the horizontal pipe. The user found the earlier `+590px` position too close; the current placement adds 40 CSS pixels of clearance. Move Production copy from 24% to 10% of its footer. Retain the taller Cleaning bay and its 20px clearance. Keep the straight pipe continuous to the page bottom, cover the raster extension join at native y1672 with a silver coupling, and finish with a matching coupling at native y2102–2122. Use the bundled raster band and shared `PIPE_FINISH_BANDS` geometry so packets pass behind both collars. Preserve the straight route, responsive rail, and reduced-motion behavior.

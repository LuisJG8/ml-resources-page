# Pipeline design QA

final result: passed

## Comparison target and evidence

- Source visual truth: /Users/luisgonzalez/Documents/Codex/2026-11-03/bu/work/selected-design.png (option 1, Chrome Current).
- Source pixels: 946 × 1663. Desktop CSS viewport: 946 × 1663; screenshot density: 1. Same route, light theme, default page state, no dialog open.
- Implementation: /Users/luisgonzalez/Documents/Codex/2026-11-03/bu/work/desktop-final.png (946 × 1810 full-page capture; additional height is the working footer).
- Full-view comparison input: /Users/luisgonzalez/Documents/Codex/2026-11-03/bu/work/comparison-final.jpg. Source and implementation were placed side by side at their original, identical pixel widths; neither was stretched.
- Focused comparisons: /Users/luisgonzalez/Documents/Codex/2026-11-03/bu/work/foundations-comparison-final.jpg and /Users/luisgonzalez/Documents/Codex/2026-11-03/bu/work/models-comparison-v3.jpg. These compare the actual resource rows, typography, graphic footprint, and lower pipe clearance at the same CSS coordinates.
- Responsive evidence: /Users/luisgonzalez/Documents/Codex/2026-11-03/bu/work/mobile-v1.png, /Users/luisgonzalez/Documents/Codex/2026-11-03/bu/work/wide-final.png. Phone 390 × 844, narrow phone 320 × 800, tablet 768 × 1024, desktop 1440 × 1000. At all checked widths document scrollWidth equals viewport width.
- Working library search evidence: /Users/luisgonzalez/Documents/Codex/2026-11-03/bu/work/library-search.png.

## Findings and fixes

No actionable P0/P1/P2 findings remain.

### Comparison history

1. Revision 1: P2 model copy and tree crossed the third pipe run; P2 foundation illustration was too small. Evidence: desktop-v1.png. Increased the foundation illustration footprint and shortened the featured descriptions while retaining the fuller descriptions in the resource library.
2. Revision 2: P2 grid vertical centering still placed resource rows and tree too low, allowing lower content to meet the pipe. Evidence: comparison-v2.jpg. Top-aligned resource rows, moved illustration artwork within its slot, and used concise, meaningful featured copy. Removed redundant section controls from the first two bays; the complete library remains reachable from navigation.
3. Revision 3: The combined full view and focused model comparison confirm the graphics and body copy sit inside their intended bays. The official vector scikit-learn logo replaced a low-resolution PNG.
4. Final: Grouped link titles and their external icons to prevent orphan arrows on mobile. Verified final full-view and focused foundation comparison. No intersecting text, clipped resources, missing imagery, or horizontal overflow remains.

## Required fidelity surfaces

- Fonts/typography: self-hosted Inter regular/semibold/bold, close to the reference's compact sans-serif. Strong two-line desktop hero, clear section hierarchy, and readable resource text. Phone text uses fixed readable sizes and wraps naturally. The font was verified loaded in the browser.
- Spacing/layout: preserves the upper-left down/right/down/left continuous pipe and alternating spacious learning bays. The third pipe continues right and down to give the practice station its own open bay. This is an acceptable adaptation of the source's tapered lower endpoint. Footer is additional functional content.
- Colors/tokens: near-white #F8FAFC surface; silver and grey hardware, pale blues, charcoal text, cobalt actions and links. Palette matches the selected Color Hunt reference; accessible foregrounds are darker than its decorative grey swatches.
- Image quality/assets: real generated transparent raster pipe, saddle surface, and decision tree; official source SVG for scikit-learn; Phosphor library icons. No handmade SVG/CSS illustration replacements. Correct tree structure and axis labels, no distorted images or missing assets. Self-hosted assets all loaded successfully.
- Copy/content: retained the source headline and three learning stages. Replaced the concept subtitle with meaningful branding. Resource destinations and descriptions were checked against official sources. All twelve resources have working external anchors with appropriate new-tab labels and rel attributes.

## Primary interactions verified in browser

- Primary learning-path link changes URL to #foundations and scrolls toward the first stage.
- Resource library opens; Models + search `forest` produces one MLU-Explain result.
- Search `zzzzzz` produces the explicit empty state; Show all resources restores twelve results and clears filters.
- About dialog opens and its primary action hands off to the resource library; exactly one dialog is open and body scroll remains locked.
- Escape closes the dialog, restores body scrolling and focus to the invoking control.
- Mobile navigation stays reachable; dialogs have semantic titles, search labels, keyboard focus, and native focus containment.
- Browser error log check returned no entries.

## Implementation checklist

- [x] Reference/implementation combined visual review.
- [x] Focused typography, asset, and bay-clearance review.
- [x] Mobile, tablet, and desktop browser checks.
- [x] Navigation, filters, search, empty/reset, and dialog handoff checks.
- [x] Production build and all four required Sites worker tests passed.

## Follow-up polish

P3: Pipe couplings have no embedded station numerals; the adjacent section headings retain clear stage numbers. Coupling placements and the saddle's precise surface differ slightly from the generated reference. These differences do not affect the requested layout or task.


## Current review — transparent pipeline and data animation, November 4

Result: passed. No actionable P0/P1/P2 findings.

- Scope: material replacement and document-packet animation using the user's two-documents/chain-link attachment; established typography, learning bays and resource content remain intact.
- Current desktop evidence: /Users/luisgonzalez/Documents/Codex/2026-11-03/bu/work/glass-flow-desktop-final.png (946 × 1824), captured in a 946 × 1000 CSS viewport at density 1.
- Combined baseline/current comparison: /Users/luisgonzalez/Documents/Codex/2026-11-03/bu/work/glass-flow-comparison.jpg. Compared equal-width source and current captures together; layout, text positions, illustrations and copy are preserved.
- Mobile evidence: /Users/luisgonzalez/Documents/Codex/2026-11-03/bu/work/glass-flow-mobile.png. Moving symbols remain inside a 32px-wide glass rail ending at x34, before resource text begins at x39.
- Desktop 946px and 1440px widths: document images follow the full original serpentine geometry inside the glass tube; rescaling stays aligned (1440px canvas scale 1.5302869287991498). Glass shell opacity 0.52 reveals the documents behind it. Native CSS animation supplies motion; no per-frame React rendering.
- Motion verified from live computed offsets: 33.4018% advanced to 33.426%. Pause stopped a sampled packet at 33.9583%; a later observation remained exactly 33.9583%. Play restored animationPlayState=running.
- Reduced-motion behavior reviewed in code: initial state directly reads the system media query before rendering; changes to the media preference pause the flow. Runtime environment reported reducedMotion=false; changing the OS preference was not part of this check.
- Narrow phone 320px, phone 390px, and desktop 1440px had document scrollWidth equal to viewport width. Decorative images remain aria-hidden; the pause/play button stays keyboard-accessible and has a 44px mobile target.
- Resource library regression check: searching cross-validation returned exactly one relevant resource, with working close control and no console errors.
- All new assets loaded. Generated glass and supplied-reference-derived document PNGs are real assets; no replacement handmade SVG or CSS illustration.
- Production build and all four Sites worker tests passed after the final animation CSS change.

## Current review — robot prediction footer, November 4

Result: passed. No actionable P0/P1/P2 findings.

- Replaced the regular footer with a reference-inspired robot: large screen, compact body, two legs, no arms. White, silver, and blue materials fit the established site.
- Desktop evidence: `work/robot-footer-desktop-946.png` in the workspace. Reviewed 946px and 1440px desktop widths: the pipe extension joins the main rail and enters the robot's screen-side input without crossing the title or controls.
- Mobile evidence: `work/robot-footer-mobile-390.png`. Reviewed 390px and 320px widths: the pipe routes around the heading, joins the robot input, and leaves the prediction and pause control clear. No horizontal overflow or missing assets.
- Screen overlay visibly reads Email prediction, followed by either Spam or No Spam. Both states were observed during native animation playback. Result updates use packet animation iteration events, with no separate timer.
- Pause verification: the two sampled mobile packet offsets remained 17.9367% and 27.9367% across separate observations; prediction remained No Spam. Play restored movement. Existing reduced-motion state controls continue to pause both flow and results.
- Resource library regression: search `forest` returned exactly one MLU-Explain result. Closing restored page access. Browser error logs were empty.
- Generated raster assets preserve real artwork; invisible CSS paths only position moving document assets. Screen text remains real readable HTML. The demo heading makes the illustrative behavior explicit.
- Final production build succeeded, including Sites packaging preparation. All four Sites worker checks passed.

## Current review — responsive resizing, November 4

Result: browser checks passed.

- Desktop canvas height now follows the actual 941:1672 container ratio, including when its width is capped at 1440px. The old viewport-based height no longer controls the composition.
- Below 1024px, page and robot footer share a centered width capped at 680px, keeping the left rail, document path, coupling masks, and robot input aligned. Content stays in normal document flow. Resource rows use two columns from 600px; narrower phones stack.
- Fluid heading sizes, spacing, wrapping buttons, reachable three-link navigation, and 44px navigation/dialog controls improve small-screen use. Search fields use 16px text. Dialogs fit within the dynamic viewport height and scroll internally.
- Live resize sweep without reloading: 280, 320, 390, 599, 600, 1023, 1024, 1440, and 1920px. At every width document scrollWidth equals viewport width, page/footer widths match, and the footer gap is zero.
- At 1024px the measured canvas height is 1819.4766px versus 1819.4772px expected. The models text clears the next pipe band by 12.85px after tightening excess row spacing.
- Evidence in workspace work/: responsive-desktop-1440.png and responsive-tablet-768.png. Inspected 280px phone and 390px robot endpoint screenshots as well.
- Landscape 844 × 390 resource dialog sits between y16 and y374, scrolls internally, and retains its 44px close control. Phone 320px dialog is 280px wide without horizontal overflow. Search `forest` returns the expected single resource. Browser error logs are empty.
- Responsive changes preserve the sparse document flow, coupling occlusion, pause/play behavior, robot predictions, and reduced-motion state handling.
- Final production build and all four Sites worker checks passed.

## Current review — longer vertical pipe runs

- Added 50 CSS pixels to each of the winding desktop pipe's second, third, and fourth vertical runs. The first run and first horizontal turn retain their original dimensions and positions.
- Original glass raster is sliced and extended only along plain straight rows. Couplings, curves, and pipe width retain their source pixels. Motion coordinates and opaque coupling masks share the same cumulative extension geometry.
- At a 1440px viewport, the capped 896px canvas measures 1742.039px tall versus 1742.043px expected. Each inserted row measures 49.997 CSS pixels (subpixel rounding). Models shifts down 49.995px and Practice 99.999px; the footer has no gap from the main canvas.
- Full desktop screenshot reviewed: no visible seams, distorted bends, disconnected robot input, or text intersecting the extended pipe. The rendered data icon count remains three.
- Resizing through 1024, 1023, 390, and 1440px preserves zero footer gap, no horizontal overflow, and exactly three rendered packets. The compact left-rail layout retains its prior natural height. Pause verification held the sampled packet at 0.0926667% across separate observations; Play resumed flow. Browser error logs are empty.
- The two geometry invariant checks and all four Sites worker tests passed. Final production build succeeded. Evidence: outputs/pipeline-longer-verticals-preview.png in the workspace.

## Current review — introduction removal

- Removed the complete introductory heading, subtitle, and learning-path button. Data Sourcing is the first content section, and the main landmark retains an accessible label.
- LearningViewport closes the old 280-native-pixel introduction space with one visual offset and a matching reduction in layout height. Pipe geometry, animation coordinates, coupling masks, and the newer connector remain unchanged.
- Preserved the concurrently updated 100px vertical extensions and slower 180/105-second desktop/mobile cycles.
- At desktop widths, Data Sourcing starts at y226.922. The original canvas remains 1892.039px tall, its visible layout height is 1625.422px, and the footer joins within 0.008px of subpixel rounding.
- Checks at 1024, 1023, 390, and 1440px show no introduction block or horizontal overflow. Compact content starts at y48/y28. Three data icons remain rendered.
- The section resource-library control still opens and closes correctly. The final opening is captured in outputs/pipeline-no-intro-preview.png.

## Current review — exchanged sourcing and cleaning pipe heights

- Exchanged the complete straight-run lengths: Data Sourcing now has the previous shorter Cleaning run, and Cleaning has the previous longer Sourcing run. At the capped 896px canvas, the first bay shrinks and the second grows by 177.13 CSS pixels each.
- The Cleaning content moves up with its upper bend. Sourcing, Modeling, Production, the total composition height, and the pipe diameter retain their positions and dimensions.
- The existing shared cumulative offsets drive raster slices, document motion, and coupling masks. The transfer includes both 100 CSS pixels of extension and the original artwork's 81-native-pixel straight-run difference.
- Desktop screenshot reviewed: resource text and illustrations remain clear of the glass, bends remain connected, and Cleaning has generous room for additional content. Evidence: outputs/pipeline-swapped-heights-preview.png in the workspace.
- Live resize checks at 1024, 1023, 390, and 1440px found no horizontal overflow, zero footer gap, exactly three rendered packets, and no browser errors. Compact layouts retain their normal document flow.

## Current review — straight pipeline finish, November 5

- Removed the robot illustration, Email prediction screen, Spam/No Spam output, classifier label, and horizontal robot connector. Retained the Production learning resources and pause/play control.
- The desktop raster extension keeps the main tube's width and transparency, continuing straight down to the page bottom. The document path follows that same vertical finish and the remaining coupling retains its aligned occlusion mask.
- The compact left rail now continues through the naturally sized Production section. ResizeObserver measures both page and Production height so the glass, moving packets, and repeated coupling masks reach the same endpoint.
- Desktop and phone screenshots reviewed. Live resizing at 1024, 1023, 390, and 1440px showed no overflow, zero footer gap, three rendered documents, and no robot nodes. The compact rail ends exactly at the bottom of Production.
- Pause held all three sampled offsets unchanged across separate observations; Play resumed the flow. Production resources opened the library with the Production filter selected and one matching resource. Browser error logs were empty.
- Evidence: outputs/pipeline-straight-finish-preview.png in the workspace.

## Current review — pause button removal

- Removed the visible Pause/Play data flow button, unused component props, icon imports, and control styles. The system reduced-motion preference still determines whether the pipeline animation runs, including preference changes while the site is open.
- Browser checks at 390px and 1440px found no pause/play buttons, no horizontal overflow, exactly three rendered data icons, and a running animation under the current non-reduced-motion setting. Browser error logs were empty.
- Screenshot reviewed and saved as outputs/pipeline-no-pause-preview.png in the workspace. Production learning resources and the straight pipe finish are preserved.

## Current review — dedicated learning-stage pages

- All four main headings are real links to dedicated study pages: `/daata-sourcing`, `/data-cleaning`, `/modeling`, and `/production`. The standard `/data-sourcing` spelling also resolves to the sourcing page. Native navigation and the existing Worker HTML fallback support direct loading, refresh, and browser history without a new routing dependency.
- Each detail page includes a study outline, one practice task, curated resources, a title/description, a return link to the matching homepage section, and previous/next navigation. Existing resource data is shared with the searchable library.
- Outline/source review used the UCI repository, pandas introductory tutorials, and scikit-learn's Getting Started, Common Pitfalls, Preprocessing, Cross-validation, and Model Persistence primary documentation. External resource links remain explicit and open in a new tab.
- Browser-tested the Data Sourcing heading, direct refresh, and the next-stage chain through all four pages on desktop. Clicked each of the four home headings on a 390px phone, confirmed its corresponding route and heading, and returned to the correct home section.
- Reviewed desktop and phone screenshots; the new pages preserve the white/blue palette, clean type, and existing illustrations. Checks at 320, 768, and 1440px found no horizontal overflow or missing images. Browser error logs were empty.
- Evidence: outputs/pipeline-data-sourcing-page-preview.png in the workspace.

- Hosted route verification exposed the asset binding's canonical `/index.html` redirect. The Worker now fetches `/` internally for HTML fallback, serving the app shell while preserving the requested page URL. A regression test models the canonical redirect for all four study routes and the sourcing alias.

## Current review — equal sourcing and cleaning pipe heights

- Extended the vertical pipe beside Data Sourcing to match Data Cleaning, transferring no height out of Cleaning. Both straight runs now measure 263 scaled native pixels plus 200 CSS pixels, and both complete bays have equal heights.
- At the capped 896px desktop width, both straight runs measure 450.423 CSS pixels. Data Sourcing gains 177.13px; later sections shift down by that amount. Shared geometry keeps the document path and coupling masks aligned with the extended raster slices.
- The page measures 2219.164px versus 2219.169px expected, with zero footer gap. Desktop screenshot reviewed: pipe bends connect, content stays clear of the glass, and the Production finish continues straight down.
- Live checks at 1024, 1023, 390, and 1440px found zero horizontal overflow, three rendered document icons, four section-page links, and zero footer gap. Compact layouts retain normal document flow. Browser error logs were empty.
- Evidence: outputs/pipeline-equal-bays-preview.png in the workspace.

## Current review — introductory headline

- Added the exact requested sentence as the homepage's single h1. Both requested phrases use #0744ff; the connecting text and final period retain the dark foreground.
- Shows the complete desktop pipe entry again, placing the headline in the open area beside it without changing the native pipe geometry, equal sourcing/cleaning bay lengths, document animation, or coupling masks. The compact headline uses normal document flow above Data Sourcing.
- Reviewed desktop and 390px phone screenshots. Live checks at 320, 768, 1023, 1024, and 1440px found no horizontal overflow, clear separation from Data Sourcing, one h1, three rendered icons, and zero footer gap. Both highlighted spans resolve to rgb(7, 68, 255) at every width. Browser error logs were empty.
- Evidence: outputs/pipeline-headline-preview.png in the workspace.

## Current review — text fade-ins

- Added one-time, scroll-triggered 650ms opacity fades to 11 homepage text blocks from Data Cleaning through Modeling and Production. Introduction, Data Sourcing, illustrations, and pipe remain steady. The observer stops watching each block once revealed.
- Initial desktop observation found all 11 offscreen blocks pending at opacity 0, with Data Sourcing at opacity 1. Scrolling revealed Data Cleaning; Modeling was sampled mid-transition at opacity 0.627299 (later resource text at 0.597632/0.582503). All 11 blocks remained visible at opacity 1 after returning to the top.
- Keyboard navigation to the Data Cleaning heading immediately produced opacity 1 and transition duration 0s. Mobile scrolling also showed the later text fading in. Reduced-motion, print, and unsupported-observer visibility fallbacks were reviewed in code.
- Final desktop checks found 11 revealed blocks, no horizontal overflow, three rendered data icons, zero footer gap, and no browser errors. Text-only opacity changes preserve pipe geometry and layout.
- Evidence: outputs/pipeline-text-fade-preview.png in the workspace.

## Current review — Manrope and italic headline

- Replaced Inter's active font faces with the official, locally hosted Manrope variable font, including its OFL license and a font preload. Body text, headings, links, and controls inherit Manrope; detail pages use the same family.
- The homepage headline is italic, preserves both blue phrases, and moves 29.565px right at the capped desktop width (x469.117 versus x439.552). Its width is preserved. Compact layouts shift it right by 8px; the measured phone left edge is x52.
- Verified the actual Manrope face is ready with document.fonts.check. Browser computed styles report Manrope throughout, italic on the homepage headline, and upright text on the detailed Data Sourcing page. The official Manrope face is upright; the headline explicitly permits italic synthesis.
- Reviewed desktop and 390px phone screenshots. Checks at 320, 768, 1023, 1024, and 1440px found no horizontal overflow, clear headline/resource separation, zero footer gap, and three rendered icons. Detail-page navigation works and browser error logs were empty.
- Evidence: outputs/pipeline-manrope-preview.png in the workspace.

## Current review — section descriptions

- Rewrote all four descriptions into two short sentences based on the user's requested focus: SQL extraction and completeness, applied statistics for cleaning, established modeling tools, and live predictions with monitoring. Shared summaries keep the homepage, detail pages, and page metadata consistent.
- Reviewed the full desktop composition. Sourcing and Cleaning descriptions occupy 54px, Modeling 81px, and Production 46px without overlapping nearby resources. The existing Manrope typography, pipe geometry, three-icon limit, and text fades remain intact.
- Live resizing at 320, 390, 768, 1023, 1024, and 1440px found four descriptions, no horizontal overflow, zero footer gap, and three rendered data icons. The Data Cleaning heading opens its detail page with matching copy. Browser error logs were empty.
- Evidence: outputs/pipeline-descriptions-preview.png in the workspace.

## Standalone project migration — November 7

- Exported the latest saved source (version 36, a608c9763d1c9885f1d4df46e818bb74a4c5ae22) to Documents/code/ml_resources_page with Git history and no configured remote.
- Removed active Sites identity, Worker, packaging script, and hosting tests. Standard npm scripts run Vite directly and build to dist/. No service credentials or environment variables are required.
- All 37 files under src/ and public/ match the original by SHA-256. The production JS and CSS output hashes also match the prior build. Five retained tests pass and the standalone production build succeeds.
- Reviewed the production preview on localhost. The homepage renders, the Data Sourcing heading navigates to its detail route, refreshing that route works, and browser error logs are empty.
- Original hosted website and source checkout were retained as a backup. README.md documents local development, production SPA routing, project structure, and pending resources-page work.

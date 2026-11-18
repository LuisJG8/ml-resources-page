# Quiet Current redesign QA

## Reference and evidence

The user selected option 3, Quiet Current: `docs/design/quiet-current-reference.png` (724 × 2172). Implemented against the running local app at http://127.0.0.1:5175/.

Desktop validation used a 1280 × 900 CSS-pixel viewport. The final full-page capture is 1280 × 2845: `docs/design/quiet-current-desktop.jpg`. For direct comparison, crop the 896px app canvas at x192, scale proportionally to 724px wide, and pad the height rather than distorting either image. See `docs/design/quiet-current-comparison-final.jpg`. Earlier passes are retained beside it.

Additional evidence: `quiet-current-tablet.jpg`, `quiet-current-resources-desktop.jpg`, and `quiet-current-resources-phone.jpg` in the same directory. Some responsive captures include the existing 650ms reveal in progress; final desktop comparison was captured after scrolling through the content and returning to the top.

## Visual review

| Surface | Result |
| --- | --- |
| Layout and hierarchy | Passed. Original winding glass raster, title, four stage bays, straight Production finish, and following Resources heading retained. Shared left alignment and consistent measures match the selected composition. |
| Typography | Passed. Local upright Manrope; 58px desktop title, 48px shared stage headings, 22px body copy. The restrained static blue title glow remains. |
| Spacing and density | Passed. SQL, descriptions, tables, modeling logos, and production screenshot fit their bays. Phone compositions stack without global horizontal overflow. |
| Color and components | Passed. Existing white/silver palette and #0744ff blue retained. Dirty red, corrected green, dotted issue markers, and checkmarks remain. Library cards share 12px corners, consistent spacing, and contained 200px artwork. |
| Images and content | Passed. Authentic existing pipe, document icon, credential badges, book covers, XGBoost/LightGBM logos, and MLflow screenshot preserved. Exact user copy, five customer records per table, hidden captions, and all current sections remain. |

## Comparison fixes

1. First comparison found P2 body/table typography too small and light. Increased body and table sizes, adjusted heading weights and paragraph spacing, then recaptured at the same viewport.
2. First comparison found a P2 undersized database glyph. Increased its proportional frame and rechecked the SQL/arrow/database row.
3. Second comparison refined table row padding and the resource-link size; the final side-by-side comparison confirms both changes.
4. Checked lazy-page styling after navigation and strengthened selector scope so the shared gallery/detail refinements survive lazy CSS loading. Verified the actual card has 12px corners and 28px/20px padding.

No unresolved P0, P1, or P2 findings.

## Preserved product constraints

The selected generated image compresses the MLflow screenshot and includes an extra tube branch near Production. The implementation preserves the authentic screenshot's original proportions and the established continuous straight pipe finish; this makes the final Production region taller. Existing Manrope, exact copy, and official logo proportions take precedence over generated text/art inaccuracies. No removed robot, garbage animation, navigation, video category, or other retired element was restored.

## Responsive and interaction checks

- Checked homepage at desktop 1280px, tablet 768px, and phone 320px widths, including live resizing. Phone SQL/database and customer tables stack; modeling logos and MLflow image remain contained. Document scroll width equals viewport width on phone and tablet.
- Checked three/two/one-column resource galleries. Phone controls measure 214.398px search and 53.594px button after the 12px gap (4:1). Tablet controls also maintain4:1. No horizontal overflow.
- Edited the real SQL textarea, verified highlighted code synchronized, and restored the original query.
- Opened a moving document preview, verified its four-column/five-row table, and closed it using Escape.
- Followed Data Cleaning to its study page and returned through the matching homepage back link. Reviewed the study page at320px with no overflow.
- Opened Resources from the homepage. Keyboard Enter activates Choose for me, announces12 picks from 45 matches, and retains button focus. Redraw advances selection; Show all matches restores45 resources.
- Books filter returns15 resources; OpenIntro Statistics search returns1. Empty search results disable choosing. Filter/reset URLs remain functional.
- Direct stage-scoped Books URL returns4 matches; choosing shows3 picks. Refresh restores all4 matches while retaining URL filters. Stage reset preserves the format filter.
- Browser error logs were empty during the tested flows. Temporary viewport override reset; local preview remains running and open.

## Automated validation

`pnpm test`: passed,36 unit tests and14 rendered-component tests (50 total). Coverage includes selection behavior, URLs, gallery rendering, geometry/occlusion, progressive loading, and reduced-motion reveal behavior. Reduced motion was validated through the existing automated coverage, not an OS preference change.

`pnpm run build`: passed, including strict TypeScript checking and Vite production build. `git diff --check`: passed.

final result: passed


## Modern Web Guidance refinement — 2026-11-17

Applied the requested `modern-web-guidance` skill, searching responsive layout and readable typography before editing. Retrieved `responsive-design`, `css`, and `typography` in full. Kept Quiet Current, the pipeline geometry, exact copy, all illustrations, routes, data tables, progressive loading, scroll reveals, and interactions.

- Shared surface, radius, and spacing tokens now keep the SQL panel, data tables, filters, and resource cards visually consistent. Native logical spacing properties are used for the new rules. No dependencies or new global reset were added.
- Converted the refinement's type sizes to rem, with mixed rem/viewport clamp bounds for compact headings. Paragraphs use pretty wrapping; standalone headings use balanced wrapping. These declarations fall back to normal wrapping when unsupported. Controls/cards retain content-driven heights; the deliberately scrollable SQL editing viewport remains fixed.
- Resource grids now respond to the actual results container: one column below 36rem, two from 36rem, three from 50rem. An `@supports` gate retains the prior viewport grid on browsers without container-query support.
- The library retains the 80/20 controls and 45 resources. Category controls are outlined pills; active state, status announcements, and keyboard focus are unchanged.

Browser verification covered 1280px desktop, 768px tablet, and 320px phone. No document overflow at these widths. The gallery displayed 3/2/1 columns respectively. On phone, the controls measured 214.398px and 53.594px after the 12px gap. A clipped chooser label found during the first narrow-width check was corrected to 0.75rem; the final control fits.

Verified keyboard chooser activation (12 picks from 45 matches and retained focus), Show all matches reset, Books filter, OpenIntro search, editable SQL/highlight synchronization, and Data Cleaning navigation/back link. Both tables retain 5 customer records; red/green highlights and correction marks remain. Console logs contained no errors.

Evidence: `docs/design/modern-web-home-desktop.jpg`, `docs/design/modern-web-resources-desktop.jpg`, `docs/design/modern-web-resources-phone.jpg`, and `docs/design/modern-web-home-phone.jpg`. Compared the current homepage to the selected Quiet Current reference: all content, assets, section order, pipe positions, and overall composition retained; only text wrapping and panel surfaces changed.

Validation: `pnpm test` passed all 50 tests (36 unit, 14 component); `pnpm run build` passed strict TypeScript and Vite compilation; `git diff --check` passed.

final result: passed

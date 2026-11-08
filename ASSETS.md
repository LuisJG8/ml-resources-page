# Asset provenance

## Web display copies

The site uses the bundled WebP derivatives for faster delivery, while retaining the original PNG source assets. `glass-pipeline.webp` is pixel-identical to its 941 × 1672 PNG, preserving every crop and coupling coordinate. The document icon uses the 64 × 64 display copy, the compact rail uses 180 × 540, and both learning illustrations use 960px-wide display copies. CSS preserves the original layout dimensions and pipe geometry. These five WebP files total about 526KiB versus 3.3MiB for their PNG counterparts; only assets needed by the active layout and scroll position are requested.

The selected visual direction is option 1, Chrome Current, generated during design selection.

All three custom production assets used the built-in Image Gen tool with that selected reference attached. Generation specifications:

- `public/assets/chrome-pipeline.png`: isolated orthographic satin chrome pipe, subtle blue reflections and flanged connectors; continuous down/right/down/left/down/right/down path; wide transparent interior resource bays; no words or background.
- `public/assets/foundations.png`: isolated blue translucent wireframe saddle surface with labelled x/y/z coordinate axes; same palette as the selected design; transparent background.
- `public/assets/decision-tree.png`: isolated seven-node blue decision tree, root x₁ ≤ 0.5, internal splits x₂ ≤ 1.2 and x₁ ≤ 1.8, four prediction leaves 0/1/0/1; transparent background.

The scikit-learn logo is the official `scikit-learn-logo-without-subtitle.svg` from https://github.com/scikit-learn/scikit-learn/tree/main/doc/logos. Icons use the Phosphor React package. The retired Inter font files and their license remain as historical source assets.

## Manrope typography

The current primary font is the official Google Fonts Manrope variable TrueType file, covering weights 200–800: https://github.com/google/fonts/tree/main/ofl/manrope. It is served locally as `public/assets/manrope-variable.ttf`, with `public/assets/Manrope-LICENSE.txt` containing the SIL Open Font License. The font is preloaded and uses font-display: swap. The upright face is used throughout; the homepage headline permits browser italic synthesis for the requested italic treatment.

Font SHA-256: `3ae11c49db0455a3cc33e37d380f20fdb8c7f8b41dc07625c177e3d87a9d6ae6`.

Palette reference: https://colorhunt.co/palette/f8fafcd9eafdbcccdc9aa6b2. White #F8FAFC, ice blue #D9EAFD, silver-blue #BCCCDC, grey #9AA6B2; the UI adds cobalt and dark charcoal for usable contrast.

## Transparent pipeline and data flow

The November 4 update adds three built-in ImageGen assets:

- `glass-pipeline.png`: an edit of the original pipe that preserves its exact 941 × 1672 geometry and replaces opaque chrome with pale glass and silver joints. The browser composites this shell at 52% opacity over the moving documents, providing a true see-through effect.
- `glass-pipe-mobile.png`: a straight glass tube segment repeated vertically to keep moving documents in a narrow rail beside mobile text.
- `data-document.png`: a cobalt-blue adaptation of the user's attached two-documents-and-chain-link symbol, with transparent surroundings and white document fill.

The animation uses the generated PNG icon on an invisible CSS motion path, with a measured geometry aligned to the original pipe. The path is animation metadata, not a replacement illustration. On phones the same icon follows a responsive motion path down the glass rail and into the robot. Moving documents and pipes are decorative and excluded from the accessibility tree. Motion starts paused for reduced-motion users and can be paused or resumed with a visible footer control.

## Prediction robot footer

Retired November 5: the user removed the robot, prediction screen, and bent input connector. These assets remain as historical source assets but are no longer rendered. The current finish reuses a straight row of `glass-pipeline.png` and its silver band; compact layouts extend `glass-pipe-mobile.png` to the end of Production.

The robot uses the user's November 4 biped reference for its broad screen, compact body, and two legs. Three transparent assets were generated with built-in ImageGen:

- `prediction-robot.png`: friendly front-facing white and silver robot, blue joints, no arms, large blank navy screen, and a right-side data input. Live HTML supplies the screen label and prediction.
- `robot-connector.png`: glass and silver desktop pipe extension that bends left into the robot's input.
- `robot-connector-mobile.png`: glass pipe extension that routes the left mobile rail around the footer heading and into the robot.

The two labels, Spam and No Spam, alternate on document animation arrivals. This is an illustrative classification demo, not a trained model or email processing service. Pausing the document flow also stops result updates.

The document layer uses spatial CSS masks at the metal coupling bands, including the desktop extension and robot input. Mobile masks follow the tube's 270px repeat period and recalculate with the page layout. These masks provide opaque occlusion while preserving the original raster artwork and transparent glass.

The winding desktop glass is now rendered in slices, with a one-pixel raster row extended at native y600, y1140, and y1540. Each inserted straight section occupies 50 CSS pixels. This reuses the original image and preserves its bends, pipe diameter, and coupling artwork. Shared geometry moves document paths and masks with the extended image.

After the introduction was removed, LearningViewport offsets the complete desktop composition by 280 native pixels and reduces its layout height equally. The underlying raster slices, motion coordinates, coupling masks, longer vertical runs, and seamless connector remain unchanged.

## Resource library thumbnails

Each library resource has a small locally hosted thumbnail on the right of its text. Official covers, certification badges, course illustrations, documentation diagrams, and provider logos identify the linked resources. Raster display copies are resized to at most 320 × 240px and encoded as WebP; official SVG logos and badges retain their vector format. These images load near the viewport with reserved dimensions and are decorative within already-labelled resource links. Original artwork and trademarks belong to their respective providers.

- `public/assets/resources/aws-ai-practitioner.webp`: https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/certification/approved/images/certification-badges/aif-badge-resized.fba05feb8ac8ac2c0c4d9201b4f9bbf8db385b9e.png
- `public/assets/resources/azure-data-fundamentals.svg`: https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-fundamentals-badge.svg
- `public/assets/resources/uci.webp`: https://archive.ics.uci.edu/static/public/53/Thumbnails/Small.jpg
- `public/assets/resources/openml.webp`: https://www.openml.org/favicon.ico
- `public/assets/resources/preprocessing.webp`: https://scikit-learn.org/stable/_images/sphx_glr_plot_map_data_to_normal_001.png
- `public/assets/resources/seeing.webp`: https://seeing-theory.brown.edu/img/share/home.png
- `public/assets/resources/linear.webp`: https://www.3blue1brown.com/assets/linear-algebra-C-0g0qH-.webp
- `public/assets/resources/numpy.svg`: https://numpy.org/images/logo.svg
- `public/assets/resources/pandas.svg`: https://pandas.pydata.org/docs/_static/pandas.svg
- `public/assets/resources/isl.webp`: https://images.squarespace-cdn.com/content/v1/5ff2adbe3fe4fe33db902812/8b373fbe-d1b4-4351-b803-0d3cd5bba1b0/ISLP_cover.png
- `public/assets/resources/google.webp`: https://developers.google.com/static/machine-learning/crash-course/images/MLCC_Linear_Regression_no_text.png
- `public/assets/resources/r2d3.webp`: https://r2d3.us/decision-trees-part-1-preview.png
- `public/assets/resources/mlu.webp`: https://mlu-explain.github.io/assets/mluexplain-homepage-ogimage.png
- `public/assets/resources/clustering.webp`: https://scikit-learn.org/stable/_images/sphx_glr_plot_cluster_comparison_001.png
- `public/assets/resources/mooc.webp`: https://inria.github.io/scikit-learn-mooc/figures/mooc_computer.jpg
- `public/assets/resources/validation.webp`: https://scikit-learn.org/stable/_images/grid_search_cross_validation.png

The pitfalls, model persistence, and getting-started entries reuse the bundled official `scikit-learn.svg` logo described above.

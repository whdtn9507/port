# MARVEL responsive repair

Personal web publishing practice. Original imagery and existing CSS are retained; responsive.css is loaded last. No build step or external JS library is required.

## Changes
- Fluid containers and poster grids across five pages; 5/4/3/2 columns.
- Mobile navigation, touch dropdowns, keyboard focus and Escape handling.
- Manual home slideshow and native horizontal comic rail; reduced-motion support.
- Fluid video dialog, deferred iframe loading, focus restoration and background inert state.
- Flow-based footer, skip link, semantic navigation and page headings.

## Verification
Chromium: five pages at 360, 390, 768, 1280 and 1440 CSS pixels. Checked document overflow, visible element bounds, broken loaded images and page errors. Mobile menu, dropdown navigation, slideshow, comic scrolling and video dialog open/close/focus were exercised. YouTube playback itself was not verified; external requests were blocked during local tests.

Serve this folder with a static HTTP server, e.g. python -m http.server 8000.

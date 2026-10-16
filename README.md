# MVX Technologies Inc. website

Source for [mvxtechnologies.com](https://mvxtechnologies.com): a single-page Next.js site exported as
static files and deployed to GitHub Pages on every push to `main`.

## Editing content

All copy lives in `frontend/src/content/site.ts`: company blurb, selected work, team members and their
CV pop-up, services, products and publications. Product icons are in `frontend/public/products/`, PDFs in
`frontend/public/documents/`.

## Structure

```
frontend/src/
  app/            layout, page, global styles
  components/     DoubleSlit (hero simulator), Team (cards + CV dialog), WaveFx (dividers + ripples)
  lib/
    wave.ts       shared wavelength state, spectrum colours
    doubleSlit.ts 2D double-slit simulation drawn on a canvas
    waveFx.ts     wave dividers and the click-ripple wave equation (walls = page glyphs)
  content/        site.ts — all text
```

The hero simulator's wavelength drives the colour and period of the section dividers and of the
click ripples. Everything animated is disabled for visitors who prefer reduced motion.

## Development

```bash
cd frontend
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to frontend/out
```

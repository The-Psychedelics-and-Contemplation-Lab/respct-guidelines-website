# The ReSPCT Guidelines — respctguidelines.com

Reporting of Setting in Psychedelic Clinical Trials: an international Delphi consensus
(Pronovost-Morgan C, Greenway KT, Roseman L & The ReSPCT Experts, *Nature Medicine* 2025,
https://doi.org/10.1038/s41591-025-03685-9).

Built with [Astro](https://astro.build) and the lab's shared [design-system](https://github.com/The-Psychedelics-and-Contemplation-Lab/design-system). Published automatically to GitHub Pages on every push to `main`.

## Editing content
- `src/content/explanatory-document/index.md` — the full explanatory document (Markdown). Keep the
  `### Item N: …` heading pattern: it produces the `#itemN` anchors that the 30-item table links to.
- `src/content/guidelines-table.json` — the 30 items of the table (sections, names, details).
- `src/content/explanatory-toc.json` — the table of contents of the explanatory document.
- `src/content/home.md`, `src/content/contact.md` — the texts of the home and contact pages.
- `public/pdf/` — the explanatory document and the printable checklist PDFs.
- `src/site.config.ts` — site name, accent colour, navigation, footer links, citation and schema.org data.

Edit a file on GitHub → *Commit changes* → the site rebuilds in about a minute.

## Working locally
```
npm install
npm run dev        # http://localhost:4321/respct-guidelines-website/
npm run build && npm run check:html
python3 scripts/verify-migration.py   # word counts, anchors, table links, PDFs, image sizes
```

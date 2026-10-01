# Migration report — The ReSPCT Guidelines (respctguidelines.com)

Source: `/home/claude/sources/respct/respct-guidelines.WordPress.xml` (WordPress.com export, 4 pages)
+ media. Target: Astro 7 + `@pcl/design-system`, accent `#3F6F6B`, base `/respct-guidelines-website`.
Re-run the checks with `python3 scripts/verify-migration.py` (after `npm run build`).

## Pages built (same URLs as the old site)

| Old URL | New page | Source file |
|---|---|---|
| `/` | `src/pages/index.astro` | `src/content/home.md` |
| `/the-respct-guidelines/` | `src/pages/the-respct-guidelines.astro` | `src/content/guidelines-table.json` |
| `/the-explanatory-document/` | `src/pages/the-explanatory-document.astro` | `src/content/explanatory-document/index.md`, `src/content/explanatory-toc.json` |
| `/contact/` | `src/pages/contact.astro` | `src/content/contact.md` |

`npm run build` ✓ · `npm run check:html` → 4 pages checked, 0 problem(s).

## Word counts (source `content:encoded` vs built `<main>`, same method)

Method: strip HTML comments and tags, unescape entities, split on whitespace, count tokens that
contain a letter or digit (so the stray `:` left behind by the old `<u>…</u>:` labels is not a word).

| Page | Source | Built | Diff | Why |
|---|---|---|---|---|
| Home | 143 | 201 | +58 | eyebrow, DOI, "Downloads" section with the two PDF cards (new, required) |
| The ReSPCT Guidelines | 484 | 539 | +55 | eyebrow, section legend, hidden table caption, citation block |
| **Explanatory document** | **12 357** | **12 364** | **+7** | eyebrow "Explanatory document" (+2); the mislabelled quotes list of Item 3 (+5, see below) |
| Contact | 10 | 100 | +90 | the Jetpack form (name/e-mail/message) is replaced by three mailto cards |

The explanatory document is within the required ±10 words. (A plain whitespace split gives
12 719 source / 12 661 built; the −58 is entirely the stray colons described above — checked with a
token-level diff: every other difference is punctuation or the two items listed.) Nothing was dropped:
intro, the four sections, 30 items with their explanatory paragraphs, suggested reporting questions,
suggested measuring tools (items 26–30), expert quotes, the References list (incl. "Websites") are all there.

One editorial correction: in the source, the third list of Item 3 (the expert quotes) was labelled
"Suggested reporting questions" a second time; it is now "Selected relevant quotes of Delphi consensus
process experts", like every other item. Also, "I️ntroduction" contained a stray U+FE0F character
(invisible) which was removed. Smart punctuation is turned off in the Markdown processor so quotes and
apostrophes are rendered exactly as written.

## Anchors — explanatory document (31/31 verified one by one)

`#item1` … `#item30` and `#References`: each id exists in `dist/the-explanatory-document/index.html`
**and** is linked from the table of contents (the TOC labels are kept verbatim from the old site, e.g.
"Item 11: Music or soundscape", "Item 18: Therapeutic/guiding approach"). The ids are generated from the
`### Item N: …` headings by `src/lib/satteri-respct.mjs`, so editors cannot break them by renaming.

```
#item1 … #item30  id yes / toc link yes   (30 × )
#References       id yes / toc link yes
```

## 30 table links verified

`/the-respct-guidelines/`: 34 body rows (4 section rows + 30 items); every item name links to
`/the-explanatory-document/#itemN` and each target id exists in the built document (30/30 resolve,
also enforced by `npm run check:html`). Sections use the design-system `RESPCT_SECTIONS` colours:
fills (`#5E9591`, `#8A7B4F`, `#6B7F9E`, `#8F6A62`) for the band tint and left border; the darkened
text variants for the legend and for the TOC group labels (4.55:1 on paper). On the 12 % tinted band
rows the text is `--ink` because the darkened variants only reach 4.1:1 there (measured).
Below 640 px the table re-flows into one block per item (number · name / details) instead of a
sideways-scrolling 3-column grid.

## PDFs

| File | Size | Linked from |
|---|---|---|
| `public/pdf/respct_explanatory_document.pdf` | 637 482 B | home, explanatory document, (footer on every page via "Explanatory document" page) |
| `public/pdf/respct_fillable_checklist.pdf` (renamed from the old `rescpt_…` typo) | 126 976 B | home, guidelines page, footer of every page |

Both get the automatic ⤓ icon. The older `*_2025-02.pdf` versions in the sources were superseded and
are not shipped.

## Images

| File | Pixels | Size |
|---|---|---|
| `public/images/respct-illustration-800.webp` | 800 × 800 | 124 868 B |
| `public/images/respct-illustration-1600.webp` | 1600 × 1601 | 497 460 B |
| `public/images/respct-illustration-2480.webp` (q80) | 2480 × 2481 | 975 650 B |
| `public/images/respct-illustration-detail-800.webp` | 800 × 1063 | 157 722 B |
| `public/images/respct-illustration-detail-1600.webp` | 1600 × 2126 | 492 946 B |
| `public/images/og-image.jpg` (1200 × 630 crop of the square) | | 177 370 B |
| `public/images/respct_site_logo.png` (schema.org logo, apple-touch-icon source) | 750 × 750 | 22 982 B |

The originals (1.3 MB square, 7.0 MB and 6.0 MB tall versions) are **not** in the repo: at JPEG q82 the
2480 px square was still 1.27 MB, so the variants are WebP (q82; q80 for the 2480 px one to stay ≤ 1 MB).
The home cover uses `<img srcset>` with the 800/1600/2480 variants, `object-fit: contain` in a square
(`aspect-ratio: 1/1`) box so the illustration is never cropped, with the 13 % / 17 % fades to `#FBFAF8`.
On screens ≥ 768 px the box is capped at 58 rem high and the title sits on the blank paper at the top
left, as on the old site; below that the title stacks above the full-width square.
The Pexels stock photos of the old home page were deliberately not reused. Natasha's portrait was not
used on the old site either and is not shipped.

## Other decisions / things to know

- **Acrostic h1**: `aria-label="Reporting Setting in Psychedelic Clinical Trials"` on the `<h1>`, the five
  visual lines are `aria-hidden`. Initials `#1E3B37 / #2A4F4A / #35635E / #40766F / #477D78` (T darkened
  vs the old `#4A817C`; 4.50:1 on paper).
- **Contact**: the Jetpack form posted to chloe.pronovost-morgan@mail.mcgill.ca, kyle.greenway@mcgill.ca and
  l.roseman@exeter.ac.uk (from the form's hidden `to` attribute). They are now mailto links with the old
  subject line `[The ReSPCT Guidelines Website query]`. If an address should not be public, remove it from
  `src/pages/contact.astro`. The old form's submissions (`feedback` posts, incl. spam) were not migrated.
- **Sticky TOC**: `position: sticky; top: calc(var(--header-h) + 2rem)` — i.e. 2 rem below the sticky site
  header (a bare `top: 2rem` would hide the first entries under the header). Stacked above the text below
  782 px, where it becomes a collapsible `<details>` (open without JavaScript).
- **Sticky table header**: the design-system's `.table-wrap { overflow-x: auto }` turns the wrap into the
  sticky container of `thead`, which parks the header 72 px into the table and hides row 1. Fixed here
  with `.guidelines-table { overflow: visible }` on ≥ 960 px (the table fits); worth fixing upstream.
- **Schema.org**: `Organization` (site) with `subjectOf` → `ScholarlyArticle` (DOI
  `10.1038/s41591-025-03685-9`); the explanatory document is `["ScholarlyArticle","MedicalWebPage"]`
  with `isBasedOn` the article; the table page `MedicalWebPage`, contact `ContactPage`, home `WebSite`.
- **Print**: design-system `print.css` + a few rules in `site.css` (TOC, cover fades and floated image
  hidden, h4 in black, full-width measure). Checked: `screenshots/explanatory-print.png/.pdf`,
  `screenshots/guidelines-print.png` (table headers repeat, rows kept whole).
- **Markdown processor**: Astro 7 uses Sätteri; the anchor/outbound-link plugin is a Sätteri hast plugin
  (`@astrojs/markdown-satteri` added as an explicit dependency).
- Favicon (`/favicon.svg`, `/apple-touch-icon.png`) are referenced by the design-system `Layout` from
  the domain root; they only resolve once the custom domain is active (same for the other sites).
- Old footer content (reference, resources, contact, illustration credit) is reproduced through
  `footerLinks` and the `footer-meta` slot (illustration credit on every page).

## Screenshots (`screenshots/`, not committed)

`home-1400.png`, `home-390.png`, `guidelines-1400.png`, `guidelines-1400-scrolled.png`, `guidelines-390.png`,
`guidelines-390-top.png`, `explanatory-1400.png` (full), `explanatory-1400-top.png`,
`explanatory-1400-scrolled.png`, `explanatory-1400-references.png`, `explanatory-390.png` (full),
`explanatory-390-top.png`, `explanatory-390-scrolled.png`, `contact-1400.png`, `contact-390.png`,
`explanatory-print.png`, `explanatory-print.pdf`, `guidelines-print.png`.

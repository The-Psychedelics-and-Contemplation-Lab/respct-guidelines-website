import type { SiteConfig } from '@pcl/design-system';

const url = 'https://respctguidelines.com';

export const site: SiteConfig & { base: string; previewUrl: string } = {
  name: 'The ReSPCT Guidelines',
  tagline: 'Reporting of Setting in Psychedelic Clinical Trials',
  url,
  lang: 'en',
  accent: '#3F6F6B',
  affiliation:
    'The ReSPCT Guidelines are a project of the Psychedelics & Contemplation Lab, McGill University and the Lady Davis Institute for Medical Research, Jewish General Hospital, Montréal.',
  base: '/respct-guidelines-website',           // github.io path during testing
  previewUrl: 'https://the-psychedelics-and-contemplation-lab.github.io',
  footerLinks: [],              // filled in below, once the base is known
  ogImage: `${url}/images/og-image.jpg`,
  ogImageAlt:
    'Watercolour illustration of psilocybin mushrooms; inside the cap of the largest one, two people recline in a warmly lit room with speakers and cushions. Illustration by Natasha Wigoder.',
  organizationSchema: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'The ReSPCT Guidelines',
    alternateName: 'Reporting of Setting in Psychedelic Clinical Trials',
    url,
    logo: `${url}/images/respct_site_logo.png`,
    description:
      'International Delphi consensus guidelines for reporting setting in psychedelic clinical trials: 30 items in four sections, with an explanatory document and a printable checklist.',
    parentOrganization: {
      '@type': 'ResearchOrganization',
      name: 'Psychedelics & Contemplation Lab',
      url: 'https://psychedelicsandcontemplationlab.com',
      parentOrganization: [
        { '@type': 'CollegeOrUniversity', name: 'McGill University', url: 'https://www.mcgill.ca/' },
        { '@type': 'ResearchOrganization', name: 'Lady Davis Institute for Medical Research', url: 'https://www.ladydavis.ca/' },
      ],
    },
    subjectOf: {
      '@type': 'ScholarlyArticle',
      headline: 'An international Delphi consensus for reporting of setting in psychedelic clinical trials',
      author: [
        { '@type': 'Person', name: 'Chloé Pronovost-Morgan' },
        { '@type': 'Person', name: 'Kyle T. Greenway' },
        { '@type': 'Person', name: 'Leor Roseman' },
        { '@type': 'Organization', name: 'The ReSPCT Experts' },
      ],
      isPartOf: { '@type': 'Periodical', name: 'Nature Medicine' },
      datePublished: '2025',
      identifier: 'https://doi.org/10.1038/s41591-025-03685-9',
      sameAs: 'https://doi.org/10.1038/s41591-025-03685-9',
      url: 'https://www.nature.com/articles/s41591-025-03685-9',
    },
  },
};

site.footerLinks = [
  { label: 'The ReSPCT Guidelines', href: `${site.base}/the-respct-guidelines/` },
  { label: 'Explanatory document', href: `${site.base}/the-explanatory-document/` },
  { label: 'Printable checklist (PDF)', href: `${site.base}/pdf/respct_fillable_checklist.pdf` },
  { label: 'Original article (Nature Medicine)', href: 'https://www.nature.com/articles/s41591-025-03685-9', external: true },
  { label: 'Contact', href: `${site.base}/contact/` },
];

/** The paper the guidelines come from — reused on every page. */
export const citation = {
  authors: 'Pronovost-Morgan C, Greenway KT, Roseman L & The ReSPCT Experts',
  title: 'An international Delphi consensus for reporting of setting in psychedelic clinical trials',
  journal: 'Nature Medicine',
  year: '2025',
  doi: '10.1038/s41591-025-03685-9',
  url: 'https://www.nature.com/articles/s41591-025-03685-9',
};

export const pdfs = {
  explanatory: '/pdf/respct_explanatory_document.pdf',
  checklist: '/pdf/respct_fillable_checklist.pdf',
};

/** Main navigation — same URLs as the old WordPress site so inbound links keep working. */
export const navItems = [
  { label: 'Home', path: '/' },
  { label: 'The ReSPCT Guidelines', path: '/the-respct-guidelines/' },
  { label: 'Explanatory Document', path: '/the-explanatory-document/' },
  { label: 'Contact', path: '/contact/' },
];

export const nav = navItems.map((n) => ({ label: n.label, href: `${site.base}${n.path}` }));

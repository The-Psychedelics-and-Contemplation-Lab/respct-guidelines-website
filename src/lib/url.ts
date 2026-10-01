import { site, nav } from '../site.config';

/** Prefix an internal path with the site's base (/repo on github.io, "" on the custom domain). */
export const u = (p: string) => import.meta.env.BASE_URL.replace(/\/$/, '') + p;

/** Strip the configured base from an href so it can be re-prefixed with the live BASE_URL. */
const strip = (href: string) => (href.startsWith(site.base + '/') ? href.slice(site.base.length) : href);

/** Navigation with the current page marked, hrefs rebuilt from the live BASE_URL. */
export const navFor = (path: string) =>
  nav.map((n) => {
    const p = strip(n.href);
    return { label: n.label, href: u(p), current: p === path };
  });

/** The site config with footer links rebuilt from the live BASE_URL. */
export const siteConfig = {
  ...site,
  footerLinks: (site.footerLinks ?? []).map((l) => (l.external ? l : { ...l, href: u(strip(l.href)) })),
};

#!/usr/bin/env python3
"""Migration checks for the ReSPCT site: word counts source vs built (same method),
the 31 anchors of the explanatory document, the 30 table links, PDFs and image sizes."""
import re, html, json, os, sys
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = sys.argv[1] if len(sys.argv) > 1 else '/home/claude/sources/respct/respct-guidelines.WordPress.xml'
NS = {'content': 'http://purl.org/rss/1.0/modules/content/', 'wp': 'http://wordpress.org/export/1.2/'}

def words(fragment: str) -> int:
    """Strip comments and tags, unescape entities, split on whitespace; a token counts
    as a word when it contains a letter or a digit (so a stray ':' left by a stripped
    <u>…</u>: tag is not a word)."""
    s = re.sub(r'<!--.*?-->', ' ', fragment, flags=re.S)
    s = re.sub(r'<script.*?</script>|<style.*?</style>', ' ', s, flags=re.S)
    s = re.sub(r'<[^>]+>', ' ', s)
    s = html.unescape(s).replace('\xa0', ' ')
    return sum(1 for t in s.split() if re.search(r'[^\W_]', t))

src = {}
for it in ET.parse(SRC).getroot().iter('item'):
    if it.findtext('wp:post_type', namespaces=NS) == 'page':
        src[it.findtext('wp:post_name', namespaces=NS)] = it.findtext('content:encoded', namespaces=NS) or ''

pages = {'home': 'index.html', 'the-respct-guidelines': 'the-respct-guidelines/index.html',
         'the-explanatory-document': 'the-explanatory-document/index.html', 'contact': 'contact/index.html'}
built = {}
for k, p in pages.items():
    h = open(os.path.join(ROOT, 'dist', p), encoding='utf-8').read()
    built[k] = re.search(r'<main\b.*?</main>', h, flags=re.S).group(0)
    built[k + ':full'] = h

ok = True
report = {}
print('Word counts (source content:encoded vs built <main>, tags stripped, whitespace split):')
for k in pages:
    a, b = words(src[k]), words(built[k]); report[k] = (a, b)
    print(f'  {k:28s} source {a:6d}   built {b:6d}   diff {b - a:+d}')
a, b = report['the-explanatory-document']
if abs(b - a) > 10:
    ok = False; print('  ✗ explanatory document differs by more than 10 words')

doc = built['the-explanatory-document']
ids = set(re.findall(r'\sid="([^"]+)"', doc))
links = set(re.findall(r'href="#([^"]+)"', doc))
need = [f'item{i}' for i in range(1, 31)] + ['References']
print('\nAnchors in the built explanatory document (id present / linked from the table of contents):')
for n in need:
    a_ok, l_ok = n in ids, n in links
    ok &= a_ok and l_ok
    print(f'  #{n:10s} id {"yes" if a_ok else "NO "}   toc link {"yes" if l_ok else "NO "}')

table = built['the-respct-guidelines']
hrefs = re.findall(r'href="([^"]*?/the-explanatory-document/#item(\d+))"', table)
print('\nTable links to the explanatory document:')
seen = {}
for h, n in hrefs:
    seen[int(n)] = h
for i in range(1, 31):
    h = seen.get(i)
    good = h is not None and f'item{i}' in ids
    ok &= good
    print(f'  item {i:2d}: {h or "MISSING"}  → {"resolves" if good else "BROKEN"}')
rows = len(re.findall(r'<tr\b', table)) - 1
print(f'  body rows: {rows} (expected 34), item links: {len(seen)} (expected 30)')
ok &= rows == 34 and len(seen) == 30

print('\nPDFs:')
for p in ['pdf/respct_explanatory_document.pdf', 'pdf/respct_fillable_checklist.pdf']:
    f = os.path.join(ROOT, 'dist', p); e = os.path.exists(f)
    ok &= e
    print(f'  {p}: {"present" if e else "MISSING"} {os.path.getsize(f) if e else 0:,} bytes; linked from built pages: {sum(p in built[k] for k in pages)}')

print('\nImages (public/images):')
for f in sorted(os.listdir(os.path.join(ROOT, 'public/images'))):
    sz = os.path.getsize(os.path.join(ROOT, 'public/images', f))
    flag = '' if sz <= 1_000_000 else '  ✗ > 1 MB'
    ok &= sz <= 1_000_000
    print(f'  {f:40s} {sz:>9,} bytes{flag}')

print('\nRESULT:', 'OK' if ok else 'PROBLEMS FOUND')
sys.exit(0 if ok else 1)

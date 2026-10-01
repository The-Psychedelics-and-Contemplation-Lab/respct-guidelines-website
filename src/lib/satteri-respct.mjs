// Sätteri hast plugin for the Markdown content:
//  - "Item 12: …" headings get id="item12" and the References heading id="References",
//    so the anchors of the old site (and the links of the 30-item table) keep working;
//  - outbound links get target="_blank" rel="noopener noreferrer" (the ↗ icon is automatic).
export default function respctMarkdown() {
  return {
    name: 'respct-markdown',
    element: {
      filter: ['h2', 'h3', 'h4', 'a'],
      visit(node, ctx) {
        if (node.tagName === 'a') {
          const href = String(node.properties?.href ?? '');
          if (/^https?:\/\//.test(href)) {
            ctx.setProperty(node, 'target', '_blank');
            ctx.setProperty(node, 'rel', 'noopener noreferrer');
          }
          return;
        }
        const t = ctx.textContent(node).trim();
        const m = /^Item (\d+):/.exec(t);
        if (m) ctx.setProperty(node, 'id', `item${m[1]}`);
        else if (t === 'References') ctx.setProperty(node, 'id', 'References');
      },
    },
  };
}

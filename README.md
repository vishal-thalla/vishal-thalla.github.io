# vishal-thalla.github.io

Personal portfolio of Vishal Thalla, live at **https://vishal-thalla.github.io**.

Plain HTML, CSS and a little vanilla JavaScript. No build step, no frameworks, no external fonts, no trackers.

| File | Purpose |
| --- | --- |
| `index.html` | All content and metadata (Open Graph, inline SVG favicon) |
| `styles.css` | Design tokens, layout, light/dark via `prefers-color-scheme` |
| `script.js` | Optional enhancements: footer year, illustrative indicator grid, copy-email button, active nav link |
| `.nojekyll` | Serve files as-is on GitHub Pages |

## Run locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

Push to the `main` branch of `vishal-thalla/vishal-thalla.github.io`; GitHub Pages serves the repository root.

## Updating


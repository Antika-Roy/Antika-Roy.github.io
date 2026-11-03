# Antika Roy — portfolio

Source for **https://antika-roy.github.io**: a fast, static, dependency-free portfolio (HTML + CSS + vanilla JS) for GenAI, Agentic AI, LLM/VLM and foundation-model roles.

## Deploy to GitHub Pages

The repo is named `Antika-Roy.github.io`, so GitHub Pages serves it at the root URL automatically.

1. **Back up the old site** (optional): on GitHub, create a branch named `old-site` from `master`.
2. **Replace the files**: delete the old `index.html`, `assets/` and `images/` folders, then copy everything from this folder into the repo root.
   ```bash
   git clone https://github.com/Antika-Roy/Antika-Roy.github.io.git
   cd Antika-Roy.github.io
   git rm -r -q .                # remove the old site (it stays in history)
   # copy the new files in here (index.html, assets/, README.md, .nojekyll)
   git add -A
   git commit -m "New portfolio: GenAI / agentic AI research focus"
   git push
   ```
   No terminal? Use **Add file → Upload files** on GitHub and drag in the contents of this folder.
3. **Check Pages settings**: *Settings → Pages → Build and deployment → Source: Deploy from a branch*, branch `master` (or `main`), folder `/ (root)`.
4. Wait 1–2 minutes, then open https://antika-roy.github.io (hard-refresh with Ctrl/Cmd+Shift+R).

## Updating content

Everything you'd want to change lives in **`assets/js/data.js`**:

| What | Where in `data.js` |
|---|---|
| Citations, h-index, i10-index | `scholar: { citations, hIndex, i10Index, asOf }`, copied from your Google Scholar profile. While empty, the site links to Scholar instead. |
| New paper | Add an object to `publications` (`first: true` for first author, `new: true` while it isn't on Scholar yet, `award: "…"` for awards). The charts and counts update automatically. |
| Headline projects | `featured` |
| Jobs, education, patents, skills | `experience`, `education`, `recognition`, `skills` |
| Resume | Replace `assets/docs/Antika_Roy_Resume.pdf` (keep the filename) |
| Photo | Replace `assets/img/antika.jpg` (square, ~640 px) |

Theme colours are listed in `themes`; each paper's first theme sets its colour in the by-year chart.

## Preview locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Structure

```
index.html              page skeleton
assets/css/style.css    all styles (light theme, responsive, reduced-motion aware)
assets/js/data.js       ALL content
assets/js/main.js       rendering, publication filters, charts, hero X-ray animation
assets/img/             photo + favicon
assets/docs/            resume PDF
.nojekyll               tells GitHub Pages to serve files as-is
```

(function () {
  "use strict";
  const S = window.SITE;
  const $ = (sel, root = document) => root.querySelector(sel);
  const el = (tag, attrs = {}, html = "") => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) if (v != null) n.setAttribute(k, v);
    if (html) n.innerHTML = html;
    return n;
  };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- simple bindings ---------- */
  document.querySelectorAll("[data-bind]").forEach((n) => (n.textContent = S[n.dataset.bind]));
  document.querySelectorAll("[data-link]").forEach((n) => {
    const key = n.dataset.link;
    n.href = key === "email" ? "mailto:" + S.links.email : S.links[key];
  });
  $('[data-list="focus"]').append(...S.focus.map((f) => el("li", {}, esc(f))));
  $('[data-list="confs"]').append(...S.conferences.map((c) => el("li", { title: c.note }, esc(c.name))));
  $("#year").textContent = new Date().getFullYear();

  /* ---------- featured ---------- */
  const featured = $("#featured");
  S.featured.forEach((f) => {
    const theme = S.themes[f.theme];
    const award = /award|best/i.test(f.venue);
    const li = el("li", { class: "feat" + (award ? " is-award" : "") });
    li.innerHTML = `
      <div>
        <h3><a href="${esc(f.link)}" target="_blank" rel="noopener">${esc(f.title)}</a></h3>
        <p class="venue"><i class="theme-mark" style="background:${theme.color}" title="${esc(theme.label)}"></i>${esc(f.venue)}</p>
      </div>
      <p class="summary">${esc(f.summary)}</p>
      <div>
        <p class="result">${esc(f.result)}</p>
        <ul class="stack">${f.stack.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
      </div>`;
    featured.append(li);
  });

  /* ---------- research record ---------- */
  const pubs = S.publications;
  const firstCount = pubs.filter((p) => p.first).length;
  const recent = pubs.filter((p) => p.year >= new Date().getFullYear() - 1).length;
  const sc = S.scholar;
  const figs = [
    [S.totals.peerReviewed, "peer-reviewed papers"],
    [firstCount, "first-author papers listed here"],
    [recent, "papers in the last two years"],
    [S.totals.patents + S.totals.techLicenses, `patents filed + tech license`],
  ];
  if (sc.citations != null) figs.push([sc.citations, "citations on Google Scholar"]);
  if (sc.hIndex != null) figs.push([sc.hIndex, "h-index"]);
  if (sc.i10Index != null) figs.push([sc.i10Index, "i10-index"]);
  const figuresEl = $("#figures");
  figs.forEach(([v, label]) => {
    const d = el("div");
    d.append(el("dt", {}, esc(label)), el("dd", {}, esc(v)));
    figuresEl.append(d);
  });
  if (sc.citations == null) {
    const d = el("div");
    d.append(el("dt", {}, `<a href="${esc(S.links.scholar)}" target="_blank" rel="noopener">Live citation counts on Google Scholar</a>`), el("dd", {}, "↗"));
    figuresEl.append(d);
  }
  $("#record-note").textContent =
    `${pubs.length} papers are listed below, spanning ${Math.min(...pubs.map((p) => p.year))}–${Math.max(...pubs.map((p) => p.year))}` +
    (sc.asOf ? `. Citation figures from Google Scholar, ${sc.asOf}.` : ".");

  // stacked bars by year and primary theme
  const years = [...new Set(pubs.map((p) => p.year))].sort();
  const themeKeys = Object.keys(S.themes);
  const byYear = years.map((y) => {
    const counts = Object.fromEntries(themeKeys.map((k) => [k, 0]));
    pubs.filter((p) => p.year === y).forEach((p) => counts[p.themes[0]]++);
    return { y, counts, total: Object.values(counts).reduce((a, b) => a + b, 0) };
  });
  const max = Math.max(...byYear.map((b) => b.total));
  const bars = $("#chart-years");
  byYear.forEach((b) => {
    const bar = el("div", { class: "bar", role: "img", "aria-label": `${b.y}: ${b.total} papers` });
    bar.append(el("span", { class: "yr" }, b.y));
    themeKeys.forEach((k) => {
      if (!b.counts[k]) return;
      bar.append(el("span", { class: "seg", style: `height:${(b.counts[k] / max) * 85}%;background:${S.themes[k].color}`, title: `${S.themes[k].label}: ${b.counts[k]}` }));
    });
    bar.append(el("span", { class: "n" }, b.total));
    bars.append(bar);
  });
  $("#chart-legend").append(...themeKeys.map((k) => el("li", {}, `<i style="background:${S.themes[k].color}"></i>${esc(S.themes[k].label)}`)));

  // venues
  const venueGroup = (v) => {
    if (/SPIE/i.test(v)) return "SPIE (Lithography, Optics + Photonics)";
    if (/ECTC/i.test(v)) return "IEEE ECTC";
    if (/MICCAI/i.test(v)) return "MICCAI";
    if (/ISTFA/i.test(v)) return "ISTFA";
    if (/Microscopy/i.test(v)) return "Microscopy and Microanalysis";
    if (/ACM|Journal/i.test(v)) return "ACM & medical journals";
    return "Other venues & preprints";
  };
  const vc = {};
  pubs.forEach((p) => (vc[venueGroup(p.venue)] = (vc[venueGroup(p.venue)] || 0) + 1));
  const vmax = Math.max(...Object.values(vc));
  $("#chart-venues").append(
    ...Object.entries(vc)
      .sort((a, b) => b[1] - a[1])
      .map(([v, n]) => el("li", {}, `<span>${esc(v)}</span><b>${n}</b><span class="track"><span class="fill" style="width:${(n / vmax) * 100}%"></span></span>`))
  );

  /* ---------- publications ---------- */
  const state = { theme: "all", q: "", first: false };
  const filters = $("#filters");
  const mkFilter = (key, label, color) => {
    const b = el("button", { type: "button", "aria-pressed": String(key === "all"), "data-theme": key }, (color ? `<i style="background:${color}"></i>` : "") + esc(label));
    b.addEventListener("click", () => {
      state.theme = key;
      filters.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      renderPubs();
    });
    filters.append(b);
  };
  mkFilter("all", "All");
  themeKeys.forEach((k) => mkFilter(k, S.themes[k].label, S.themes[k].color));
  $("#pub-search").addEventListener("input", (e) => { state.q = e.target.value.trim().toLowerCase(); renderPubs(); });
  $("#first-only").addEventListener("change", (e) => { state.first = e.target.checked; renderPubs(); });

  const boldMe = (a) => esc(a).replace(/(A\. Roy)/g, "<strong>$1</strong>");
  function renderPubs() {
    const list = $("#pub-list");
    list.innerHTML = "";
    const shown = pubs.filter((p) =>
      (state.theme === "all" || p.themes.includes(state.theme)) &&
      (!state.first || p.first) &&
      (!state.q || (p.title + " " + p.venue + " " + p.authors).toLowerCase().includes(state.q))
    );
    $("#pub-count").textContent = `Showing ${shown.length} of ${pubs.length} papers`;
    if (!shown.length) {
      list.append(el("p", { class: "empty" }, "No papers match. Clear the search or pick another theme."));
      return;
    }
    [...new Set(shown.map((p) => p.year))].sort((a, b) => b - a).forEach((y) => {
      const block = el("section", { class: "pub-year" });
      block.append(el("h3", {}, y));
      const ol = el("ol");
      shown.filter((p) => p.year === y).forEach((p) => {
        const title = p.link ? `<a href="${esc(p.link)}" target="_blank" rel="noopener">${esc(p.title)}</a>`
          : `<a href="https://scholar.google.com/scholar?q=${encodeURIComponent(p.title)}" target="_blank" rel="noopener">${esc(p.title)}</a>`;
        const chips = [
          p.award ? `<span class="chip chip-award">${esc(p.award)}</span>` : "",
          p.first ? `<span class="chip chip-first">First author</span>` : "",
          p.new ? `<span class="chip chip-new">new</span>` : "",
          ...p.themes.map((t) => `<span class="chip"><i style="background:${S.themes[t].color}"></i>${esc(S.themes[t].label)}</span>`),
        ].join("");
        ol.append(el("li", { class: "pub" + (p.first ? " is-first" : "") }, `
          <p class="pub-title">${title}</p>
          <p class="pub-meta">${boldMe(p.authors)}. <span class="venue">${esc(p.venue)}</span>, ${p.year}. ${esc(p.type)}.</p>
          <div class="pub-tags">${chips}</div>`));
      });
      block.append(ol);
      list.append(block);
    });
  }
  renderPubs();

  /* ---------- experience / education / recognition / skills ---------- */
  $("#experience-list").append(...S.experience.map((x) => el("li", {}, `
    <p class="when">${esc(x.when)}</p><h3>${esc(x.title)}</h3><p class="org">${esc(x.org)}</p>
    <ul>${x.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>`)));
  $("#education-list").append(...S.education.map((e) => el("li", {}, `<b>${esc(e.degree)}</b><span>${esc(e.school)}, ${esc(e.when)}. GPA ${esc(e.gpa)}</span>`)));
  $("#recognition-list").append(...S.recognition.map((r) => el("li", { class: r.kind === "Award" ? "is-award" : "" }, `<span class="kind">${esc(r.kind)}</span><b>${esc(r.title)}</b><span>${esc(r.detail)}</span>`)));
  $("#skills-list").append(...S.skills.map((g, i) => el("div", { class: i === 0 ? "group-genai" : "" }, `<h3>${esc(g.group)}</h3><ul>${g.items.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>`)));

  /* ---------- hero: X-ray inspection viewer ---------- */
  const canvas = $("#scan");
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

  const cols = 11, rows = 7, pitch = 50, r0 = 15;
  const ox = (W - (cols - 1) * pitch) / 2, oy = (H - (rows - 1) * pitch) / 2;
  const balls = [];
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    balls.push({ i, j, x: ox + i * pitch + (rnd() - 0.5) * 1.6, y: oy + j * pitch + (rnd() - 0.5) * 1.6, r: r0 + (rnd() - 0.5) * 1.4, voids: [] });
  }
  const at = (i, j) => balls[j * cols + i];
  const rowName = "ABCDEFG";
  const flags = [
    { b: at(6, 3), kind: "void", label: "D7 · void 18%", big: true },
    { b: at(2, 1), kind: "void", label: "B3 · void 6%" },
    { b: at(8, 5), kind: "void", label: "F9 · void 4%" },
  ];
  flags[0].b.voids = [{ dx: 3, dy: -2, r: 6.4 }];
  flags[1].b.voids = [{ dx: -3, dy: 3, r: 3.6 }];
  flags[2].b.voids = [{ dx: 2, dy: 3, r: 3.0 }];
  const bridge = { a: at(3, 6), b: at(4, 6), label: "G4–G5 · bridge" };

  // offscreen: the radiograph
  const film = document.createElement("canvas");
  film.width = W; film.height = H;
  const f = film.getContext("2d");
  f.fillStyle = "#0F1C2E"; f.fillRect(0, 0, W, H);
  // substrate traces
  f.strokeStyle = "rgba(120,160,200,0.10)"; f.lineWidth = 3;
  for (let k = 0; k < 26; k++) {
    const b = balls[Math.floor(rnd() * balls.length)];
    f.beginPath(); f.moveTo(b.x, b.y);
    const dir = rnd() < 0.5 ? 1 : -1;
    const mid = b.x + dir * (40 + rnd() * 120);
    f.lineTo(mid, b.y); f.lineTo(mid + dir * 30, b.y + (rnd() < 0.5 ? 30 : -30)); f.lineTo(dir > 0 ? W : 0, b.y + (rnd() - 0.5) * 60);
    f.stroke();
  }
  // die outline
  f.strokeStyle = "rgba(160,190,220,0.14)"; f.lineWidth = 1.5;
  f.strokeRect(ox - 34, oy - 34, (cols - 1) * pitch + 68, (rows - 1) * pitch + 68);
  // bridge
  f.fillStyle = "rgba(225,235,245,0.75)";
  f.beginPath(); f.ellipse((bridge.a.x + bridge.b.x) / 2, bridge.a.y + 1, 22, 6, 0, 0, Math.PI * 2); f.fill();
  // balls
  balls.forEach((b) => {
    const g = f.createRadialGradient(b.x - 4, b.y - 4, 2, b.x, b.y, b.r);
    g.addColorStop(0, "rgba(246,250,255,0.96)"); g.addColorStop(0.7, "rgba(200,215,232,0.85)"); g.addColorStop(1, "rgba(120,145,175,0.35)");
    f.fillStyle = g; f.beginPath(); f.arc(b.x, b.y, b.r, 0, Math.PI * 2); f.fill();
    b.voids.forEach((v) => {
      const vg = f.createRadialGradient(b.x + v.dx, b.y + v.dy, 0, b.x + v.dx, b.y + v.dy, v.r);
      vg.addColorStop(0, "rgba(40,60,90,0.95)"); vg.addColorStop(1, "rgba(90,115,145,0.6)");
      f.fillStyle = vg; f.beginPath(); f.arc(b.x + v.dx, b.y + v.dy, v.r, 0, Math.PI * 2); f.fill();
    });
  });
  // grain
  const img = f.getImageData(0, 0, W, H);
  for (let k = 0; k < img.data.length; k += 4) { const n = (rnd() - 0.5) * 16; img.data[k] += n; img.data[k + 1] += n; img.data[k + 2] += n; }
  f.putImageData(img, 0, 0);

  const AMBER = "#E8A33D", CYAN = "#5BB8D6";
  function box(x, y, w, h, color, label, alpha) {
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.strokeRect(x, y, w, h);
    ctx.font = "500 12px 'IBM Plex Mono', monospace";
    const tw = ctx.measureText(label).width + 10;
    const ly = y - 20 < 4 ? y + h + 2 : y - 20;
    ctx.fillStyle = color; ctx.fillRect(x, ly, tw, 18);
    ctx.fillStyle = "#0F1C2E"; ctx.fillText(label, x + 5, ly + 13);
    ctx.globalAlpha = 1;
  }
  function draw(scanX, boxT) {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#0F1C2E"; ctx.fillRect(0, 0, W, H);
    ctx.drawImage(film, 0, 0, scanX, H, 0, 0, scanX, H);
    if (scanX < W) {
      const g = ctx.createLinearGradient(scanX - 40, 0, scanX, 0);
      g.addColorStop(0, "rgba(91,184,214,0)"); g.addColorStop(1, "rgba(91,184,214,0.35)");
      ctx.fillStyle = g; ctx.fillRect(scanX - 40, 0, 40, H);
      ctx.fillStyle = CYAN; ctx.fillRect(scanX - 1, 0, 2, H);
    }
    flags.forEach((fl, k) => {
      const t = Math.max(0, Math.min(1, boxT * 4 - k));
      if (t > 0) { const s = fl.b.r + 6; box(fl.b.x - s, fl.b.y - s, s * 2, s * 2, AMBER, fl.label, t); }
    });
    const tb = Math.max(0, Math.min(1, boxT * 4 - 3));
    if (tb > 0) box(bridge.a.x - 22, bridge.a.y - 22, bridge.b.x - bridge.a.x + 44, 44, CYAN, bridge.label, tb);
  }

  const answer = "3 voids and 1 solder bridge. D7's void covers about 18% of the ball, above the 15% acceptance limit, so send it for rework. B3 and F9 are within spec. The bridge shorts G4 to G5; confirm with a cross-section before reflow.";
  const out = $("#answer");

  if (reduceMotion) {
    draw(W, 1); out.textContent = answer; return;
  }
  const t0 = performance.now(), SCAN = 2200, BOX = 1200;
  let typed = 0, typingStarted = false;
  function frame(now) {
    const t = now - t0;
    const scanX = Math.min(W, (t / SCAN) * W);
    const boxT = Math.max(0, Math.min(1, (t - SCAN) / BOX));
    draw(scanX, boxT);
    if (t > SCAN + BOX * 0.6 && !typingStarted) { typingStarted = true; type(); }
    if (t < SCAN + BOX + 50) requestAnimationFrame(frame);
  }
  function type() {
    typed += 2; out.textContent = answer.slice(0, typed);
    if (typed < answer.length) setTimeout(type, 22);
  }
  requestAnimationFrame(frame);
})();

import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
  headless: "new",
  defaultViewport: { width: 1440, height: 900 },
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});

async function run(url, width, height, scrolls = []) {
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 3200));

  const data = await page.evaluate((scrolls) => {
    const out = {};
    const de = document.documentElement;

    // overflow culprits
    const over = [];
    for (const el of document.querySelectorAll("body *")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (r.right > de.clientWidth + 1 || r.left < -1) {
        if (el.tagName === "SVG" || el.tagName === "svg") continue;
        const cs = getComputedStyle(el);
        if (cs.position === "fixed") continue;
        over.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className?.toString?.() || "").slice(0, 60),
          text: (el.textContent || "").trim().slice(0, 24),
          left: Math.round(r.left),
          right: Math.round(r.right),
        });
      }
    }
    out.overflows = over.slice(0, 12);

    // hero metrics
    const hero = document.querySelector("h1");
    if (hero) {
      const cs = getComputedStyle(hero);
      const r = hero.getBoundingClientRect();
      out.hero = {
        fontSize: cs.fontSize,
        letterSpacing: cs.letterSpacing,
        lineHeight: cs.lineHeight,
        fontWeight: cs.fontWeight,
        fontFamily: cs.fontFamily.split(",")[0],
        box: { w: Math.round(r.width), h: Math.round(r.height) },
        color: cs.color,
        text: hero.textContent.replace(/\s+/g, " ").trim().slice(0, 60),
      };
      // widest line child
      let widest = null;
      hero.querySelectorAll("[data-word]").forEach((w) => {
        const wr = w.getBoundingClientRect();
        if (!widest || wr.width > widest.w) {
          widest = { text: w.textContent, w: Math.round(wr.width), fs: getComputedStyle(w).fontSize };
        }
      });
      out.heroWidest = widest;
    }

    // section background sequence
    out.sections = [...document.querySelectorAll("section, footer, header, main > *")].slice(0, 20).map((s) => {
      const cs = getComputedStyle(s);
      const r = s.getBoundingClientRect();
      return {
        tag: s.tagName.toLowerCase(),
        bg: cs.backgroundColor,
        color: cs.color,
        top: Math.round(r.top + window.scrollY),
        h: Math.round(r.height),
        label: (s.getAttribute("aria-label") || s.className?.toString?.().slice(0, 40) || ""),
      };
    });

    // nav
    const nav = document.querySelector("header nav");
    if (nav) {
      const nr = nav.getBoundingClientRect();
      out.nav = { top: Math.round(nr.top), h: Math.round(nr.height), bg: getComputedStyle(document.querySelector("header")).backgroundColor };
    }

    // text sizes across page
    const sizes = {};
    document.querySelectorAll("h1,h2,h3,p,span,li,a").forEach((el) => {
      if (!el.textContent?.trim()) return;
      const fs = parseFloat(getComputedStyle(el).fontSize);
      const tag = el.tagName.toLowerCase();
      sizes[tag] = Math.max(sizes[tag] || 0, fs);
    });
    out.sizes = sizes;

    out.scrollH = de.scrollHeight;
    out.sectionsScrolled = scrolls;
    return out;
  }, scrolls);

  await page.close();
  return data;
}

console.log("=== HOME 1440 ===");
console.log(JSON.stringify(await run("http://localhost:3000/", 1440, 900), null, 1));
console.log("=== HOME 320 ===");
console.log(JSON.stringify(await run("http://localhost:3000/", 320, 700), null, 1));
console.log("=== SENTINEL 320 ===");
console.log(JSON.stringify(await run("http://localhost:3000/work/sentinel", 320, 700), null, 1));
console.log("=== SENTINEL 1440 ===");
console.log(JSON.stringify(await run("http://localhost:3000/work/sentinel", 1440, 900), null, 1));

await browser.close();
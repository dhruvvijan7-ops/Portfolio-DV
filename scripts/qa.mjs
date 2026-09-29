import puppeteer from "puppeteer";
import { mkdirSync } from "node:fs";
import path from "node:path";

const OUT = "C:/Users/dhruv/AppData/Local/Temp/opencode/shots";
mkdirSync(OUT, { recursive: true });

const errors = [];

const browser = await puppeteer.launch({
  headless: "new",
  defaultViewport: { width: 1440, height: 900 },
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});

const viewports = [
  { name: "wide", width: 1920, height: 1080 },
  { name: "desktop", width: 1440, height: 900 },
  { name: "laptop", width: 1280, height: 800 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
  { name: "small", width: 320, height: 700 },
];

const pages = [
  { name: "home", url: "http://localhost:3000/" },
  { name: "work", url: "http://localhost:3000/work" },
  { name: "sentinel", url: "http://localhost:3000/work/sentinel" },
  { name: "about", url: "http://localhost:3000/about" },
  { name: "contact", url: "http://localhost:3000/contact" },
];

for (const vp of viewports) {
  for (const pg of pages) {
    const page = await browser.newPage();
    await page.setViewport(vp);
    const consoleErrs = [];
    page.on("console", (m) => m.type() === "error" && consoleErrs.push(m.text()));
    page.on("pageerror", (e) => consoleErrs.push(`PAGEERROR: ${e.message}`));

    try {
      await page.goto(pg.url, { waitUntil: "networkidle0", timeout: 60000 });
      if (pg.name === "home") {
        await page.waitForFunction(
          () => !document.querySelector("[aria-hidden='true'].fixed") || window.__INTRODONE,
          { timeout: 6000 }
        ).catch(() => {});
        await new Promise((r) => setTimeout(r, 2600));
      } else {
        await new Promise((r) => setTimeout(r, 600));
      }

      const jitter = await page.evaluate(() => {
        const de = document.documentElement;
        return {
          scrollW: de.scrollWidth,
          scrollH: de.scrollHeight,
          clientW: de.clientWidth,
          overflowX: de.scrollWidth > de.clientWidth + 1,
          bg: getComputedStyle(document.body).backgroundColor,
        };
      });

      await page.screenshot({
        path: path.join(OUT, `${pg.name}-${vp.name}-top.png`),
      });

      // Scroll a few frames down to exercise scroll-triggered sections.
      const steps = pg.name === "home" ? [0.5, 0.12, 0.3, 0.6, 0.85, 0.95] : [0.2, 0.5, 0.8];
      for (const f of steps) {
        await page.evaluate((frac) => {
          window.scrollTo(0, document.documentElement.scrollHeight * frac);
        }, f);
        await new Promise((r) => setTimeout(r, 120));
        await page.screenshot({
          path: path.join(OUT, `${pg.name}-${vp.name}-${Math.round(f * 100)}.png`),
        });
      }

      errors.push(`[${vp.name}] ${pg.url} | console errors: ${consoleErrs.length ? consoleErrs.join(" | ") : "none"} | overflowX: ${jitter.overflowX} (${jitter.scrollW}/${jitter.clientW})`);
    } catch (e) {
      errors.push(`[${vp.name}] ${pg.url} | FAILED: ${e.message}`);
    }
    await page.close();
  }
}

console.log(errors.join("\n"));
console.log("DONE");
await browser.close();
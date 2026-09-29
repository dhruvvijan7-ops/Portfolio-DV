import puppeteer from "puppeteer";
const browser = await puppeteer.launch({ headless: "new", defaultViewport: { width: 1440, height: 900 }, args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 3000));
await page.evaluate(() => window.scrollTo(0, 5600));
await new Promise((r) => setTimeout(r, 900));
const row = await page.$('a[href="/work/sentinel"]');
const box = await row.boundingBox();
await page.mouse.move(box.x + box.width / 2, box.y + 40);
await new Promise((r) => setTimeout(r, 700));
console.log(
  await page.evaluate(() => {
    const outer = document.querySelector("[data-qa='ring']");
    const scaleEl = outer.querySelector(".h-11");
    const label = outer.querySelector("[data-qa='label']");
    return {
      scaleTransform: getComputedStyle(scaleEl).transform,
      scaleInline: scaleEl.style.cssText,
      label: label.textContent,
      outerScale: getComputedStyle(outer).transform.replace(/translate\([^)]*\)/, ""),
    };
  })
);
await browser.close();
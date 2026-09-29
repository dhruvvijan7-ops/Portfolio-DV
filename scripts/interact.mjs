import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
  headless: "new",
  defaultViewport: { width: 1440, height: 900 },
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});

const report = {};

// ---- 1. Cursor + hero phase swap + row preview (desktop) ----
{
  const page = await browser.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push(e.message));
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 3200));

  report.hasCustomCursorClass = await page.evaluate(() =>
    document.documentElement.classList.contains("has-custom-cursor")
  );

  // hover a nav link -> cursor mode 'link' -> ring label should be empty, scale 1.35
  const link = await page.$('a[href="/about"]');
  await link.hover();
  await new Promise((r) => setTimeout(r, 200));
  report.navLinkHover = await page.evaluate(() => {
    const ringScale = document.querySelector("[data-qa='ring-scale']");
    const label = document.querySelector("[data-qa='label']");
    return { label: label?.textContent, scale: ringScale ? getComputedStyle(ringScale).transform.match(/matrix\(([\d.,\s]+)\)/)?.[1] : null };
  });

  // scroll to work section and hover a project row -> VIEW label + preview visible
  await page.evaluate(() => window.scrollTo(0, 5600));
  await new Promise((r) => setTimeout(r, 900));
  const row = await page.$('a[href="/work/sentinel"]');
  if (row) {
    const box = await row.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + 40);
    await new Promise((r) => setTimeout(r, 700));
    report.rowHover = await page.evaluate(() => {
      const preview = document.querySelector("[data-qa='preview']");
      const ringScale = document.querySelector("[data-qa='ring-scale']");
      const label = document.querySelector("[data-qa='label']");
      return {
        previewOpacity: preview ? getComputedStyle(preview).opacity : null,
        label: label?.textContent,
        ringScale: ringScale ? getComputedStyle(ringScale).transform : null,
      };
    });
  }

  // hero phase swap: scroll into hero middle
  await page.evaluate(() => window.scrollTo(0, 1500));
  await new Promise((r) => setTimeout(r, 800));
  report.heroPhaseMid = await page.evaluate(() => {
    const a = document.querySelector("[data-qa='blockA']");
    const b = document.querySelector("[data-qa='blockB']");
    return {
      aOpacity: a ? getComputedStyle(a).opacity : null,
      bOpacity: b ? getComputedStyle(b).opacity : null,
    };
  });

  await page.close();

  // ---- 2. Reduced motion ----
  const rm = await browser.createBrowserContext();
  const page2 = await rm.newPage();
  await page2.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page2.goto("http://localhost:3000/", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 2600));
  report.reducedMotion = await page2.evaluate(() => {
    const a = document.querySelector("[data-qa='blockA']");
    const b = document.querySelector("[data-qa='blockB']");
    const cursor = document.querySelectorAll("[data-qa='dot'], [data-qa='ring']").length;
    return {
      blockADisplay: a ? getComputedStyle(a).display : null,
      blockBDisplay: b ? getComputedStyle(b).display : null,
      cursorEls: cursor,
      customCursorClass: document.documentElement.classList.contains("has-custom-cursor"),
    };
  });
  await page2.evaluate(() => window.scrollTo(0, 1500));
  await new Promise((r) => setTimeout(r, 600));
  report.reducedMotionAfterScroll = await page2.evaluate(() => {
    const a = document.querySelector("[data-qa='blockA']");
    return { aOpacity: a ? getComputedStyle(a).opacity : null };
  });
  await page2.close();
  await rm.close();
}

// ---- 3. Mobile menu ----
{
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 3200));
  await page.click('button[aria-label="Open menu"]');
  await new Promise((r) => setTimeout(r, 700));
  report.mobileMenuOpen = await page.evaluate(() => {
    const overlay = [...document.querySelectorAll("div")].find((d) => d.textContent?.includes("MENU / INDEX"));
    return { found: !!overlay, opacity: overlay ? getComputedStyle(overlay).opacity : null };
  });
  await page.close();
}

console.log(JSON.stringify(report, null, 1));
await browser.close();
import puppeteer from "puppeteer";
const report = {};
const browser = await puppeteer.launch({ headless: "new", defaultViewport: { width: 1440, height: 900 }, args: ["--no-sandbox"] });

// sentinel stage progression
{
  const page = await browser.newPage();
  await page.goto("http://localhost:3000/work/sentinel", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 2200));

  const stageProbe = async (frac) => {
    return page.evaluate((f) => {
      window.scrollTo(0, document.documentElement.scrollHeight * f);
      return new Promise((res) =>
        setTimeout(() => {
          const stages = [...document.querySelectorAll("[data-scroll-stage]")].map((st) => ({
            t: st.textContent.trim(),
            op: getComputedStyle(st).opacity,
          }));
          res(stages);
        }, 250)
      );
    }, frac);
  };

  report.once = await stageProbe(0.16); // before scroll starts
  report.partial = await stageProbe(0.42); // mid pipeline
  report.early = await stageProbe(0.1);
  await page.close();
}

// contact h2 font + about h2
{
  const page = await browser.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 3200));
  report.fonts = await page.evaluate(() => {
    const blockA = document.querySelector("[data-qa='blockA']");
    const contactH2 = [...document.querySelectorAll("h2")].find((h) => h.textContent.includes("USEFUL"));
    const aboutH2 = [...document.querySelectorAll("h2")].find((h) => h.textContent.includes("THINK"));
    const a = (el) => (el ? getComputedStyle(el).fontSize + " / lh " + getComputedStyle(el).lineHeight + " / ls " + getComputedStyle(el).letterSpacing : null);
    return { blockA: a(blockA), contactH2: a(contactH2), aboutH2: a(aboutH2) };
  });
  await page.close();
}

console.log(JSON.stringify(report, null, 1));
await browser.close();
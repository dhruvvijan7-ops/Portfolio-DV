import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
  headless: "new",
  defaultViewport: { width: 320, height: 700 },
  args: ["--no-sandbox"],
});

const page = await browser.newPage();
await page.goto("http://localhost:3000/work/sentinel", { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 2000));

// Hide elements' parents progressively: disable each top-level section.
const res = await page.evaluate(() => {
  const out = { baseline: document.documentElement.scrollWidth };
  const mains = [...document.querySelectorAll("main > *")];
  out.sections = mains.map((m, i) => ({
    i,
    cls: m.className.toString().slice(0, 45),
    firstText: (m.textContent || "").trim().slice(0, 20),
  }));
  for (let i = 0; i < mains.length; i++) {
    mains[i].style.display = "none";
    out[`hide${i}`] = document.documentElement.scrollWidth;
    mains[i].style.display = "";
  }
  return out;
});
console.log(JSON.stringify(res, null, 1));
await browser.close();
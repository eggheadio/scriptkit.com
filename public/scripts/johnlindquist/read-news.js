// Menu: Read News
// Description: Scrape headlines from news.google.com then pick headline to read
// Author: John Lindquist
// Twitter: @johnlindquist

// Note: 'playwright' may take a while to install. If it feels like it times out, try again.
// A "progress indicator" is on my list of TODOs 😅
// Alternatively, run `~/.simple/bin/simple i playwright` to manually install
let {chromium} = await npm('playwright')

const browser = await chromium.launch()
const context = await browser.newContext()
const page = await context.newPage()
await page.goto('https://news.google.com')

const headlines = await page.evaluate(() =>
  Array.from(document.querySelectorAll('h3')).map((el) => ({
    name: el.innerText,
    value: el.firstChild.href,
  })),
)

await browser.close()

let value = await arg('What do you want to read?', headlines)

exec(`open ${value}`)

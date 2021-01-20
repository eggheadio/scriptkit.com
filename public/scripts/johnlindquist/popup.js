let {chromium} = await npm('playwright')

export let browser = await chromium.launch({
  headless: false,
  args: ['--force-app-mode'],
})
export let context = await browser.newContext()
export let page = await context.newPage()

let popupContent = `<h1>Hello</h1>`
let popupFile = path.join(env.SIMPLE_TMP_PATH, 'popup.html')
await writeFile(popupFile, popupContent)

page.goto('file://' + popupFile)

let {chromium} = await npm('playwright')
await npm('textfit')

let textfit = path.join(
  env.SIMPLE_PATH,
  'node_modules',
  'textfit',
  'textFit.js',
)

let font = 'Poppins'
let fontName = font.replaceAll(' ', '+')

let content = await readFile(await arg('Select a text file:'), 'utf8')

let image =
  'https://pbs.twimg.com/profile_images/1333172968730615813/qrKSUpTV_400x400.jpg'

let makeTemplate = async (quote) =>
  `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=${fontName}&display=swap" rel="stylesheet">

<style>
body{
    margin: 0; 
    padding:0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
}
.image{
  width: 100vh;
  height: 100vw;
  position: absolute;
  background-image: url("${await arg('Enter url to image:')}");
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
  filter: brightness(40%);
}

.resize{
    width: 90vw;
    height: 90vh;
    font-family: '${font}', sans-serif;
    color: #ffffff;
}
</style>

<div class="image"></div>
<div class="resize">${quote}</div>
<script src="${textfit}"></script>
<script>
setTimeout(()=> {
    textFit(document.querySelector('.resize'), {alignHoriz: true, alignVert: true, multiLine: true})
},500)

</script>
</body>
</html>
`.trim()

let wait = (time) =>
  new Promise((res) => {
    let id = setTimeout(res, time)
  })

let i = 0

let browser = await chromium.launch({
  headless: false,
})
let context = await browser.newContext()
let author = 'Jason Lengstorf'

let page = await context.newPage()
await page.setViewportSize({
  width: 540,
  height: 540,
})
let template = await makeTemplate(content)
let htmlPath = path.join(env.SIMPLE_TMP_PATH, author + '.html')

await writeFile(htmlPath, template)
await page.goto('file://' + htmlPath)
await wait(1000)
let screenshotPath = path.join(
  env.SIMPLE_PATH,
  'out',
  await arg('Enter screenshot name:'),
)
await page.screenshot({
  path: screenshotPath,

  // clip: {
  //   x: 20,
  //   y: 0,
  //   width: 520,
  //   height: 480,
  // },
})
edit(screenshotPath)

await browser.close()

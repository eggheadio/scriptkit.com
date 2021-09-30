import '@johnlindquist/kit'
await npm('is-npm')
let {chromium} = await npm('playwright')
await npm('textfit')

let textfit = kenvPath('node_modules', 'textfit', 'textFit.js')

let font = 'Open Sans'
let fontName = font.replace(/\s/g, '+')

let quote = `This is a pretty long block of text, so I'm not sure how this is all going to work out`

let image =
  'https://pbs.twimg.com/profile_images/1333172968730615813/qrKSUpTV_400x400.jpg'

let user = 'kentcdodds'

let template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    
</head>
<body>
<style>
    @font-face { font-family: SF-Pro; src: url('${fontUrl}'); } 
    .sfpro { font-family: sfpro; font-size: 4.2em; }
</style>
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
    background-image: url("${kenvPath('assets', 'card-background.png')}");
}

.resize{
    position: absolute;
    top: 158px;
    left: 70px;
    position: absolute;
    width: 580px;
    height: 280px;
    font-family: '${font}', sans-serif;
    color: #ffffff;
}
</style>

<div class="resize">${quote}</div>
<img src="${`https://github.com/${user}.png`}"/>
<script src="${textfit}"></script>
<script>
setTimeout(()=> {
    textFit(document.querySelector('.resize'), { multiLine: true})
},500)

</script>
</body>
</html>
`.trim()

let browser = await chromium.launch({
  headless: false,
})
let context = await browser.newContext()

let page = await context.newPage()
await page.setViewportSize({
  width: 1200,
  height: 627,
})
let htmlPath = tmpPath('og.html')

await writeFile(htmlPath, template)
await page.goto('file://' + htmlPath)
await wait(1000)
let screenshotPath = tmpPath('og.png')
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

export {}

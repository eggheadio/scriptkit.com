import {launchChromium} from 'playwright-aws-lambda'
import {NextApiRequest, NextApiResponse} from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    user,
    title,
    backgroundImage = `${process.env.NEXT_PUBLIC_VERCEL_URL}/card-background.png`,
  } = req.query
  const browser = await launchChromium()

  const context = await browser.newContext()
  const page = await context.newPage()
  page.setViewportSize({
    width: 1200,
    height: 630,
  })
  const fontUrl = process.env.NEXT_PUBLIC_VERCEL_URL + '/SF-Pro.ttf'

  const content = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<style>
    @font-face { font-family: SFPro; src: url('${fontUrl}'); } 
</style>
<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">

<style>
body{
    margin: 0; 
    padding:0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #ffffff;
    background-image: url("${backgroundImage}");
    font-family: "SFPro";
    border: 8px solid #FCD34D;
}

.resize{
    position: absolute;
    top: 158px;
    left: 75px;
    position: absolute;
    width: 560px;
    height: 260px;
    color: #ffffff;
}

.avatar{
    position: absolute;
    left: 75px;
    top: 474px;
    height: 100px
}

.created{
    position: absolute;
    left: 200px;
    top: 475px;
}

.author{
    position: absolute;
    left: 200px;
    top: 510px;
}

</style>

<div class="resize">${title}</div>
<img class="avatar rounded-full" src="${`https://github.com/${user}.png`}"/>
<div class="created text-gray-400 text-2xl">Created by</div>
<div class="author text-white text-4xl">${user}</div>
<script src="https://unpkg.com/textfit@2.4.0/textFit.js"></script>
<script>
    textFit(document.querySelector('.resize'), { multiLine: true})
</script>
</body>
</html>
`.trim()

  await page.setContent(content)

  //   await page.waitForTimeout(10000000)

  const screenshotBuffer = await page.screenshot()
  await browser.close()

  res.setHeader('Content-Type', 'image/png')
  res.setHeader('Content-Length', screenshotBuffer.length)
  res.statusCode = 200

  res.send(screenshotBuffer)
}

/**
 *   const decoded = screenshotBuffer
    .toString()
    .replace('data:image/png;base64,', '')

  const buf = Buffer.from(decoded)
  res.setHeader('Content-Type', 'image/png')
  res.setHeader('Content-Length', buf.length)

  res.statusCode = 200

  res.send(buf.toString('base64'))
 */

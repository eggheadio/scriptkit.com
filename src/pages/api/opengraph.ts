import {launchChromium} from 'playwright-aws-lambda'
import {NextApiRequest, NextApiResponse} from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    author,
    user,
    title,
    backgroundImage, // = `${process.env.NEXT_PUBLIC_VERCEL_URL}/card-background.png`,
  } = req.query
  const browser = await launchChromium()

  const context = await browser.newContext()
  const page = await context.newPage()
  page.setViewportSize({
    width: 1200,
    height: 630,
  })

  const logo = 'https://scriptkit.com/assets/kit-icon-1.png' // `${process.env.NEXT_PUBLIC_VERCEL_URL}/assets/kit-icon-1.png`

  console.log(logo)

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
    @font-face {
      font-family: 'Articulat';
      font-weight: 300;
      font-style: normal;
      src: url('${
        process.env.NEXT_PUBLIC_VERCEL_URL
      }/c4567470-4d4b-40ed-b1b9-1254ec7cc4b2.woff2') format('woff2'),
        url('${
          process.env.NEXT_PUBLIC_VERCEL_URL
        }/a84a9075-f8c5-4f4e-9fcd-70937ed6f0d7.woff') format('woff');
    }
</style>
<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">

<style>
body{
    margin: 0; 
    padding:0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1200px;
    height: 630px;
    background-color: #000;
    background-image: url("${backgroundImage}");
    font-family: "Articulat", sans-serif;
}

.resize{
    position: absolute;
    top: 135px;
    left: 100px;
    position: absolute;
    width: 700px;
    height: 130px;
    color: #ffffff;
    line-height: 1.1;
}

.avatar{
    // position: absolute;
    // left: 75px;
    // top: 474px;
}

.created{
    position: absolute;
    left: 200px;
    top: 475px;
}

.author{
    // position: absolute;
    // left: 200px;
    // top: 510px;
}

.logo{
  position: absolute;
  right: 100px;
  top: 100px;
}

</style>
<img src="${logo}" class="logo" />
<div class="resize">${title}</div>
${
  user &&
  `<div class="absolute left-24 bottom-24 flex items-center">
  <img width="80px" height="80px" class="avatar rounded-full" src="${`https://github.com/${user}.png`}"/>
<div class="pl-4 text-white text-3xl">${author ? author : user}</div>
</div>`
}

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

// Menu: Share Selected File
// Description: Select a file in Finder. Creates tunnel and copies link to clipboard.
// Author: John Lindquist
// Twitter: @johnlindquistt
// Background: true

let ngrok = await npm('ngrok')
let handler = await npm('serve-handler')
let cleanup = await npm('node-cleanup')
let http = await import('http')

//requires that a file is selected in Finder
let {getSelectedFile} = await kit('file')

let tmpPath = tmp()
let basePath = cwd()

cd(tmpPath)

let filePath = await getSelectedFile()

let symLink = _.last(filePath.split(path.sep)).replaceAll(' ', '-')
let symLinkPath = path.join(tmpPath, symLink)

echo(`Creating temporary symlink: ${symLinkPath}`)
ln(filePath, symLinkPath)

let port = 3033

const server = http.createServer(handler)

server.listen(port, async () => {
  let tunnel = await ngrok.connect(port)
  let shareLink = tunnel + '/' + symLink
  echo(chalk`{yellow ${shareLink}} copied to clipboard`)
  copy(shareLink)
})

cleanup(() => {
  server.close()
  if (test('-f', symLinkPath)) {
    echo(`Removing temporary symlink: ${symLinkPath}`)
    trash(symLinkPath)
  }
})

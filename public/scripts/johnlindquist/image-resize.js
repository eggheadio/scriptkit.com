// Menu: Resize an Image
// Description: Select an image in Finder before running this
// Author: John Lindquist
// Twitter: @johnlindquist
// Shortcut: opt i

let sharp = await npm('sharp')
let {getSelectedFile} = await kit('file')

let image = await getSelectedFile()

let width = Number(await arg('Enter width:'))

let metadata = await sharp(image).metadata()

let newHeight = Math.floor(metadata.height * (width / metadata.width))

let lastDot = /.(?!.*\.)/
let resizedImageName = image.replace(lastDot, `-${width}.`)

await sharp(image).resize(width, newHeight).toFile(resizedImageName)

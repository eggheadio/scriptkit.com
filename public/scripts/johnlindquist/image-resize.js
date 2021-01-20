let {default: sharp} = await npm('sharp')

let image = await arg('Select image:')

let width = Number(await arg('Enter width:'))

let metadata = await sharp(image).metadata()

let newHeight = metadata.height * (width / metadata.width)
console.log(newHeight)

let newImage = image.replaceAll(metadata.width, width)

await sharp(image).resize(width, newHeight).toFile(newImage)

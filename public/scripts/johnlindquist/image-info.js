let {default: sharp} = await npm('sharp')

let image = await arg('Select an image:')

let metadata = await sharp(image).metadata()

console.log(metadata)

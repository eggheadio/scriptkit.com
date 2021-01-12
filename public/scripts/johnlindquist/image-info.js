let {default: sharp} = await need('sharp')

let image = await arg('Select an image:')

let metadata = await sharp(image).metadata()

console.log(metadata)

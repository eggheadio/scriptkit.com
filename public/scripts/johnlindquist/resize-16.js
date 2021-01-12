let file = await getSelectedPath()

let {default: sharp} = await need('sharp')

let lastDot = /.(?!.*\.)/
let newFile = file.replace(lastDot, '-16.')
await sharp(file).resize(64, 64).toFile(newFile)

//Shortcut: Alt+Y

let file = await getSelectedPath()

let {default: sharp} = await need('sharp')

let lastDot = /.(?!.*\.)/
let newFile = file.replace(lastDot, '-32.')
await sharp(file).resize(32, 32).toFile(newFile)

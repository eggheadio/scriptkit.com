console.log(`👮‍♀️ copy scripts`)
console.log(kitPath('src'))
let tmpScriptsPath = kitPath('tmp', 'scripts')

console.log(`kenvPath scripts:`)
cp('-r', kenvPath('./scripts'), tmpScriptsPath)
console.log(await readdir(kenvPath(`scripts`)))

console.log(`\n\n\n`)

console.log(`.scripts:`)
console.log(await readdir(`.scripts`))
cp('-r', './scripts', tmpScriptsPath)

console.log(`\n\n\n`)

console.log(`👀 tmpScriptsPath:`)
console.log(tmpScriptsPath)

export {}

console.log(`👮‍♀️ copy scripts`)
console.log(kitPath('src'))
let tmpScriptsPath = kitPath('tmp', 'scripts')

console.log(`👀 tmpScriptsPath:`)
console.log(await readdir(tmpScriptsPath))

console.log(`kenvPath scripts:`)
cp('-r', kenvPath('./scripts'), tmpScriptsPath)
console.log(await readdir(kenvPath(`scripts`)))

console.log(`👀 tmpScriptsPath:`)
console.log(await readdir(tmpScriptsPath))
console.log(`\n\n\n`)

console.log(`./scripts:`)
console.log(await readdir(`./scripts`))
cp('-r', './scripts', tmpScriptsPath)

console.log(`👀 tmpScriptsPath:`)
console.log(await readdir(tmpScriptsPath))
console.log(`\n\n\n`)

let tree = await npm('tree-cli')

console.log(`KIT PATH`)
let res = await tree({base: kitPath()})
console.log(res?.data)
console.log(res?.report)

export {}

let tree = await npm('tree-cli')

console.log(`👮‍♀️ copy scripts`)
let tmpScriptsPath = kitPath('tmp', 'scripts')

console.log(`👀 tmpScriptsPath: ${tmpScriptsPath}`)
let tmpTree = await tree(kitPath(), {l: 2})
console.log(tmpTree.report)

console.log(`kenvPath scripts:`)
cp('-r', kenvPath('./scripts/*'), kitPath('tmp', 'scripts', '*'))
console.log(await readdir(kenvPath(`scripts`)))

console.log(`👀 tmpScriptsPath:`)
console.log(await readdir(tmpScriptsPath))
console.log(`\n\n\n`)

console.log(`./scripts:`)
console.log(await readdir(`./scripts`))
cp('-r', './scripts/*', kitPath('tmp', 'scripts', '*'))

console.log(`KIT PATH`)
let res = await tree({base: kitPath(), l: 3})
console.log(res?.report)

export {}

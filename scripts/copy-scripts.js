let tree = await npm('tree-cli')

console.log(`👮‍♀️ copy scripts`)
let tmpScriptsPath = kitPath('tmp', 'scripts')

console.log(`👀 tmpScriptsPath: ${tmpScriptsPath}`)
let tmpTree = await tree({base: kitPath('tmp'), l: 2})
console.log(`tmpTree report`)
console.log(tmpTree.report)

console.log(`kenvPath scripts:`)
cp('-R', kenvPath('./scripts/*'), kitPath('tmp', 'scripts'))

console.log(`tmpTree report 2`)
let res = await tree({base: kitPath('tmp'), l: 3})
console.log(res?.report)

export {}

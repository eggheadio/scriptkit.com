console.log(`👮‍♀️ copy scripts`)
console.log(kitPath('src'))
let tmpScriptsPath = kitPath('tmp', 'scripts')

cp('-r', kenvPath('./scripts'), tmpScriptsPath)
console.log(kenvPath('scripts'))

export {}

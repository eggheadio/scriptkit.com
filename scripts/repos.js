// let tree = await npm('tree-cli')

// console.log(`KIT PATH`)
// let res = await tree({base: kitPath()})
// console.log(res?.data)
// console.log(res?.report)

// console.log(`pathname`)
// let pn = await tree({base: new URL(import.meta.url).pathname})
// console.log(pn?.data)
// console.log(pn?.report)

// let tmpScriptsPath = kitPath('tmp', 'scripts')

// console.log(`👀 tmpScriptsPath:`)
// console.log(await readdir(tmpScriptsPath))
// console.log(`\n\n\n`)

let response = await get(`https://api.github.com/users/johnlindquist/repos`)

export default response.data.map((r) => r.url)

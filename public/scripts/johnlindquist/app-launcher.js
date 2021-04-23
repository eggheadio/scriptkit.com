// Menu: App Launcher
// Description: Search for an app then launch it
// Author: John Lindquist
// Twitter: @johnlindquist

let {fileSearch} = await kit('file')

let createChoices = async () => {
  let apps = await fileSearch('', {
    onlyin: '/',
    kind: 'application',
  })

  let prefs = await fileSearch('', {
    onlyin: '/',
    kind: 'preferences',
  })

  let group = (path) => (apps) =>
    apps
      .filter((app) => app.match(path))
      .sort((a, b) => {
        let aName = a.replace(/.*\//, '')
        let bName = b.replace(/.*\//, '')

        return aName > bName ? 1 : aName < bName ? -1 : 0
      })

  return [
    ...group(/^\/Applications\/(?!Utilities)/)(apps),
    ...group(/\.prefPane$/)(prefs),
    ...group(/^\/Applications\/Utilities/)(apps),
    ...group(/System/)(apps),
    ...group(/Users/)(apps),
  ].map((value) => {
    return {
      name: value.split('/').pop().replace('.app', ''),
      value,
      description: value,
    }
  })
}

let appsDb = db('apps', {choices: []})
let choices = appsDb.get('choices').value()
if (!choices.length) {
  appsDb.set('choices', await createChoices()).write()
  choices = appsDb.get('choices').value()
}

let app = await arg('Select app:', choices)
let command = `open -a "${app}"`
if (app.endsWith('.prefPane')) {
  command = `open ${app}`
}
exec(command, {
  env: {}, //clear the env. Script NODE_PATH/NODE_OPTIONS may conflict.
})

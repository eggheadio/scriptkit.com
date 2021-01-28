// Menu: App Launcher
// Description: Search for an app then launch it
// Author: John Lindquist
// Twitter: @johnlindquist

let choices = await readdir('/Applications')
choices = choices
  .filter((app) => !app.startsWith('.'))
  .map((app) => app.replace('.app', ''))

let app = await arg('Select app:', {
  choices,
})

exec(`open -a "${app}"`)

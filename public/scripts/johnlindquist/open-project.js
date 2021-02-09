// Menu: Open Project
// Description: Select from a list of projects to open
// Author: John Lindquist
// Twitter: @johnlindquist

let project = await arg('Open project:', [
  '~/.simple',
  '~/projects/simpleapp',
  '~/projects/simplescripts.dev',
])

edit(project)

// Menu: Open Project
// Description: Select from a list of projects to open
// Author: John Lindquist
// Twitter: @johnlindquist

let project = await arg('Open project:', [
  '~/.kit',
  '~/projects/kitapp',
  '~/projects/scriptkit.com',
])

edit(project)

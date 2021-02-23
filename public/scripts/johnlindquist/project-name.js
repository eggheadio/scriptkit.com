// Menu: Project Name
// Description: Generate an alliteraive, dashed project name, copies it to the clipboard, and shows a notification
// Author: John Lindquist
// Twitter: @johnlindquist

let {default: generate} = await npm('project-name-generator')

const name = generate({word: 2, alliterative: true}).dashed

copy(name)

console.log(
  `> "${name}" has been copied to the clipboard. Paste anywhere to see it.`,
)

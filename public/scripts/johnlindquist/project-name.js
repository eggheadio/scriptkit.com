// Description: Generate an alliteraive, dashed project name, copies it to the clipboard, and shows a notification

let {default: generate} = await need('project-name-generator')

const name = generate({word: 2, alliterative: true}).dashed

echo(
  chalk`> {yellow ${name}} has been copied to the clipboard. Paste anywhere to see it.`,
)
copy(name)
echo(chalk`> {yellow ${name}} was posted as a notification`)

// let { notify } = await system("notify")
// notify(name, "copied to clipboard")

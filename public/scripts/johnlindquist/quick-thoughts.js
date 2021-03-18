// Menu: Quick Thoughts
// Description: Add lines to today's journal page
// Author: John Lindquist
// Twitter: @johnlindquist

let {format} = await npm('date-fns')

let date = format(new Date(), 'yyyy-MM-dd')
let thoughtsPath = await env('THOUGHTS_PATH')
let thoughtFile = path.join(thoughtsPath, date + '.md')

let firstEntry = true
let addThought = async (thought) => {
  if (firstEntry) {
    thought = `
- ${format(new Date(), 'hh:mmaa')}
  ${thought}\n`
    firstEntry = false
  } else {
    thought = `  ${thought}\n`
  }

  await appendFile(thoughtFile, thought)
}

let openThoughtFile = async () => {
  let {stdout} = exec(`wc ${thoughtFile}`, {
    silent: true,
  })
  let lineCount = stdout.trim().split(' ').shift()
  edit(thoughtFile, thoughtsPath, lineCount + 1) //open with cursor at end
  await wait(500)
  exit()
}

if (!(await isFile(thoughtFile))) await writeFile(thoughtFile, `# ${date}\n`)

while (true) {
  let thought = await arg('Thought:')
  if (thought === 'open') {
    await openThoughtFile()
  } else {
    await addThought(thought)
  }
}

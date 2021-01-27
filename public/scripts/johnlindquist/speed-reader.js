// Menu: Speed Reader
// Description: Display clipboard content at a defined rate
// Author: John Lindquist
// Twitter: @johnlindquist

if (env.SIMPLE_CONTEXT === 'app') {
  showMarkdown(`
    Sorry, this script is only intended for the terminal.

    You can run it with:

    \`~/.simple/bin/simple speed-reader\`

    Or add \`~/.simple/bin\` to your $PATH and run \`speed-reader\`
    `)
} else {
  let {default: readline} = await npm('readline')

  let wpm = 1000 * (60 / (await arg('Enter words per minute:')))

  let text = await paste()
  text = text
    .trim()
    .split(' ')
    .filter(Boolean)
    .flatMap((sentence) => sentence.trim().split(' '))

  let i = 0

  let id = setInterval(() => {
    readline.clearLine(stdout, 0)
    readline.cursorTo(stdout, 0)
    stdout.write(text[i++])
    if (i >= text.length) clearInterval(id)
  }, wpm)
}

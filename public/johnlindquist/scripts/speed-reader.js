// Menu: Speed Reader
// Description: Display clipboard content at a defined rate
// Author: John Lindquist
// Twitter: @johnlindquist

let wpm = 1000 * (60 / (await arg('Enter words per minute:')))

let text = await paste()
text = text
  .trim()
  .split(' ')
  .filter(Boolean)
  .flatMap((sentence) => sentence.trim().split(' '))

let i = 0

let id = setInterval(() => {
  setPlaceholder(` ${text[i++]}`)
  if (i >= text.length) clearInterval(id)
}, wpm)

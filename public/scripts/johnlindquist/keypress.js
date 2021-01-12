let {default: readline} = await import('readline')

readline.emitKeypressEvents(process.stdin)

process.stdin.on('keypress', (ch, key) => {
  console.log('got "keypress"', ch, key)
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause()
  }
})

process.stdin.setRawMode(true)

// Menu: Speak Script
// Description: Edit a Script based on Speech
// Author: John Lindquist
// Twitter: @johnlindquist

let {choices: scripts} = await simple('cli/scripts')

let items = scripts
  .map((script) => `"${script.name}"`) //surround in quotes
  .join(',')

let speech = await applescript(`
tell application "SpeechRecognitionServer"
	listen for {${items}}
end tell
`)

let {value} = scripts.find((script) => script.name === speech)

edit(simplePath('scripts', value + '.js'))

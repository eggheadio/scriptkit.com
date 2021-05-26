// Menu: Speak Script
// Description: Run a Script based on Speech Input
// Author: John Lindquist
// Twitter: @johnlindquist

let {scripts} = await cli('scripts')

let escapedScripts = scripts.map((script) => ({
  name: `"${script.name.replace(/"/g, '\\"')}"`, //escape quotes
  value: script.value,
}))

let speakableScripts = escapedScripts.map(({name}) => name).join(',')

let speech = await applescript(String.raw`
tell application "SpeechRecognitionServer"
	listen for {${speakableScripts}}
end tell
`)

let script = escapedScripts.find((script) => script.name == `"${speech}"`)

await run(script.value)

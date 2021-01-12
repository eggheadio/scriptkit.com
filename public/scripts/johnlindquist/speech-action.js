let items = (await readdir(cwd()))
  .map((item) => `"${item}"`) //surround in quotes
  .join(',')

let speech = await applescript(`
tell application "SpeechRecognitionServer"
	listen for {${items}}
end tell
`)

edit(path.join(cwd(), speech))

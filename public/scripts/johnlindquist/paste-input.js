//Description: Useful in combination with keyboard shortcuts to paste whatever is passed in
applescript(`
set the clipboard to "${await arg()}"
tell application "System Events"
    keystroke "v" using command down
end tell
`)

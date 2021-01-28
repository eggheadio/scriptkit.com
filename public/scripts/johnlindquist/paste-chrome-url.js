// Menu: Paste URL
// Description: Copy the current URL from Chrome. Paste it at cursor.
// Author: John Lindquist
// Twitter: @johnlindquist

let url = await applescript(
  `tell application "Google Chrome" to return URL of active tab of front window`,
)

await setSelectedText(url)

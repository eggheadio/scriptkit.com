// Description: Launch Twitter in Chrome. If Twitter is already open, switch to that tab.
// Author: John Lindquist
// Twitter: @johnlindquist
// Shortcut: Alt+T

let {focusTab} = await kit('chrome')
await focusTab('twitter.com')

// Description: Launch a url in Chrome. If url is already open, switch to that tab.
// Author: John Lindquist
// Twitter: @johnlindquist

let {focusTab} = await kit('chrome')
let url = await arg('Enter url:')
focusTab(url)

// Menu: Chrome Tab Switcher
// Description: List all Chrome tabs. Then switch to that tab
// Author: John Lindquist
// Twitter: @johnlindquist

let {getTabs, focusTab} = await kit('chrome')

let tabs = await getTabs()

let url = await arg(
  'Select Chrome tab:',
  tabs.map(({url, title}) => ({
    name: url,
    value: url,
    description: title,
  })),
)

focusTab(url)

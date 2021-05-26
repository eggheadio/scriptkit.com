// Menu: Open Chrome Tab
// Description: List all Chrome tabs. Then switch to that tab
// Author: John Lindquist
// Twitter: @johnlindquist

let {getTabs, focusTab} = await kit('chrome')

let currentTabs = await getTabs()

let bookmarks = await readFile(
  home('Library/Application Support/Google/Chrome/Default/Bookmarks'),
)

bookmarks = JSON.parse(bookmarks)
bookmarks = bookmarks.roots.bookmark_bar.children

let bookmarkChoices = bookmarks.map(({name, url}) => {
  return {
    name: url,
    description: name,
    value: url,
  }
})

let currentOpenChoices = currentTabs.map(({url, title}) => ({
  name: url,
  value: url,
  description: title,
}))

let bookmarksAndOpen = [...bookmarkChoices, ...currentOpenChoices]
let choices = _.uniqBy(bookmarksAndOpen, 'name')

let url = await arg('Focus Chrome tab:', choices)

focusTab(url)

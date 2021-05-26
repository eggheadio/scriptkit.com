// Menu: Chrome Bookmarks
// Description: Select and open a bookmark from Chrome
// Author: John Lindquist
// Twitter: @johnlindquist

let bookmarks = await readFile(
  home('Library/Application Support/Google/Chrome/Default/Bookmarks'),
)

bookmarks = JSON.parse(bookmarks)
bookmarks = bookmarks.roots.bookmark_bar.children

let url = await arg(
  'Select bookmark',
  bookmarks.map(({name, url}) => {
    return {
      name,
      description: url,
      value: url,
    }
  }),
)

exec(`open ${url}`)

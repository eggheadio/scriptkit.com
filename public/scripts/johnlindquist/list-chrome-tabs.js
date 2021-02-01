// Description: List all Chrome tabs. Then switch to that tab
// Author: John Lindquist
// Twitter: @johnlindquist

let tabs = await applescript(
  `
  set tabData to ""
  
  tell application "Google Chrome"
      set window_list to every window # get the windows
      
      repeat with the_window in window_list # for every window
          set tab_list to every tab in the_window # get the tabs
          
          repeat with the_tab in tab_list # for every tab
              set the_url to the URL of the_tab # grab the URL
              set the_title to the title of the_tab # grab the title
              set tabData to tabData & "
  " & the_url & "	" & the_title
          end repeat
      end repeat
  end tell
  `,
  {silent: true},
)

let choices = tabs.split('\n').flatMap((line) => {
  let [url = '', title = ''] = line.split('\t')
  return {
    value: url,
    name: url.split('://').pop(),
    info: title,
  }
})

let url = await arg('Select Chrome tab:', {
  choices,
})

await run('chrome-tab', url)

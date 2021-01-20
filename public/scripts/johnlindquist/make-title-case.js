//Shortcut: Alt+T

let {titleCase} = await npm('title-case')

let text = await getSelectedText()
let titleText = titleCase(text)
await setSelectedText(titleText)

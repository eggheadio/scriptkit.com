//Shortcut: Alt+T

let {titleCase} = await need('title-case')

let text = await getSelectedText()
let titleText = titleCase(text)
await setSelectedText(titleText)

let clipboard = await applescript(`
tell application "System Events" to keystroke "c" using {command down}
the clipboard
`)

let {SentimentAnalyzer, PorterStemmer, WordTokenizer} = await need('natural')

let analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn')
// getSentiment expects an array of strings
let tokenizer = new WordTokenizer()
let tokens = tokenizer.tokenize(clipboard)
notify(clipboard, analyzer.getSentiment(tokens))

//You are my favorite person in the world

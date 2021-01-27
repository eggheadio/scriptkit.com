// Menu: Sentiment
// Description: Analyze the sentiment of your text selection
// Author: John Lindquist
// Twitter: @johnlindquist

let text = await getSelectedText()

let {SentimentAnalyzer, PorterStemmer, WordTokenizer} = await npm('natural')

let analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn')
// getSentiment expects an array of strings
let tokenizer = new WordTokenizer()
let tokens = tokenizer.tokenize(text)

showMarkdown(`
## ${text}
* ${analyzer.getSentiment(tokens)}
`)

//Note: 0 is neutral. >0 is positive sentimen. <0 is negative sentiment.
//Here are some test phrases to select:
//I love fun
//I hate everything

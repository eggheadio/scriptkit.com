// Menu: Vocab Quiz
// Description: Quiz on random vocab words
// Author: John Lindquist
// Twitter: @johnlindquist

let {default: randomWord} = await npm('random-word')
let {} = await npm('wordnet-db')
let {WordNet} = await npm('natural')

let wordNet = new WordNet()
let words = []

let quiz = async () => {
  let word = words[0]
  let result = await arg(`Define: ${word.value}`, {
    choices: _.shuffle(words),
  })

  console.log(`${word.value}: ${word.name}`)
}

let gatherWords = () => {
  wordNet.lookup(randomWord(), (results) => {
    if (results.length) {
      let [{lemma, def}] = results
      words.push({name: def, value: lemma})
      if (words.length == 4) {
        quiz()
        return
      }
    }
    gatherWords()
  })
}

gatherWords()

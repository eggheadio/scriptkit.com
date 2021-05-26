// Menu: Vocab Quiz
// Description: Quiz on random vocab words
// Author: John Lindquist
// Twitter: @johnlindquist

await npm('wordnet-db')
let randomWord = await npm('random-word')
let {WordNet} = await npm('natural')

let wordNet = new WordNet()
let words = []

let quiz = async () => {
  let word = words[0]
  let result = await arg(`What does "${word.value}" mean?`, _.shuffle(words))

  let correct = word.value === result
  setPlaceholder(`${correct ? '✅' : '🚫'} ${word.value}: ${word.name}`)
  await wait(2000)
  words = []
  prepareWords()
}

let prepareWords = () => {
  setPlaceholder(`Finding random word and definitions...`)
  wordNet.lookup(randomWord(), (results) => {
    if (results.length) {
      let [{lemma, def}] = results
      words.push({name: def, value: lemma})
      if (words.length == 4) {
        quiz()
        return
      }
    }
    prepareWords()
  })
}

prepareWords()

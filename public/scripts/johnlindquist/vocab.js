//Description: Take a vocabulary quiz
let {default: randomWord} = await npm('random-word')
let {} = await npm('wordnet-db')
let {WordNet} = await npm('natural')

let wordNet = new WordNet()
let words = []

let quiz = async () => {
  let word = words[0]
  await prompt({
    message: chalk`yellow ${word.value}`,
    type: 'list',
    choices: _.shuffle(words),
  })

  echo(chalk`{yellow ${word.value}}: ${word.name}`)
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

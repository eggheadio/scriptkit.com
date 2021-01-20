let {default: Tokenizer} = await npm('sentence-tokenizer')
let {default: syllable} = await npm('syllable')
//requires rhyme dictionary
/**
 * cd node_modules/rhyms-plus/data
 * ./fetch.sh
 */
let {default: rhyme} = await npm('rhyme-plus')
let {default: write} = await npm('write')
let {default: stripHtml} = await npm('string-strip-html')
let {rhymes} = await npm('rhyming.ly')
let {default: natural} = await npm('natural')

let tokenizer = new Tokenizer('Chuck')
let metaphone = natural.Metaphone

let textFile = await arg('Select a text file')
let outName = await arg('Name the output file')

let rhymeFile = simplePath('out', outName)

let stream = createWriteStream(rhymeFile, {
  flags: 'a',
})

let map = (transform) => (source) => (callback) => {
  source((value) => {
    callback(transform(value))
  })
}

let getAllSentences = (source) => (callback) => {
  console.log('getAllSentences')
  source((value) => {
    // console.log(value)
    tokenizer.setEntry(value)
    callback(tokenizer.getSentences())
  })
}

// -> array of sentences
let limitSentencesBySyllable = (count) => (source) => (callback) => {
  console.log('limitSentencesBySyllable')
  source((value) => {
    let sentences = value.filter((sentence) => {
      let syllables = syllable(sentence)

      return syllables === count
    })
    console.log(count, sentences)
    callback(sentences)
  })
}

// -> array of sentences
let limitSentencesBySyllableLessThan = (count) => (source) => (callback) => {
  console.log('limitSentencesBySyllable')
  source((value) => {
    let sentences = value.filter((sentence) => {
      let syllables = syllable(sentence)

      return syllables < count && syllables > 2
    })
    console.log(count, sentences)
    callback(sentences)
  })
}

let limitSentencesByMaxMin = (max, min) => (source) => (callback) => {
  console.log('limitSentencesBySyllable')
  source((value) => {
    let sentences = value.filter((sentence) => {
      console.log(sentence.split(' ').length)
      console.log(sentence + '\n')
      let syllables = syllable(sentence)

      return syllables < max && syllables > min
    })
    callback(sentences)
  })
}

let writeToFile = (value) => {
  // console.log("write to file")
  // console.log("-----------------------")
  // console.log("->", value)
  stream.write(value)
}

let compose = (...fns) =>
  fns.reduceRight(
    (prevFn, nextFn) => (...args) => nextFn(prevFn(...args)),
    (value) => value,
  )

// findRhymes(getLastWords(limitTo6Syllables(getAllSentences(getAllChapters))))(logValue)

let filterByRhymes = (source) => (callback) => {
  source((value) => {
    let lastWords = value
      .map((sentence) => {
        let words = sentence.split(' ')

        return words[words.length - 1].replace(/[^\w\s]/gi, '')
      })
      .filter((word) => word.length > 1)

    console.log('last words:', lastWords)

    rhyme((r) => {
      let rhymes = new Set(r.findRhymes(lastWords).flat())
      console.log(rhymes)

      for (let rhyme of rhymes) {
        for (let sentence of value) {
          let words = sentence.split(' ')

          let lastWord = words[words.length - 1].replace(/[^\w\s]/gi, '')
          if (lastWord == rhyme) {
            console.log('->', lastWord)
            // console.log(rhyme, lastWord, sentence)
            callback('\n' + sentence + '<br>')
            // break;
          }
        }
        callback('\n')
      }
    })
  })
}
let filterByRhymingly = (source) => (callback) => {
  source((value) => {
    let lastWords = value
      .map((sentence) => {
        let words = sentence.split(' ')

        return words[words.length - 1].replace(/[^\w\s]/gi, '')
      })
      .filter((word) => word.length > 1)

    console.log('last words:', lastWords)

    console.log('before rhymes')
    let results = lastWords
      .map((word) => {
        return rhymes(word).rhymes.map((result) => result.word)
      })
      .flat()
    console.log('---results---')
    console.log(results)

    // results.forEach(rhyme => {
    //     value.forEach(sentence => {
    //         let words = sentence.split(" ")

    //         let lastWord = words[words.length - 1].replace(/[^\w\s]/gi, '')
    //         if (lastWord == rhyme) {
    //             console.log("->", lastWord)
    //             // console.log(rhyme, lastWord, sentence)
    //             callback(sentence)
    //         }
    //     })
    // })
    for (let rhyme of results) {
      for (let sentence of value) {
        let words = sentence.split(' ')

        let lastWord = words[words.length - 1].replace(/[^\w\s]/gi, '')
        if (lastWord == rhyme) {
          console.log('->', lastWord)
          // console.log(rhyme, lastWord, sentence)
          callback(sentence)
          break
        }
      }
    }
  })
}

let filterByNatural = (source) => (callback) => {
  source((value) => {
    let lastWords = value.map((sentence) => {
      let words = sentence.split(' ')

      return words[words.length - 1].replace(/[^\w\s]/gi, '')
    })

    console.log('last words:', lastWords)

    console.log('before metaphone')
    let results = lastWords.reduce((a, word) => {
      let m = metaphone.process(word)

      if (a[m]) {
        a[m].push(word)
        return a
      }

      a[m] = [word]
      return a
    }, {})
    console.log('---results---')
    console.log(results)
  })
}

let stripNewLines = (value) => value.result.replace(/(\r\n|\n|\r)/gm, '  ')

let removeHash = new RegExp('#([^\\s]*)', 'g')
let stripHashtags = (string) => string.replace(removeHash, '')

let removeLink = new RegExp('http([^\\s]*)', 'g')
let stripLinks = (string) => string.replace(removeLink, '')

let removeMention = new RegExp('@([^\\s]*)', 'g')
let stripMentions = (string) => string.replace(removeMention, '')

let splitAtMentions = (sentences) =>
  sentences.map((sentence) => sentence.split('  @')).flat()
let splitAtDoubleSpace = (sentences) =>
  sentences.map((sentence) => sentence.split('  ')).flat()

let filterTooShort = (sentences) =>
  sentences.filter((sentence) => sentence.length > 8)

let trimSentences = (sentences) => sentences.map((sentence) => sentence.trim())

let operate = compose(
  filterByRhymes,

  limitSentencesByMaxMin(10, 6),
  //   limitSentencesBySyllable(8),
  map(trimSentences),
  // map(filterTooShort),
  map(splitAtDoubleSpace),
  getAllSentences,
  map(stripMentions),
  map(stripLinks),
  map(stripHashtags),
  map(stripNewLines),
  map(stripHtml),
)

let getTextFile = (fileName) => async (callback) => {
  var data = await readFile(fileName, 'utf8')
  callback(data.toString())
}

operate(getTextFile(textFile))(writeToFile)

edit(textFile)

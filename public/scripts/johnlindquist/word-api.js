// Menu: Word API
// Description: Queries a word api. Pastes selection.
// Author: John Lindquist
// Twitter: @johnlindquist

let {setSelectedText} = await kit('text')

let typeMap = {
  describe: 'rel_jjb',
  trigger: 'rel_trg',
  noun: 'rel_jja',
  follow: 'lc',
  rhyme: 'rel_rhy',
  spell: 'sp',
  synonym: 'ml',
  sounds: 'rel_nry',
  suggest: 'suggest',
}

let word = await arg('Type a word:')
let typeArg = await arg('What would you like to find?', Object.keys(typeMap))

let type = typeMap[typeArg]
word = word.replace(/ /g, '+')

let url = `https://api.datamuse.com/words?${type}=${word}&md=d`
if (typeArg == 'suggest') url = `https://api.datamuse.com/sug?s=${word}&md=d`

let response = await get(url)
let formattedWords = response.data.map(({word, defs}) => {
  let info = ''
  if (defs) {
    let [type, meaning] = defs[0].split('\t')
    info = `- (${type}): ${meaning}`
  }
  return {
    name: `${word}${info}`,
    value: word,
  }
})

let pickWord = await arg('Select to paste:', formattedWords)
setSelectedText(pickWord)

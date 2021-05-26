// Menu: Synonym
// Description: List synonyms
// Author: John Lindquist
// Twitter: @johnlindquist

let {setSelectedText} = await kit('text')

let synonym = await arg('Type a word', async (input) => {
  if (!input || input?.length < 3) return []
  let url = `https://api.datamuse.com/words?ml=${input}&md=d`
  let response = await get(url)

  return response.data.map(({word, defs}) => {
    return {
      name: `${word}${defs?.[0] && ` - ${defs[0]}`}`,
      value: word,
      selected: `Paste ${word}`,
    }
  })
})

setSelectedText(synonym)

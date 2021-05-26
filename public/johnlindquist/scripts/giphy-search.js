// Menu: Giphy
// Description: Search giphy. Paste link.
// Author: John Lindquist
// Twitter: @johnlindquist

let download = await npm('image-downloader')
let queryString = await npm('query-string')
let {setSelectedText} = await kit('text')

let GIPHY_API_KEY = await env('GIPHY_API_KEY', {
  hint: md(`Get a [Giphy API Key](https://developers.giphy.com/dashboard/)`),
  ignoreBlur: true,
  secret: true,
})

let search = (q) =>
  `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${q}&limit=10&offset=0&rating=g&lang=en`

let {input, url} = await arg('Search giphy:', async (input) => {
  if (!input) return []
  let query = search(input)
  let {data} = await get(query)

  return data.data.map((gif) => {
    return {
      name: gif.title.trim() || gif.slug,
      value: {
        input,
        url: gif.images.original.url,
      },
      preview: `<img src="${gif.images.downsized.url}" alt="">`,
    }
  })
})

let formattedLink = await arg('Format to paste', [
  {
    name: 'URL Only',
    value: url,
  },
  {
    name: 'Markdown Image Link',
    value: `![${input}](${url})`,
  },
  {
    name: 'HTML <img>',
    value: `<img src="${url}" alt="${input}">`,
  },
])

setSelectedText(formattedLink)

// Menu: Giphy
// Description: Search giphy
// Author: John Lindquist
// Twitter: @johnlindquist

let GIPHY_API_KEY = await env('GIPHY_API_KEY', {
  info: `<a href="https://developers.giphy.com/dashboard/">https://developers.giphy.com/dashboard/</a>`,
})

let search = (q) =>
  `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${q}&limit=10&offset=0&rating=g&lang=en`

let gifUrl = await arg('Search giphy:', async (input) => {
  if (!input) return []
  let {data} = await get(search(input))

  return data.data.map((gif) => {
    return {
      name: gif.title.trim() || gif.slug,
      value: gif.images.downsized_medium.url,
      info: `<img src="${gif.images.downsized_medium.url}"/>`,
    }
  })
})

setSelectedText(gifUrl)

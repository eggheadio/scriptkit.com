// Menu: Giphy Search
// Description: Search giphy. Paste markdown link.
// Author: John Lindquist
// Twitter: @johnlindquist
let download = await npm('image-downloader')
let queryString = await npm('query-string')
let {setSelectedText} = await kit('text')

if (!env.GIPHY_API_KEY) {
  show(
    `<div class="p-4">
      <div>
        Grab an API Key from the Giphy dev dashboard:
      </div>
      <a href="https://developers.giphy.com/dashboard/">Here</a>
    </div>`,
  )
}
let GIPHY_API_KEY = await env('GIPHY_API_KEY')

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
        url: gif.images.downsized_medium.url,
      },
      img: gif.images.downsized_medium.url,
    }
  })
})

setSelectedText(`![${input}](${url})`)

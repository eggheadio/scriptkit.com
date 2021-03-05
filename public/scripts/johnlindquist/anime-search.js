// Menu: Search Anime
// Description: Use the jikan.moe API to search anime
// Author: John Lindquist
// Twitter: @johnlindquist

let anime = await arg('Anime:')

let response = await get(`https://api.jikan.moe/v3/search/anime?q=${anime}`)

let {image_url, title} = response.data.results[0]

showImage(image_url, {title})

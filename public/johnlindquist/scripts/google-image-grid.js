// Menu: Google Image Grid
// Description: Create a Grid of Images
// Author: John Lindquist
// Twitter: @johnlindquist

let gis = await npm('g-i-s')

await arg('Search for images:', async (input) => {
  console.log({input})
  if (input.length < 3) return ``

  let searchResults = await new Promise((res) => {
    gis(input, (_, results) => {
      res(results)
    })
  })

  return `<div class="flex flex-wrap">${searchResults
    .map(({url}) => `<img class="h-32" src="${url}" />`)
    .join('')}</div>`
})

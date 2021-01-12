// Description: Searches for book titles using Open Library
// Author: John Lindquist
// Twitter: @johnlindquist

let query
if (args.length > 1) {
  query = args.join(' ')
} else {
  query = await arg('What do you want to search for?')
}

let response = await get(`http://openlibrary.org/search.json?q=${query}`)

let titles = response.data.docs.map((doc) => doc.title)
titles = _.uniq(titles)

console.log(titles)

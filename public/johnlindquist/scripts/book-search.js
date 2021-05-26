// Menu: Book Search
// Description: Use Open Library API to search for books
// Author: John Lindquist
// Twitter: @johnlindquist

let query = await arg('Search for a book title:')

//This API can be a little slow. Wait a couple seconds
let response = await get(`http://openlibrary.org/search.json?q=${query}`)

let transform = ({title, author_name}) =>
  `* "${title}" - ${author_name?.length && author_name[0]}`

let markdown = response.data.docs.map(transform).join('\n')

inspect(markdown, 'md')

import '@johnlindquist/kit'

let memoize = await npm('memoizee')
let {gql, GraphQLClient} = await npm('graphql-request')
let slugify = await npm('slugify')
console.log(`Starting docs-to-json`)

const endpoint = 'https://api.github.com/graphql'

let Category = {
  Announcements: 'MDE4OkRpc2N1c3Npb25DYXRlZ29yeTMyODIwMDgw',
  Docs: 'MDE4OkRpc2N1c3Npb25DYXRlZ29yeTMyODc5NjIx',
  Share: 'MDE4OkRpc2N1c3Npb25DYXRlZ29yeTMyMDg0MTcw',
}

export async function _getDiscussions(categoryId) {
  const client = new GraphQLClient(endpoint, {
    headers: {
      'GraphQL-Features': 'discussions_api',
      authorization: `Bearer ${process.env.GITHUB_DISCUSSIONS_TOKEN}`,
    },
  })

  const query = gql`
    query ($categoryId: ID) {
      repository(owner: "johnlindquist", name: "kit") {
        discussions(
          first: 100
          categoryId: $categoryId
          orderBy: {field: CREATED_AT, direction: DESC}
        ) {
          # type: DiscussionConnection
          totalCount # Int!
          nodes {
            title
            url
            author {
              login
              avatarUrl
              url
            }
            body
            id
            createdAt
          }
        }
      }
    }
  `

  const response = await client.request(query, {
    categoryId,
  })

  return response.repository.discussions.nodes.map((d) => {
    const slug = slugify(d.title, {
      lower: true,
      strict: true,
    })

    let url = ''
    switch (categoryId) {
      case Category.Docs:
        url = `https://scriptkit.com/docs/${slug}`
        break
      case Category.Announcements:
        url = `https://scriptkit.com/blog/${slug}`
        break
      case Category.Announcements:
        url = `https://scriptkit.com/${d.author.login}/${slug}`
        break
    }

    return {
      ...d,
      slug,
      ...(url && {url}),
    }
  })
}

export const getDiscussions = memoize(
  async (category, login) => {
    const discussions = await _getDiscussions(category)
    return discussions.filter((d) => (login ? d.author.login === login : true))
  },
  {promise: true},
)

let jsonfile = await npm('jsonfile')
let docs = await getDiscussions(Category.Docs)
let outfile = path.resolve(`./public/data/docs.json`)
await jsonfile.writeFile(outfile, docs)

console.log(`Docs written to json: ${outfile} 👏`)

export {}

import '@johnlindquist/kit'

// Menu:
// Description:
// Author:
// Twitter: @zzxiv

const githubURL = 'https://api.github.com/graphql'

let token = env.GITHUB_DISCUSSIONS_TOKEN

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    'GraphQL-Features': 'discussions_api',
  },
}

const discussionInnerQuery = `
# type: DiscussionConnection
  totalCount # Int!
  nodes {
    # type: Discussion
    id,
    title,
    # bodyText,
    createdAt,
    resourcePath,
    category {
      id,
      name,
      emoji,
    },
    author {
      login,
      avatarUrl,
    }
  }
`

const buildChoice = (node: any) => {
  const {
    title,
    resourcePath,
    createdAt,
    category,
    author: {login, avatarUrl},
  } = node
  const url = `https://github.com${resourcePath}`
  const description = `Created by ${login}`
  return {
    name: title,
    createdAt,
    value: url,
    description,
    img: avatarUrl,
    category,
  }
}

const fetchPosts = async (categoryId = '') => {
  const query = `
  query {
    repository(owner: "johnlindquist", name: "kit") {
      discussions(first: 50, categoryId: "${categoryId}", orderBy: {
        field: CREATED_AT,
        direction: DESC,
      }) {
        ${discussionInnerQuery}
      }
    }
  }`

  let options = {
    query,
  }

  let response: any = await post(githubURL, options, config)

  return response?.data?.data?.repository?.discussions?.nodes
}

/**
 * query { 
  repository(owner: "johnlindquist" name: "kit"){
    discussionCategories (first: 100){
      edges {
        node {
          id
          name
        }
      }
    }
  }
}
 */
const downloadCategory = async () => {
  const showAndTell = await fetchPosts(
    'MDE4OkRpc2N1c3Npb25DYXRlZ29yeTMyMDg0MTcw',
  ) //showandtell
  const announcements = await fetchPosts(
    'MDE4OkRpc2N1c3Npb25DYXRlZ29yeTMyODIwMDgw',
  ) //Announcements

  const nodes = [...showAndTell, ...announcements]

  const choices = nodes
    .map(buildChoice)
    .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))

  await outputJson(path.resolve('public', 'data', 'hot.json'), choices)
}

await downloadCategory()

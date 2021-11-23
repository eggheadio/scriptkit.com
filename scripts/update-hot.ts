import '@johnlindquist/kit'
import {getMetadata} from '@johnlindquist/kit/core/utils'
import {Extension, LoadedScript} from '../src/utils/types'
import {Discussion} from '../src/utils/get-discussions'

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
        ... on User {
          twitterUsername
          name
        }
        login
        avatarUrl
        url
      }
    body
  }
`

const buildChoice = (node: any) => {
  const {
    title,
    resourcePath,
    createdAt,
    category,
    slug,
    id,
    body,
    author,
    url,
  } = node

  const description = `Created by ${author.login}`

  //   let metadata = getMetadata(body)

  // let [, dir, file] = body.match(/(?<=<meta path=")(.*)\/(.*)(?=")/) || [
  //   null,
  //   '',
  //   '',
  // ]

  // let [tag] = body.match(/(?<=<meta tag=")(.*)(?=")/) || ['']

  let content = body
  // let prevLength = 0

  // let i = 0
  // for (let s of body.matchAll(/(`{3}js)(.{5,}?)(`{3})/gs)) {
  //   i++
  //   if (s[2] && s.index) {
  //     let c = Buffer.from(s[2]).toString('base64url')
  //     let name = `${slug}-example-${i}`
  //     let link = `\n\n[Create script from example below](kit:snippet?name=${name}&content=${c})\n`

  //     let index = s.index + prevLength
  //     content = [content.slice(0, index), link, content.slice(index)].join('')
  //     prevLength += link.length
  //   }
  // }

  return {
    // ...metadata,
    avatar: author.avatarUrl,
    user: author.login,
    author: author.name,
    twitter: author.twitterUsername,
    discussion: url,
    url,
    title,
    command: slug,
    content,
    extension: Extension.md,
    description,
    resourcePath,
    createdAt,
    category,
    id,
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

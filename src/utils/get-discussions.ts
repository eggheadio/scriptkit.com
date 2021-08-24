import memoize from 'memoizee'
import {gql, GraphQLClient} from 'graphql-request'
import slugify from 'slugify'
import _ from 'lodash'

const endpoint = 'https://api.github.com/graphql'

export enum Category {
  Announcements = 'MDE4OkRpc2N1c3Npb25DYXRlZ29yeTMyODIwMDgw',
  Docs = 'MDE4OkRpc2N1c3Npb25DYXRlZ29yeTMyODc5NjIx',
  Share = 'MDE4OkRpc2N1c3Npb25DYXRlZ29yeTMyMDg0MTcw',
}

export enum Login {
  johnlindquist = 'johnlindquist',
}

interface Author {
  login: string
  avatarUrl: string
  url: string
  resourcePath: string
}

export interface Discussion {
  id: string
  title: string
  author: Author
  url: string
  body: string
  slug: string
  createdAt: string
}

export interface DiscussionsProps {
  discussions: Discussion[]
}

export interface DiscussionProps {
  discussion: Discussion
  link?: string
}

async function _getDiscussions(categoryId: string): Promise<Discussion[]> {
  const client = new GraphQLClient(endpoint, {
    headers: {
      'GraphQL-Features': 'discussions_api',
      authorization: `Bearer ${process.env.GITHUB_DISCUSSIONS_TOKEN}`,
    },
  })

  const query = gql`
    query($categoryId: ID) {
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

  const response = await client.request(query, {categoryId})

  return response.repository.discussions.nodes.map((d: Discussion) => {
    const slug = slugify(d.title, {
      lower: true,
      strict: true,
    })

    return {
      ...d,
      slug,
    }
  })
}

export const getDiscussions = memoize(
  async (category: Category, login: string = '') => {
    const discussions = await _getDiscussions(category)
    return discussions.filter((d) => (login ? d.author.login === login : true))
  },
  {promise: true},
)

export async function getDiscussionPaths(category: Category, login = '') {
  const discussions = await getDiscussions(category, login)
  const paths = []
  for await (const {slug} of discussions) {
    paths.push({
      params: {
        slug,
      },
    })
  }

  return {
    paths,
    fallback: false,
  }
}

export async function getDiscussionBySlug(
  category: Category,
  matchSlug: string,
) {
  const discussions = await getDiscussions(category)

  return discussions.find(({slug}) => {
    return slug === matchSlug
  })
}

export async function getLogins(): Promise<string[]> {
  const discussions = await getDiscussions(Category.Share)
  return _.uniq(discussions.map((d) => d.author.login))
}

export async function getUserShares(login: string): Promise<Discussion[]> {
  const discussions = await getDiscussions(Category.Share)

  return discussions.filter((d) => d.author.login === login)
}

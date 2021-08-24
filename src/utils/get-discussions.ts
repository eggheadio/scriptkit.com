import memoize from 'memoizee'
import {gql, GraphQLClient} from 'graphql-request'
import slugify from 'slugify'

const endpoint = 'https://api.github.com/graphql'

export enum Category {
  Announcements = 'MDE4OkRpc2N1c3Npb25DYXRlZ29yeTMyODIwMDgw',
  Docs = 'MDE4OkRpc2N1c3Npb25DYXRlZ29yeTMyODc5NjIx',
  Share = 'MDE4OkRpc2N1c3Npb25DYXRlZ29yeTMyMDg0MTcw',
}

export interface Discussion {
  id: string
  title: string
  author: {login: string}
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

  return response.repository.discussions.nodes
    .filter((node: Discussion) => node.author.login === 'johnlindquist')
    .map((d: Discussion) => {
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

export const getDiscussions = memoize(_getDiscussions, {promise: true})

export async function getDiscussionPaths(category: Category) {
  const discussions = await getDiscussions(category)
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

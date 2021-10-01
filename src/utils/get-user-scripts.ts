import {readFileSync} from 'fs'
import path from 'path'
import {Octokit} from '@octokit/rest'
import findByCommentMarker from './find-by-comment-marker'
import {Category, Discussion, getDiscussions} from './get-discussions'

const octokit = new Octokit({
  auth: process.env.GITHUB_SCRIPTKITCOM_TOKEN,
})

export interface Script {
  file?: string
  command: string
  content?: string
  url: string
  description?: string
  author?: string
  twitter?: string
  github?: string
  user: string
}

const usersJSON: {user: string; repo: string}[] = JSON.parse(
  readFileSync(path.join(process.cwd(), 'users.json'), 'utf-8'),
)

export const getUsers = (): string[] => {
  return usersJSON.map((o) => o.user)
}

let userScripts: {[key: string]: Script[]} = {}

export const getUserScripts = async (
  selectedUser: string,
): Promise<Script[]> => {
  if (userScripts[selectedUser]) return userScripts[selectedUser]

  const foundUser = usersJSON.find((o) => o.user === selectedUser) as {
    user: string
    owner: string
    repo: string
  }

  if (!foundUser) return []

  const {user, owner, repo} = foundUser

  const scriptsResponse = await octokit.request(
    'GET /repos/{owner}/{repo}/contents/{path}',
    {
      owner,
      repo,
      path: 'scripts',
    },
  )

  const scriptsDir = scriptsResponse.data as any[]

  const scripts = []

  for await (const script of scriptsDir) {
    const file = script.name
    const url = script.download_url

    const scriptResponse = await octokit.request(
      'GET /repos/{owner}/{repo}/contents/{path}',
      {
        owner,
        repo,
        path: `${script.path}`,
        mediaType: {
          format: 'raw',
        },
      },
    )

    const content = scriptResponse.data as any

    const description = findByCommentMarker(content, 'Description:')
    const author = findByCommentMarker(content, 'Author:')
    const twitter = findByCommentMarker(content, 'Twitter:')
    const github = findByCommentMarker(content, 'GitHub:')

    scripts.push({
      file,
      command: file.replace('.js', ''),
      content,
      url,
      description,
      author,
      twitter,
      github,
      user: selectedUser,
    })
  }

  userScripts[selectedUser] = scripts

  return scripts
}

export async function getAllScripts() {
  const users = getUsers()
  let scripts: Script[] = []
  for await (const user of users) {
    const userScripts = await getUserScripts(user)
    scripts = scripts.concat(userScripts)
  }

  return scripts
}

export async function getScriptPaths() {
  const users = getUsers()
  const paths = []
  for await (const user of users) {
    const scripts = await getUserScripts(user)
    for await (const script of scripts) {
      paths.push({
        params: {
          user,
          script: script.command,
        },
      })
    }
  }

  const shares = await getDiscussions(Category.Share)
  for await (const share of shares) {
    const {user, command} = convertShareToScript(share)
    paths.push({
      params: {
        user,
        script: command,
      },
    })
  }

  return {
    paths,
    fallback: false,
  }
}

export function convertShareToScript(discussion: Discussion): Script {
  return {
    command: discussion.slug,
    url: discussion.url,
    user: discussion.author.login,
  }
}

export async function getScript(user: string, command: string) {
  const shared = await getDiscussions(Category.Share)
  // console.log({shared, user, command})
  const foundShared = shared.find(
    (d) => user === d.author.login && command === d.slug,
  )
  if (foundShared) {
    const convertedScript = convertShareToScript(foundShared)
    // console.log({convertedScript})
    return convertedScript
  }
  const scripts: Script[] = await getUserScripts(user)
  return scripts.find((script) => script.command === command)
}

export async function getLatestRelease() {
  const releaseResponse = await octokit.repos.listReleases({
    owner: 'johnlindquist',
    repo: 'kitapp',
  })

  const releases = releaseResponse.data

  const betaRelease = releases.find((release: any) =>
    release.name.includes('beta'),
  )

  const release = betaRelease?.assets.find(
    (asset: any) =>
      asset.name.includes('beta') &&
      !asset.name.includes('arm') &&
      asset.name.endsWith('.dmg'),
  )

  return release
}
export async function getLatestAppleSiliconRelease() {
  const releaseResponse = await octokit.repos.listReleases({
    owner: 'johnlindquist',
    repo: 'kitapp',
  })

  const releases = releaseResponse.data

  console.log(releases.map((r) => r.name))

  const betaRelease = releases.find((release: any) =>
    release.name.includes('beta'),
  )

  const release = betaRelease?.assets.find(
    (asset: any) =>
      asset.name.includes('beta') &&
      asset.name.includes('arm') &&
      asset.name.endsWith('.dmg'),
  )

  return release
}

import {readdirSync, readFileSync} from 'fs'
import path from 'path'
import {Octokit} from '@octokit/rest'
import findByCommentMarker from './find-by-comment-marker'

export interface Script {
  file: string
  command: string
  content: string
  url: string
  description: string
  author: string
  twitter: string
  github: string
  user: string
}

const usersJSON: {user: string; repo: string}[] = JSON.parse(
  readFileSync(path.join(process.cwd(), 'users.json'), 'utf-8'),
)

export const getUsers = (): string[] => {
  return usersJSON.map((o) => o.user)
}

let userScripts: {[key: string]: Script[]} = {}

export const getUserScripts = async (user: string): Promise<Script[]> => {
  if (userScripts[user]) return userScripts[user]
  const octokit = new Octokit()

  const scriptsResponse = await octokit.request(
    'GET /repos/{owner}/{repo}/contents/{path}',
    {
      owner: user,
      repo: usersJSON.find((o) => o.user === user)?.repo as string,
      path: 'scripts',
    },
  )

  const scriptsDir = scriptsResponse.data as any[]

  const scripts = []

  for await (const script of scriptsDir) {
    const file = script.name
    const url = script.download_url

    const fileResponse = await fetch(url)
    const content = await fileResponse.text()

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
      user,
    })
  }

  userScripts[user] = scripts

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

  return {
    paths,
    fallback: false,
  }
}

export async function getScript(user: string, file: string) {
  const scripts: Script[] = await getUserScripts(user)
  return scripts.find((script) => script.file === file)
}

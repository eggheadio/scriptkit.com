import path from 'path'
import {Octokit} from '@octokit/rest'
import {LoadedScript} from 'utils/types'
import _ from 'lodash'
import {readJson} from 'fs-extra'

const cwd = process.cwd

// const octokit = new Octokit({
//   auth: process.env.GITHUB_SCRIPTKITCOM_TOKEN,
// })

const octokit = new Octokit()

export const getAllScripts = async (): Promise<LoadedScript[]> => {
  let shareScripts = await readJson(
    path.resolve(cwd(), 'public', 'data', 'share.json'),
  )

  let reposScripts = await readJson(
    path.resolve(cwd(), 'public', 'data', 'repo-scripts.json'),
  )

  return shareScripts.concat(reposScripts)
}

export interface UserScripts {
  [user: string]: LoadedScript[]
}

export const getAllScriptsGroupedByUser = async (): Promise<UserScripts> => {
  const scripts = await getAllScripts()

  return _.groupBy(scripts, 'user')
}

export const getAllUsers = async (): Promise<string[]> => {
  const scripts = await getAllScripts()
  const users = scripts.map((s) => s.user)
  return _.uniq(users)
}

export const getScriptsByUser = async (
  user: string,
): Promise<LoadedScript[]> => {
  const scripts = await getAllScripts()

  return scripts.filter((s) => s.user === user)
}

interface ScriptPath {
  paths: {
    params: {
      user: string
      script: string
    }
  }[]
  fallback: boolean
}
export async function getScriptPaths(): Promise<ScriptPath> {
  const paths = []

  const scripts = await getAllScripts()
  for await (const script of scripts) {
    paths.push({
      params: {
        user: script.user,
        script: script.command,
      },
    })
  }

  return {
    paths,
    fallback: false,
  }
}

export async function getScript(
  user: string,
  command: string,
): Promise<LoadedScript | undefined> {
  const scripts = await getAllScripts()
  return scripts.find((d) => user === d.user && command === d.command)
}

export async function getLatestRelease() {
  const releaseResponse = await octokit.repos.listReleases({
    owner: 'johnlindquist',
    repo: 'kitapp',
  })

  const releases = releaseResponse.data

  const mainRelease = releases.find(
    (release: any) =>
      !release.name.includes('beta') && !release.name.includes('alpha'),
  )

  const release = mainRelease?.assets.find(
    (asset: any) =>
      !asset.name.includes('beta') &&
      !asset.name.includes('alpha') &&
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

  const mainRelease = releases.find(
    (release: any) =>
      !release.name.includes('beta') && !release.name.includes('alpha'),
  )

  const release = mainRelease?.assets.find(
    (asset: any) =>
      !asset.name.includes('beta') &&
      !asset.name.includes('alpha') &&
      asset.name.includes('arm') &&
      asset.name.endsWith('.dmg'),
  )

  return release
}
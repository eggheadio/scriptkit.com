import {readdirSync, readFileSync} from 'fs'
import path from 'path'
import findByCommentMarker from './find-by-comment-marker'

const getUserScripts = (user: string) => {
  const gitModules = readFileSync(path.join(process.cwd(), '.gitmodules'), {
    encoding: 'utf-8',
  })

  console.log(gitModules)

  const scriptNames = readdirSync(
    path.join(process.cwd(), '/public/users/', user, 'scripts'),
  )
  const scripts = scriptNames.map((file) => {
    const url = `/users/${user}/scripts/${file}`

    const content = readFileSync(path.join(process.cwd(), 'public', url), {
      encoding: 'utf8',
    })

    const description = findByCommentMarker(content, 'Description:')
    const author = findByCommentMarker(content, 'Author:')
    const twitter = findByCommentMarker(content, 'Twitter:')
    const github = findByCommentMarker(content, 'GitHub:')

    return {
      file,
      command: file.replace('.js', ''),
      content,
      url,
      description,
      author,
      twitter,
      github,
    }
  })

  return scripts
}

export default getUserScripts

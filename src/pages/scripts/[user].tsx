import {readdirSync, readFileSync} from 'fs'
import path from 'path'
import {useRouter} from 'next/router'
import {useState, useEffect} from 'react'

type Script = {
  file: string
  command: string
  content: string
  url: string
  description: string
  author: string
  twitter: string
  github: string
}

export default function Script(props: any) {
  const {scripts} = props

  let [origin, setOrigin] = useState('')
  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  return (
    <div>
      {scripts.map((script: Script) => {
        return (
          <div key={script.file} className="m-1 p-1 outline-black">
            <h2>{script.file}</h2>
            {script.description && <h3>{script.description}</h3>}
            <div className="whitespace-pre-wrap font-mono text-xs">
              {script.content}
            </div>
            {script.author && <div>{script.author}</div>}
            {script.twitter && <div>{script.twitter}</div>}
            {script.github && <div>{script.github}</div>}

            <a
              href={
                `simple://new ` +
                script.command +
                ' --url ' +
                origin +
                script.url
              }
            >
              Install {script.command}
            </a>
          </div>
        )
      })}
    </div>
  )
}

const findByCommentMarker = (code: string, marker: string) => {
  const lines = code.split('\n')

  const descriptionLine = lines.find((line) => line.includes(marker))
  return (
    descriptionLine
      ?.slice(descriptionLine.indexOf(marker) + marker.length)
      .trim() || ''
  )
}

export async function getStaticProps(context: any) {
  console.log(Object.entries(process))

  const {params} = context
  const {user} = params
  const scriptNames = readdirSync(
    path.join(process.cwd(), '/public/scripts/', user),
  )

  const scripts = scriptNames.map((file) => {
    const content = readFileSync(
      path.join(process.cwd(), '/public/scripts/', user, file),
      {encoding: 'utf8'},
    )

    const description = findByCommentMarker(content, 'Description:')
    const author = findByCommentMarker(content, 'Author:')
    const twitter = findByCommentMarker(content, 'Twitter:')
    const github = findByCommentMarker(content, 'GitHub:')

    const url = `/scripts/${user}/${file}`
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

  return {
    props: {scripts}, // will be passed to the page component as props
  }
}

export async function getStaticPaths() {
  const users = readdirSync(path.join(process.cwd(), '/public/scripts'))

  const paths = users.map((user) => `/scripts/` + user)
  return {
    paths,
    fallback: false,
  }
  //   const tags: any = await import('./tags.json').then((data) => data.default)
  //   const tagSlugs: [string] = tags.map(({slug}: {slug: string}) => slug).sort()
  //   const paths = tagSlugs.map((tag) => ({params: {tag}}))
  //   return {
  //     paths,
  //     fallback: false,
  //   }
}

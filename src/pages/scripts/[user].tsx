import {readdirSync, readFileSync} from 'fs'
import path from 'path'
import {useRouter} from 'next/router'
import {useState, useEffect} from 'react'

type Script = {
  file: string
  command: string
  content: string
  url: string
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
          <div key={script.file}>
            <h2>{script.file}</h2>
            <div>{script.content}</div>
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

    const url = `/scripts/${user}/${file}`
    return {
      file,
      command: file.replace('.js', ''),
      content,
      url,
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

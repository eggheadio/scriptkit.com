import * as React from 'react'
import {FunctionComponent} from 'react'
import {readdirSync, readFileSync} from 'fs'
import findByCommentMarker from 'utils/find-by-comment-marker'
import path from 'path'
import Link from 'next/link'
import ScriptDetail from 'components/pages/scripts/detail'
import Header from 'components/pages/scripts/user/header'
import Footer from 'components/footer'
import {NextSeo} from 'next-seo'

export type ScriptProps = {
  script: {
    file: string
    command: string
    content: string
    url: string
    description: string
    author: string
    twitter: string
    github: string
  }
  user: string
}

const Script: FunctionComponent<ScriptProps> = ({script, user}) => {
  return (
    <>
      <NextSeo
        title={`${script.command} script by ${user}`}
        description={script.description || undefined}
      />
      <div className="flex flex-col min-h-screen justify-between items-between">
        <div className="bg-gray-100 p-5 flex-grow">
          <div className="pb-8 max-w-screen-lg mx-auto">
            <Header>
              <div className="font-mono">
                <div className="text-sm">
                  scripts/
                  <Link href={`/scripts/${user}`}>
                    <a className="underline">{user}</a>
                  </Link>
                  /
                </div>
                <div className="text-lg font-bold">{script.command}</div>
              </div>
            </Header>
            <main>
              <ScriptDetail {...script} />
            </main>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export async function getStaticProps(context: any) {
  console.log(Object.entries(process))
  const {params} = context
  const {script, user} = params

  const content = readFileSync(
    path.join(process.cwd(), '/public/scripts/', user, script + '.js'),
    {encoding: 'utf8'},
  )

  const description = findByCommentMarker(content, 'Description:')
  const author = findByCommentMarker(content, 'Author:')
  const twitter = findByCommentMarker(content, 'Twitter:')
  const github = findByCommentMarker(content, 'GitHub:')

  const url = `/scripts/${user}/${script}`

  return {
    props: {
      script: {
        script,
        command: script.replace('.js', ''),
        content,
        url,
        description,
        author,
        twitter,
        github,
      },
      user,
    },
  }
}

export async function getStaticPaths() {
  const users = readdirSync(path.join(process.cwd(), '/public/scripts'))
  const paths = users.map((user) => {
    const scriptNames = readdirSync(
      path.join(process.cwd(), `/public/scripts/${user}`),
    )
    const scripts = scriptNames.map((file) => {
      return {params: {user: user, script: file.replace('.js', '')}}
    })
    return scripts
  })

  console.log(paths[0])

  return {
    paths: paths[0],
    fallback: false,
  }
}

export default Script

import * as React from 'react'
import {FunctionComponent} from 'react'
import {readdirSync, readFileSync} from 'fs'
import findByCommentMarker from 'utils/find-by-comment-marker'
import path from 'path'
import Layout from 'layouts'
import type {ScriptProps} from 'pages/[user]/scripts'
import ScriptDetail from 'components/pages/scripts/detail'

export type ScriptPropsTwo = {
  script: ScriptProps
  user: string
}

const Script: FunctionComponent<ScriptPropsTwo> = ({script, user}) => {
  return (
    <Layout
      meta={{
        title: `${script.command} script by ${user}`,
        description: script.description || undefined,
      }}
    >
      <div className="max-w-screen-lg w-full mx-auto">
        <ScriptDetail {...script} />
      </div>
    </Layout>
  )
}

export async function getStaticProps(context: any) {
  console.log(Object.entries(process))
  const {params} = context
  const {script, user} = params

  const content = readFileSync(
    path.join(process.cwd(), '/public/', user, 'scripts', script + '.js'),
    {encoding: 'utf8'},
  )

  const description = findByCommentMarker(content, 'Description:')
  const author = findByCommentMarker(content, 'Author:')
  const twitter = findByCommentMarker(content, 'Twitter:')
  const github = findByCommentMarker(content, 'GitHub:')

  const url = `/${user}/scripts/${script}`

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
  const users = ['johnlindquist'] //readdirSync(path.join(process.cwd(), '/public/scripts'))
  const paths = users.map((user) => {
    const scriptNames = readdirSync(
      path.join(process.cwd(), `/public/${user}/scripts`),
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

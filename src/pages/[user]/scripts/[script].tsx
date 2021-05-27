import * as React from 'react'
import {FunctionComponent} from 'react'
import Layout from 'layouts'
import type {ScriptProps} from 'pages/[user]'
import ScriptDetail from 'components/pages/scripts/detail'
import {getScriptPaths} from 'utils/get-user-scripts'

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
  const {params} = context
  const {script, user} = params

  return {
    props: {
      script,
      user,
    },
  }
}

export async function getStaticPaths() {
  return await getScriptPaths()
}

export default Script

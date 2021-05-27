import * as React from 'react'
import {FunctionComponent} from 'react'
import Layout from 'layouts'
import ScriptDetail from 'components/pages/scripts/detail'
import {getScript, getScriptPaths, Script} from 'utils/get-user-scripts'

const ScriptComponent: FunctionComponent<{script: Script}> = ({script}) => {
  return (
    <Layout
      meta={{
        title: `${script.command} script by ${script.user}`,
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
      script: await getScript(user, script),
    },
  }
}

export async function getStaticPaths() {
  return await getScriptPaths()
}

export default ScriptComponent

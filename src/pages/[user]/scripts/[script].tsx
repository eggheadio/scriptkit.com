import * as React from 'react'
import {FunctionComponent} from 'react'
import Layout from 'layouts'
import ScriptDetail from 'components/pages/scripts/detail'
import {getScript, getScriptPaths, Script} from 'utils/get-user-scripts'
import Meta from 'components/meta'
import {Discussion, getUserShares} from 'utils/get-discussions'
import DiscussionPost from 'components/discussion-post'

const ScriptComponent: FunctionComponent<{script: Script; share: Discussion}> =
  ({script, share}) => {
    return (
      <Layout
        meta={{
          title: `${script.command} script by ${script.user}`,
          description: script.description || undefined,
        }}
      >
        <Meta
          user={script.user}
          title={script.description || script.command}
          twitter={script.twitter}
        />
        <div className="max-w-screen-lg w-full mx-auto">
          {share ? (
            <DiscussionPost discussion={share} />
          ) : (
            <ScriptDetail {...script} />
          )}
        </div>
      </Layout>
    )
  }

export async function getStaticProps(context: any) {
  const {params} = context
  const {script, user} = params

  const shares = await getUserShares(user)
  const userShare = shares.find((s) => s.slug === script)

  const userScript = await getScript(user, script)

  return {
    props: {
      script: userScript || null,
      share: userShare || null,
    },
  }
}

export async function getStaticPaths() {
  return await getScriptPaths()
}

export default ScriptComponent

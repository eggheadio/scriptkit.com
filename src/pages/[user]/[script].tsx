import * as React from 'react'
import {FunctionComponent} from 'react'
import Layout from 'layouts'
import ScriptDetail from 'components/pages/scripts/detail'
import {getScript, getScriptPaths} from 'utils/get-user-scripts'
import Meta from 'components/meta'
import ScriptMarkdown from 'components/script-markdown'
import {Extension, LoadedScript} from 'utils/types'
import Link from 'components/link'

const ScriptComponent: FunctionComponent<{
  script: LoadedScript
}> = ({script}) => {
  const {user, title, twitter, author, extension} = script
  return (
    <Layout>
      <Meta user={author ? author : user} title={title} twitter={twitter} />

      <div className="max-w-screen-lg w-full mx-auto">
        <Link href={`/${user}`}>
          <a className="flex md:flex-row flex-col-reverse w-full md:items-center justify-between pb-8">
            <div className="md:pt-0 pt-4 flex flex-row items-center justify-center">
              <img
                className="rounded-full h-8 mr-4"
                src={`https://github.com/${user}.png`}
                alt=""
              />
              <h2 className="text-4xl font-bold ">{author ? author : user}</h2>
            </div>
          </a>
        </Link>
        {extension === Extension.md ? (
          <ScriptMarkdown script={script} />
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

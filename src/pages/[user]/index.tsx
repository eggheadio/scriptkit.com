import * as React from 'react'
import {getAllUsers, getScriptsByUser} from 'utils/get-user-scripts'
import _ from 'lodash'
import ScriptCard from 'components/pages/scripts/card'
import Layout from 'layouts'
import {NextSeo} from 'next-seo'

import ScriptMarkdown from 'components/script-markdown'
import Meta from 'components/meta'
import {Extension, LoadedScript} from 'utils/types'

interface UserProps {
  scripts: LoadedScript[]
  user: string
}

export default function User({user, scripts}: UserProps) {
  const author = scripts.find((s: LoadedScript) => s.author)?.author || ''
  const title = `${author ? author : user}`
  let twitter = scripts.find((s: LoadedScript) => s.twitter)?.twitter || ''
  twitter = twitter.startsWith('@') ? twitter.slice(1) : twitter

  return (
    <Layout>
      <Meta author={author} user={user} title={title} />

      <div className="pb-8 max-w-screen-lg mx-auto">
        <header className="flex md:flex-row flex-col-reverse w-full md:items-center justify-between pb-8">
          <div className="md:pt-0 pt-4 flex flex-col">
            <div className="flex flex-row items-center justify-center">
              <img
                className="rounded-full h-8 mr-4"
                src={`https://github.com/${user}.png`}
                alt=""
              />
              <h2 className="text-4xl font-bold ">
                Scripts by {author ? author : user}
              </h2>
            </div>
            {twitter && (
              <a href={`https://twitter.com/${twitter}`} className="">
                @{twitter}
              </a>
            )}
          </div>
        </header>
        <main className={`masonry-1 ${scripts.length > 1 && 'md:masonry-2'}`}>
          {scripts.map((script: LoadedScript) => {
            return script.extension === Extension.md ? (
              <ScriptMarkdown key={script.url} script={script} />
            ) : (
              <ScriptCard key={script.url} script={script} />
            )
          })}
        </main>
      </div>
    </Layout>
  )
}

export async function getStaticProps(context: any) {
  const {params} = context
  const {user} = params

  const scripts = await getScriptsByUser(user)

  return {
    props: {user, scripts}, // will be passed to the page component as props
  }
}

export async function getStaticPaths() {
  const users = await getAllUsers()
  const paths = users.map((user) => `/${user}`)

  return {
    paths,
    fallback: false,
  }
}

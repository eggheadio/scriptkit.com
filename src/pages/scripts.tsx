import * as React from 'react'
import {getAllScriptsGroupedByUser, UserScripts} from 'utils/get-user-scripts'
import Layout from 'layouts'
import Link from 'components/link'
import Meta from 'components/meta'
import {LoadedScript} from 'utils/types'

// interface UserScripts {
//   [key: string]: Script[]
// }

interface AllScriptProps {
  userScripts: UserScripts
}

export default function AllScripts({userScripts}: AllScriptProps) {
  return (
    <Layout>
      <Meta title={`Community Scripts`} />

      <div className="pb-8 max-w-screen-lg mx-auto">
        {/* <Header>
            <div className="font-mono">
              <div className="text-sm">scripts/</div>
              <div className="text-lg font-bold">{props.user}</div>
            </div>
          </Header> */}
        <header className="flex md:flex-row flex-col-reverse w-full md:items-center justify-between pb-8">
          <div className="md:pt-0 pt-4">
            <h1 className="text-4xl font-bold ">Community Scripts</h1>
          </div>
          {/* <Search searchValue={searchValue} setSearchValue={setSearchValue} /> */}
        </header>
        <main className="md:masonry-2 lg:masonry-3">
          {Object.entries(userScripts).map(([, scripts]) => {
            const {user} = scripts[0]

            const author =
              scripts.find((s: LoadedScript) => s.author)?.author || ''

            let twitter =
              scripts.find((s: LoadedScript) => s.twitter)?.twitter || ''
            twitter = twitter.startsWith('@') ? twitter.slice(1) : twitter

            return (
              <div
                key={user}
                className="border-4 border-white border-opacity-50 p-4 rounded-xl m-2 break-inside"
              >
                <div className="mb-2">
                  <Link href={`/${user}`}>
                    <a className="md:text-3xl text-2xl font-bold leading-tight text-white hover:underline flex flex-row-reverse items-center justify-between">
                      <img
                        className="rounded-full h-12 mr-2"
                        src={`https://github.com/${user}.png`}
                        alt=""
                      />
                      <h2>{author ? author : user}</h2>
                    </a>
                  </Link>
                  {twitter && (
                    <a
                      className="hover:underline"
                      href={`https://twitter.com/${twitter}`}
                    >
                      @{twitter}
                    </a>
                  )}
                </div>
                {scripts.map(({command, url, title, description}) => {
                  return (
                    <div key={url} className="py-4">
                      <Link href={`/${user}/${command}`}>
                        <a className="md:text-2xl text-xl font-semibold leading-tight text-yellow-300 hover:underline">
                          <h2>{title}</h2>
                        </a>
                      </Link>
                      {description && <div>{description}</div>}
                    </div>
                  )
                })}
              </div>
            )
            // return script.extension === Extension.md ? (
            //   <ScriptMarkdown script={script} />
            // ) : (
            //   <ScriptCard key={script.user + script.command} script={script} />
            // )
          })}
        </main>
      </div>
    </Layout>
  )
}

export async function getStaticProps(context: any) {
  const userScripts = await getAllScriptsGroupedByUser()

  return {
    props: {userScripts}, // will be passed to the page component as props
  }
}

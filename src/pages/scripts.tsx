import * as React from 'react'
import {
  getAllScripts,
  getUsers,
  getUserScripts,
  Script,
} from 'utils/get-user-scripts'
import {useRouter} from 'next/router'
import {useState, useEffect} from 'react'
import {find, get, first, findIndex} from 'lodash'
import {DialogOverlay, DialogContent} from '@reach/dialog'
import Fuse from 'fuse.js'
import ScriptCard from 'components/pages/scripts/card'
import ScriptDetail from 'components/pages/scripts/detail'
import Header from 'components/pages/scripts/[user]/header'
import Layout from 'layouts'
import {NextSeo} from 'next-seo'

// interface UserScripts {
//   [key: string]: Script[]
// }

interface AllScriptProps {
  scripts: Script[]
}

export default function AllScripts({scripts}: AllScriptProps) {
  const router = useRouter()

  let [origin, setOrigin] = useState('')
  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  const [currentScript, setCurrentScript] = React.useState<{id?: any}>({id: ''}) // using currentScript.command as id

  const nextScript =
    currentScript.id &&
    scripts[findIndex(scripts, {command: currentScript.id}) + 1]
  const prevScript =
    currentScript.id &&
    scripts[findIndex(scripts, {command: currentScript.id}) - 1]

  useEffect(() => {
    router.query.s && setCurrentScript({id: get(router.query, 's')})
  }, [])

  const searchOptions: Fuse.IFuseOptions<Script> = {
    includeScore: true,
    keys: ['command', 'content', 'description'],
  }
  const [searchValue, setSearchValue] = React.useState('')

  const fuse = new Fuse(scripts, searchOptions)
  const searchResult = fuse.search(searchValue)
  const searchOn: boolean = searchValue.length > 0

  const handleOpenScriptDetail = (script: Script) => {
    setCurrentScript({id: script.command})
    router.push(
      {query: {s: script.command, user: script.user}},
      `/${script.user}/${script.command}`,
    )
  }

  const handleViewNextScript = (script: Script) => {
    setCurrentScript({id: script.command})
    router.push(
      {query: {s: script.command, user: script.user}},
      `/${script.user}/${script.command}`,
    )
  }
  const handleViewPrevScript = (script: Script) => {
    setCurrentScript({id: script.command})
    router.push(
      {query: {s: script.command, user: script.user}},
      `/${script.user}/${script.command}`,
    )
  }

  const handleDismissScriptDetail = () => {
    setCurrentScript({})
    router.push(`/scripts`, undefined, {
      shallow: true,
    })
  }

  return (
    <Layout>
      <NextSeo title={`Community Scripts`} />

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
          <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        </header>
        <main className="grid md:grid-cols-2 grid-cols-1 gap-6">
          {searchOn
            ? searchResult.map(({item: script}: any) => {
                return (
                  <ScriptCard
                    key={script.command}
                    origin={origin}
                    script={script}
                  />
                )
              })
            : scripts.map((script: Script) => {
                return (
                  <ScriptCard
                    key={script.command}
                    origin={origin}
                    script={script}
                  />
                )
              })}
        </main>
      </div>
    </Layout>
  )
}

const Search: React.FC<any> = ({searchValue, setSearchValue}) => {
  return (
    <div>
      <label className="sr-only" htmlFor="search">
        Search scripts
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
          <svg
            className="h-4 w-4 text-gray-200"
            aria-hidden="true"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none">
              <path
                d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>
        <input
          name="search"
          id="search"
          className="pl-7 bg-transparent rounded-lg border border-gray-800 focus:border-yellow-300 md:w-64 w-full focus:ring-0 text-sm leading-4"
          placeholder="Search scripts"
          onChange={(e) => {
            setSearchValue(e.target.value)
          }}
          value={searchValue}
          type="search"
          autoComplete="off"
        />
      </div>
    </div>
  )
}

export async function getStaticProps(context: any) {
  const scripts = await getAllScripts()

  return {
    props: {scripts}, // will be passed to the page component as props
  }
}

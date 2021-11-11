import * as React from 'react'
import {FunctionComponent} from 'react'
import Lottie from 'react-lottie'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {readFileSync} from 'fs'
import path from 'path'
import ScriptCard from 'components/pages/scripts/card'
import Layout from 'layouts'
import {
  getAllScripts,
  getLatestAppleSiliconRelease,
  getLatestRelease,
} from 'utils/get-user-scripts'
import {LoadedScript} from 'utils/types'
import KitAppUI from 'components/kitapp-ui'
import DownloadKitApp from 'components/download-kitapp'
import HeroAnimation from '../../public/assets/particles.json'

export type Release = {
  name: string
  browser_download_url: string
}

type HomeProps = {
  featuredScripts: LoadedScript[]
  macIntelRelease: Release
  macSilliconRelease: Release
}

const links = [
  {
    label: 'Community examples',
    url: 'https://github.com/johnlindquist/kit/discussions/categories/show-and-tell',
  },
  {
    label: 'Quick orientation guide',
    url: 'https://github.com/johnlindquist/kit/discussions/131',
  },
  {
    label: 'Watch livestreams building Script Kit',
    url: 'https://www.youtube.com/c/johnlindquist/videos',
  },
  {
    label: 'Announcements',
    url: 'https://github.com/johnlindquist/kit/discussions/categories/announcements',
  },
  {
    label: 'Ask a question',
    url: 'https://github.com/johnlindquist/kit/discussions/new',
  },
  {
    label: 'Join mailing list',
    url: '', // TODO
  },
]

const Home: FunctionComponent<HomeProps> = ({
  featuredScripts,
  macIntelRelease,
  macSilliconRelease,
}) => {
  const router = useRouter()
  let [origin, setOrigin] = React.useState('')
  React.useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  return (
    <Layout>
      <header className="sm:pt-10 pt-2 pb-10">
        <div className="flex items-center justify-center">
          <div className="w-full flex flex-col items-center justify-center text-center space-y-1">
            <div className="sm:pb-32 pb-24 pt-8">
              <h1 className="lg:text-6xl sm:text-5xl text-4xl font-bold tracking-tight leading-tighter">
                Shortcut for Everything
                <sup className="px-2 py-1 rounded-full bg-indigo-500 text-xs font-bold tracking-normal font-mono inline-flex transform sm:-translate-y-6 -translate-y-4 ml-1">
                  beta
                </sup>
              </h1>

              <h2 className="sm:text-xl text-lg opacity-80 font-light pt-2 leading-tight md:max-w-none max-w-xs mx-auto">
                Automate your daily workflows as a professional developer
              </h2>
            </div>
            <div className="relative bg-gradient-to-tr from-fuchsia-500 via-rose-500 to-yellow-500 w-full flex items-center justify-center p-5 pb-0 rounded-lg max-w-screen-md">
              <div className="max-w-screen-sm h-full flex w-full relative z-20 md:-translate-y-24 -translate-y-20 shadow-xl">
                <KitAppUI scripts={featuredScripts} />
              </div>
              <div className="absolute left-0 top-0 w-full h-full opacity-50 mix-blend-overlay pointer-events-none">
                <Lottie
                  speed={0.1}
                  options={{
                    animationData: HeroAnimation,
                    rendererSettings: {
                      preserveAspectRatio: 'xMidYMid slice',
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-xl mx-auto w-full -translate-y-8">
          <DownloadKitApp
            macIntelRelease={macIntelRelease}
            macSilliconRelease={macSilliconRelease}
          />
        </div>
      </header>
      <main className="max-w-screen-lg mx-auto space-y-10 flex-grow sm:py-32 w-full px-5">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
          <div>
            <h2 className="text-3xl font-bold">What is Script Kit?</h2>
            <div className="prose pt-4 max-w-none">
              <p>
                How often do you avoid scripting something because it takes too
                much effort?
              </p>
              <p></p>
              <p>
                Script Kit makes it easy to create and run scripts that solve
                your daily problems. Create a new script from the prompt then
                your script opens in the editor of your choice. Write a few
                lines of JavaScript. Then run the script from the prompt.
              </p>
              <p>
                Simply put, Script Kit helps you script away the friction of
                your day.
              </p>
            </div>
            <div className="pt-10">
              <h3 className="text-3xl font-bold">Key Features</h3>
              <ul>
                <li className="pt-3">
                  <span className="pr-3 text-yellow-300 text-lg">▪︎</span>
                  Launch the prompt from anywhere as part of your flow
                </li>
                <li className="pt-3">
                  <span className="pr-3 text-yellow-300 text-lg">▪︎</span>
                  Add keyboard shortcuts with comments:{''}
                  <code className="whitespace-nowrap font-mono text-sm bg-yellow-500 bg-opacity-10 py-1 rounded-md text-yellow-300 px-2 ml-2">
                    //Shortcut: opt a
                  </code>
                </li>
                <li className="pt-3">
                  <span className="pr-3 text-yellow-300 text-lg">▪︎</span>
                  Prompt for input with:{''}
                  <code className="whitespace-nowrap font-mono text-sm bg-yellow-500 bg-opacity-10 py-1 rounded-md text-yellow-300 px-2 ml-2">
                    await arg("First name")
                  </code>
                </li>
                <li className="pt-3">
                  <span className="pr-3 text-yellow-300 text-lg">▪︎</span>
                  Prompt for environment vars:{''}
                  <code className="whitespace-nowrap font-mono text-sm bg-yellow-500 bg-opacity-10 py-1 rounded-md text-yellow-300 px-2 ml-2">
                    await env("GITHUB_TOKEN")
                  </code>
                </li>
                <li className="pt-3">
                  <span className="pr-3 text-yellow-300 text-lg">▪︎</span>
                  Load npm libraries:{''}
                  <code className="whitespace-nowrap font-mono text-sm bg-yellow-500 bg-opacity-10 py-1 rounded-md text-yellow-300 px-2 ml-2">
                    await npm("sharp")
                  </code>
                </li>
                <li className="pt-3">
                  <span className="pr-3 text-yellow-300 text-lg">▪︎</span>
                  Share scripts directly from the prompt
                </li>
                <li className="pt-3">
                  <span className="pr-3 text-yellow-300 text-lg">▪︎</span>
                  Launch scripts from a Stream Deck button
                </li>
                <li className="pt-3">
                  <span className="pr-3 text-yellow-300 text-lg">▪︎</span>
                  Scripts behave the same in your terminal
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold">Learn more</h3>
            <div className="pt-4 prose">
              <p>
                Script Kit includes a built-in tutorial and myriad examples are
                available on our discussions pages:
              </p>
            </div>
            <ul className="pt-4 font-semibold">
              {links
                .filter((link) => link.url)
                .map((link) => {
                  return (
                    <li key={link.url}>
                      <Link href={link.url}>
                        <a
                          target="_blank"
                          className="group bg-gradient-to-l from-transparent to-transparent hover:from-gray-900 bg-opacity-5 flex sm:py-4 py-3 pl-6 text-lg border-b border-white border-opacity-10 relative transition-all ease-in-out duration-300"
                        >
                          <span className="absolute left-0 pr-3 transform group-hover:text-transparent text-yellow-300 group-hover:translate-x-2 -translate-x-0 transition-all duration-200 ease-in-out">
                            ▪︎
                          </span>
                          <span className="absolute left-0 pr-3 transform group-hover:text-yellow-300 text-transparent group-hover:-translate-x-1 -translate-x-4 transition-all duration-200 ease-in-out">
                            →
                          </span>
                          <span>{link.label}</span>
                        </a>
                      </Link>
                    </li>
                  )
                })}
            </ul>
          </div>
        </div>
      </main>
      <section className="max-w-screen-lg mx-auto pt-8 px-5">
        {featuredScripts?.length > 0 && (
          <div className="w-full pt-8">
            <h2 className="text-3xl font-bold pb-4">Featured Scripts</h2>
            <div className="max-w-screen-lg w-full mx-auto grid md:grid-cols-2 grid-cols-1 gap-5">
              {featuredScripts.map((script: LoadedScript) => {
                return (
                  <ScriptCard script={script} key={script.command} withAuthor />
                )
              })}
            </div>
            {/* <div className="flex w-full items-center justify-center py-16">
                <Link href="/scripts/johnlindquist">
                  <a className="inline-flex py-3 px-4 rounded-md bg-black text-white text-sm font-mono">
                    Browse all scripts
                  </a>
                </Link>
              </div> */}
          </div>
        )}
      </section>
    </Layout>
  )
}

export async function getStaticProps(context: any) {
  const macIntelRelease = await getLatestRelease()
  const macSilliconRelease = await getLatestAppleSiliconRelease()

  const selectedScripts: {user: string; command: string}[] = JSON.parse(
    readFileSync(path.join(process.cwd(), 'featured.json'), 'utf-8'),
  )

  const scripts = await getAllScripts()

  const featuredScripts = scripts.filter((s) => {
    return selectedScripts.find(
      (ss) => ss.user === s.user && ss.command === s.command,
    )
  })

  return {
    props: {featuredScripts, macIntelRelease, macSilliconRelease}, // will be passed to the page component as props
  }
}

export default Home

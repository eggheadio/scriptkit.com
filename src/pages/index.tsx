import * as React from 'react'
import {FunctionComponent} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {readFileSync} from 'fs'
import findByCommentMarker from 'utils/find-by-comment-marker'
import path from 'path'
import ScriptCard from 'components/pages/scripts/card'
import Layout from 'layouts'
import AnimatedHeaderImage from 'components/pages/landing/image'
import {
  getLatestAppleSiliconRelease,
  getLatestRelease,
  getUsers,
  getUserScripts,
  Script,
} from 'utils/get-user-scripts'

type HomeProps = {
  featuredScripts: Script[]
  release: {name: string; browser_download_url: string}
  appleSiliconRelease: {name: string; browser_download_url: string}
}

const links = [
  {
    label: 'Community examples',
    url:
      'https://github.com/johnlindquist/kit/discussions/categories/show-and-tell',
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
    url:
      'https://github.com/johnlindquist/kit/discussions/categories/announcements',
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
  release,
  appleSiliconRelease,
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
          <div className="flex flex-col items-center justify-center text-center space-y-1">
            <div className="relative flex">
              {/* <AnimatedHeaderImage /> */}
              <Image
                src="/scriptkit@2x.png"
                width={2408 / 4.3}
                height={1540 / 4.3}
                quality={100}
                priority={true}
              />
              <div className="sm:block hidden absolute w-px h-4 top-11 left-3 z-10 bg-white animate-blink duration-75" />
            </div>
            <div className="sm:pt-14 pt-8">
              <h1 className="sm:text-6xl text-5xl font-bold tracking-tight leading-tighter">
                Automation for Developers
                <sup className="px-2 py-1 rounded-full bg-indigo-500 text-xs font-bold tracking-normal font-mono inline-flex transform sm:-translate-y-6 -translate-y-4 ml-1">
                  beta
                </sup>
              </h1>
              <h2 className="sm:text-2xl text-xl opacity-90 font-light pt-1 leading-tighter">
                <span>Making scripts easy to run, write, and share</span>{' '}
              </h2>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full pt-8 flex-wrap">
          <div className="flex flex-col items-center px-4 pt-4">
            <a
              className="flex-col transform hover:scale-105 ease-in-out duration-200 transition-all inline-flex items-center justify-center rounded-lg bg-gradient-to-t from-amber-400 to-yellow-300 text-black px-6 pt-4 pb-3 text-lg font-bold leading-tighter"
              href={release?.browser_download_url}
              onMouseUp={(e) => {
                e.preventDefault()
                fetch('/api/update-twitter-count')
              }}
            >
              Download Kit.app beta for Mac
              <p className="text-sm">(Intel)</p>
            </a>
            <div className="pt-4 text-sm opacity-80">{release?.name}</div>
          </div>
          <div className="flex flex-col items-center px-4 pt-4">
            <a
              className="flex-col transform hover:scale-105 ease-in-out duration-200 transition-all inline-flex items-center justify-center rounded-lg bg-gradient-to-t from-amber-400 to-yellow-300 text-black px-6 pt-4 pb-3 text-lg font-bold leading-tighter"
              href={appleSiliconRelease?.browser_download_url}
              onMouseUp={(e) => {
                e.preventDefault()
                fetch('/api/update-twitter-count')
              }}
            >
              Download Kit.app beta for Mac
              <p className="text-sm">(Apple Silicon)</p>
            </a>
            <div className="pt-4 text-sm opacity-80">
              {appleSiliconRelease?.name}
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-screen-lg mx-auto space-y-10 flex-grow sm:py-32 py-16 w-full">
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
                    <li>
                      <Link href={link.url}>
                        <a
                          target="_blank"
                          className="group bg-gradient-to-l from-transparent to-transparent hover:from-gray-900 bg-opacity-5 flex sm:py-5 py-4 pl-6 text-lg border-b border-white border-opacity-10 relative transition-all ease-in-out duration-300"
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
      <section className="max-w-screen-lg mx-auto">
        {featuredScripts?.length > 0 && (
          <div className="w-full pt-8">
            <h2 className="text-3xl font-bold pb-4">Featured Scripts</h2>
            <div className="max-w-screen-lg w-full mx-auto grid md:grid-cols-2 grid-cols-1 gap-5">
              {featuredScripts.map((script: Script) => {
                return (
                  <ScriptCard
                    handleOpenScriptDetail={() =>
                      router.push(`/${script?.user}/scripts/${script.command}`)
                    }
                    script={script}
                    key={script.command}
                    origin={origin}
                    withAuthor
                  />
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
  const release = await getLatestRelease()
  const appleSiliconRelease = await getLatestAppleSiliconRelease()

  const selectedScripts: {user: string; script: string}[] = JSON.parse(
    readFileSync(path.join(process.cwd(), 'featured.json'), 'utf-8'),
  )

  const users = getUsers()
  const featuredScripts = []

  for (const user of users) {
    const scripts = await getUserScripts(user)
    for (const script of scripts) {
      if (
        selectedScripts.find((s) => s.user === user && s.script === script.file)
      ) {
        featuredScripts.push(script)
      }
    }
  }

  return {
    props: {featuredScripts, release, appleSiliconRelease}, // will be passed to the page component as props
  }
}

export default Home

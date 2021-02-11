import * as React from 'react'
import {FunctionComponent} from 'react'
import Link from 'next/link'
import Logo from 'images/logo.svg'

import ClipboardIcon from 'images/clipboard.svg'
import CheckIcon from 'images/check.svg'
import Markdown from 'react-markdown'
import {useCopyToClipboard} from 'react-use'
import {readFileSync} from 'fs'
import findByCommentMarker from 'utils/find-by-comment-marker'
import path from 'path'
import ScriptCard from 'components/pages/scripts/card'
import {ScriptProps} from 'pages/scripts/[user]'
import Footer from 'components/footer'

const content = {
  headline: 'Automate Anything',
  description: 'Scripting made fun.',
  install:
    'export SIMPLE_PATH=~/.simple; curl -o- https://simplescripts.dev/api/install | sh; export PATH=$PATH:$SIMPLE_PATH/bin',
  gettingStarted: `Run \`simple\` in your shell to launch an interactive prompt to train you to write your own scripts.`,
  discuss: `[GitHub Discussions](https://github.com/johnlindquist/simplescripts/discussions)`,
}

type HomeProps = {
  featuredScripts: ScriptProps[]
  release: {name: string; browser_download_url: string}
}

const Home: FunctionComponent<HomeProps> = ({featuredScripts, release}) => {
  let [origin, setOrigin] = React.useState('')
  React.useEffect(() => {
    setOrigin(window.location.origin)
  }, [])
  const [copied, setCopied] = React.useState(false)
  const [, copyToClipboard] = useCopyToClipboard()
  const installInputRef = React.createRef<HTMLInputElement>()
  const handleCopyToClipboard = () => {
    copyToClipboard(content.install)
    setCopied(true)
    installInputRef.current && installInputRef.current.select()
    setTimeout(() => setCopied(false), 1000)
  }

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <div className="flex flex-col flex-grow px-8">
        <header className="flex items-center justify-center sm:py-16 py-10">
          <div className="flex flex-col items-center justify-center text-center space-y-1">
            <Logo className="text-yellow-300" />
            <div className="font-bold tracking-tight leading-tighter text-lg">
              Simple Scripts
            </div>
            <div className="pt-14 space-y-6">
              <h1 className="sm:text-6xl text-4xl font-bold tracking-tight leading-tight">
                {content.headline}
              </h1>
              {/* <Markdown
                className="text-center text-gray-800 font-light leading-tight max-w-xl font-mono text-base"
                source={content.description}
              /> */}
            </div>
          </div>
        </header>
        <main className="max-w-screen-md mx-auto space-y-10 flex-grow pb-24 w-full">
          {/* <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold">Install</h3>
            <div className="relative max-w-lg w-full mx-auto flex">
              <input
                ref={installInputRef}
                readOnly
                onClick={handleCopyToClipboard}
                type="text"
                className="focus:outline-none focus:border-yellow-400 focus:ring-inset focus:ring-1 focus:ring-yellow-400 form-input border-gray-200 w-full font-mono text-sm rounded-l-md bg-gray-100 px-4 py-2"
                value={content.install}
              />
              <button
                className="rounded-r-md bg-gray-100 border border-gray-200 p-2"
                type="button"
                onClick={handleCopyToClipboard}
              >
                {copied ? (
                  <CheckIcon className="text-yellow-500" />
                ) : (
                  <ClipboardIcon />
                )}
              </button>
            </div>
          </div> */}
          {/* <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold">Get Started</h3>
            <Markdown
              className="prose max-w-sm mx-auto"
              source={content.gettingStarted}
            />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold">Ask a Question</h3>
            <Markdown
              className="prose max-w-sm mx-auto underline"
              source={content.discuss}
            />
          </div> */}
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold">Download</h3>
            <a className="underline" href={release.browser_download_url}>
              {release.name}
            </a>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold">Browse Starter Scripts</h3>
            <a className="underline" href={`/scripts/johnlindquist`}>
              simplescripts.dev/scripts/johnlindquist
            </a>
            <p className="text-xs">Community Scripts Coming Soon 👀</p>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold">Ask a Question</h3>
            <Markdown
              className="prose max-w-sm mx-auto underline"
              source={content.discuss}
            />
          </div>
        </main>
      </div>
      {featuredScripts.length > 0 && (
        <div className="w-full bg-gray-100 px-5">
          <h2 className="text-center md:text-3xl text-2xl font-bold tracking-tight py-16">
            Featured Scripts
          </h2>
          <div className="max-w-screen-lg w-full mx-auto grid md:grid-cols-2 grid-cols-1 gap-5">
            {featuredScripts.map((script: ScriptProps) => {
              return (
                <ScriptCard
                  script={script}
                  key={script.file}
                  origin={origin}
                  withAuthor
                />
              )
            })}
          </div>
          <div className="flex w-full items-center justify-center py-16">
            <Link href="/scripts/johnlindquist">
              <a className="inline-flex py-3 px-4 rounded-md bg-black text-white text-sm font-mono">
                Browse all scripts
              </a>
            </Link>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const response = await fetch(
    `https://api.github.com/repos/johnlindquist/simple/releases`,
  )

  const release = (await response.json())[0].assets.filter((asset: any) =>
    asset.name.endsWith('.dmg'),
  )[0]

  console.log(release.name)
  console.log(release.browser_download_url)

  const featuredScripts: any[] = [
    // {
    //   user: 'johnlindquist',
    //   script: 'book-search.js',
    // },
    // {
    //   user: 'johnlindquist',
    //   script: 'image-resize.js',
    // },
    // {
    //   user: 'johnlindquist',
    //   script: 'pad.js',
    // },
    // {
    //   user: 'johnlindquist',
    //   script: 'read-news.js',
    // },
  ]
  const scripts =
    featuredScripts &&
    featuredScripts.map((file) => {
      const content = readFileSync(
        path.join(process.cwd(), '/public/scripts', file.user, file.script),
        {encoding: 'utf8'},
      )

      const description = findByCommentMarker(content, 'Description:')
      const author = findByCommentMarker(content, 'Author:')
      const twitter = findByCommentMarker(content, 'Twitter:')
      const github = findByCommentMarker(content, 'GitHub:')

      const url = `/scripts/${file.user}/${file.script}.js`
      return {
        file,
        command: file.script.replace('.js', ''),
        content,
        url,
        description,
        author,
        twitter,
        github,
      }
    })

  return {
    props: {featuredScripts: scripts, release}, // will be passed to the page component as props
  }
}

export default Home

import * as React from 'react'
import {FunctionComponent} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {readFileSync} from 'fs'
import findByCommentMarker from 'utils/find-by-comment-marker'
import path from 'path'
import ScriptCard from 'components/pages/scripts/card'
import {ScriptProps} from 'pages/scripts/[user]'
import Layout from 'layouts'
import HeaderImage from 'components/pages/landing/image'

const content = {
  title: 'Automation for Developers',
  gettingStarted: `Run \`kit\` in your shell to launch an interactive prompt to train you to write your own scripts.`,
  discuss: `[GitHub Discussions](https://github.com/johnlindquist/kit/discussions)`,
}

type HomeProps = {
  featuredScripts: ScriptProps[]
  release: {name: string; browser_download_url: string}
}

const Home: FunctionComponent<HomeProps> = ({featuredScripts, release}) => {
  const router = useRouter()
  let [origin, setOrigin] = React.useState('')
  React.useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  const links = [
    {
      label: 'Browse community examples',
      url:
        'https://github.com/johnlindquist/kit/discussions/categories/show-and-tell',
    },
    {
      label: 'Ask a question',
      url: 'https://github.com/johnlindquist/kit/discussions/new',
    },
    {
      label: 'Watch livestreams about Script Kit',
      url: 'https://www.youtube.com/c/johnlindquist/videos',
    },
    {
      label: 'Join mailing list',
      url: '', // TODO
    },
  ]
  return (
    <Layout>
      <div className="flex flex-col flex-grow">
        <header className="flex items-center justify-center py-10">
          <div className="flex flex-col items-center justify-center text-center space-y-1">
            <HeaderImage />
            <div className="pt-14 space-y-6">
              <h1 className="sm:text-6xl text-4xl font-bold tracking-tight leading-tight">
                {content.title}
              </h1>
            </div>
          </div>
        </header>
        <main className="max-w-screen-lg mx-auto space-y-10 flex-grow pb-24 w-full">
          <div className="flex flex-col items-center">
            <a
              className="transform hover:scale-105 ease-in-out duration-200 transition-all inline-flex items-center justify-center rounded-lg bg-gradient-to-t from-amber-400 to-yellow-300 text-black px-8 py-5 text-lg font-bold leading-tighter"
              href={release?.browser_download_url}
            >
              Download Kit.app beta for Mac
            </a>
            <div className="pt-4 text-sm opacity-80">{release?.name}</div>
          </div>
          <div className="pt-24 grid md:grid-cols-2 grid-cols-1 gap-8">
            <div>
              <h2 className="text-3xl font-bold">What is it?</h2>
              <div className="prose pt-4 max-w-none">
                <p>
                  Scelerisque nec eros integer potenti vitae laoreet sagittis
                  habitant dui feugiat cum pulvinar metus dignissim egestas
                  euismod commodo rutrum, nullam convallis a aliquam interdum
                  tortor sit diam mus netus orci enim consectetur porttitor ac
                  ut velit.
                </p>
                <p>
                  Id netus habitant urna sit ultricies nam inceptos, placerat
                  facilisis consequat class ipsum rutrum himenaeos integer, per
                  risus scelerisque magnis primis eleifend.
                </p>
                <p>
                  Placerat nulla rhoncus ad arcu erat egestas eu in at natoque,
                  augue risus parturient sollicitudin fusce gravida dui tempus
                  id diam, laoreet libero tellus pharetra litora varius euismod
                  viverra a.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold">Learn more</h2>
              <div className="pt-4">
                <p>
                  ScriptKit is currently in beta and I'm still working on
                  documentation and educational material.
                </p>
              </div>
              <ul className="pt-4 font-semibold">
                {links
                  .filter((link) => link.url)
                  .map((link) => {
                    return (
                      <li>
                        <a
                          href={link.url}
                          className="group flex py-4 text-lg border-b border-white border-opacity-10"
                        >
                          <span className="text-yellow-300 pr-3 transform group-hover:-translate-x-1 transition-all duration-200 ease-in-out">
                            ▪︎
                          </span>
                          <span>{link.label}</span>
                        </a>
                      </li>
                    )
                  })}
              </ul>
            </div>
          </div>
          {/* <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold space-y-2">Browse Scripts</h3>
            <Link href="/scripts/johnlindquist">
              <a className="underline py-2">
                scriptkit.app/scripts/johnlindquist
              </a>
            </Link>
            <p className="text-xs">
              <span className="italic">Community Scripts Coming Soon</span> 👀
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold">Ask a Question</h3>
            <Markdown
              className="prose max-w-sm mx-auto underline"
              source={content.discuss}
            />
          </div> */}
          {featuredScripts?.length > 0 && (
            <div className="w-full pt-8">
              <h2 className="text-3xl font-bold pb-4">Featured Scripts</h2>
              <div className="max-w-screen-lg w-full mx-auto grid md:grid-cols-2 grid-cols-1 gap-5">
                {featuredScripts.map((script: ScriptProps) => {
                  console.log(script)
                  return (
                    <ScriptCard
                      handleOpenScriptDetail={() =>
                        router.push(
                          `/scripts/${script?.file?.user}/${script.command}`,
                        )
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
        </main>
      </div>
    </Layout>
  )
}

export async function getStaticProps(context: any) {
  const response = await fetch(
    `https://api.github.com/repos/johnlindquist/kitapp/releases`,
  )

  const release = (await response.json())[0].assets.filter((asset: any) =>
    asset.name.endsWith('.dmg'),
  )[0]

  console.log(release.name)
  console.log(release.browser_download_url)

  const featuredScripts: any[] = [
    {
      user: 'johnlindquist',
      script: 'book-search.js',
    },
    {
      user: 'johnlindquist',
      script: 'image-resize.js',
    },
    {
      user: 'johnlindquist',
      script: 'color-convert.js',
    },
    {
      user: 'johnlindquist',
      script: 'read-news.js',
    },
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

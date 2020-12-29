import React from 'react'
import Logo from '../images/logo.svg'
import JohnIcon from '../images/john.svg'
import GitHubIcon from '../images/github.svg'
import ClipboardIcon from '../images/clipboard.svg'
import CheckIcon from '../images/check.svg'
import Markdown from 'react-markdown'
import {useCopyToClipboard} from 'react-use'

const content = {
  headline: 'Automate Anything',
  description: 'Scripting made fun.',
  install:
    'curl -o- https://simplescripts.dev/api/install | SIMPLE_PATH=~/.simple sh; export PATH=$PATH:$SIMPLE_PATH/bin',
  gettingStarted: `Run \`simple\` in your shell to launch an interactive prompt to train you to write your own scripts.`,
  discuss: `[GitHub Discussions](https://github.com/johnlindquist/simplescripts/discussions)`,
}

export default function Home() {
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
              <Markdown
                className="text-center text-gray-800 font-light sm:text-2xl text-xl leading-tight max-w-xl"
                source={content.description}
              />
            </div>
          </div>
        </header>
        <main className="max-w-screen-md mx-auto space-y-10 flex-grow pb-24 w-full">
          <div className="text-center space-y-2">
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
          </div>
          <div className="text-center space-y-2">
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
          </div>
        </main>
      </div>
      <footer className="w-full bg-gray-50 sm:py-16 py-8 px-8">
        <div className="max-w-screen-lg mx-auto flex items-center justify-between">
          <a href="https://johnlindquist.com">
            <div className="flex space-x-2 items-center">
              <JohnIcon />
              <div>
                <div className="uppercase tracking-wide text-xs">
                  Created By
                </div>
                <div className="text-xl font-semibold">John Lindquist</div>
              </div>
            </div>
          </a>
          <div className="flex items-center space-x-4">
            <a
              className="flex items-center space-x-1"
              href="https://github.com/johnlindquist/simplescripts"
            >
              <GitHubIcon />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

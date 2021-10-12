import * as React from 'react'
import Link from 'next/link'
import {FunctionComponent} from 'react'
import CodeBlock from 'components/code-block'
import createInstallLink from '../../../utils/createInstallLink'
import {Extension, LoadedScript} from 'utils/types'
import {Language} from 'prism-react-renderer'
import ReactMarkdown from 'react-markdown'
import theme from 'prism-react-renderer/themes/nightOwl'
import InstallScriptButton from 'components/install-script-button'

type ScriptCardProps = {
  script: LoadedScript
  handleOpenScriptDetail?: (script: LoadedScript) => void
  withAuthor?: boolean
}

const ScriptCard: FunctionComponent<ScriptCardProps> = ({
  script,
  withAuthor = true,
}) => {
  console.log(script.content)
  return (
    <article className="rounded-lg overflow-hidden flex flex-col max-h-[500px] min-h-[500px] bg-gray-900">
      <header className=" relative">
        <Link href={`/${script.user}/${script.command}`}>
          <a className="group bg-gray-800 flex flex-col hover:bg-gray-700 hover:bg-opacity-50 transition-all ease-in-out duration-200">
            <div className="flex items-start px-6 pt-6">
              <div className="flex-grow">
                <Link href={`/${script.user}/${script.command}`}>
                  <a>
                    <h2 className="md:text-2xl text-xl font-bold leading-tight">
                      {script.command}
                    </h2>
                  </a>
                </Link>
                {withAuthor && (
                  <div className="flex space-x-2 font-xs text-sm opacity-70">
                    {script.author && <div>by {script.author}</div>}
                  </div>
                )}
              </div>
              {/* <a
            className="group flex items-center space-x-2 relative font-semibold px-3 py-2 leading-4 bg-gradient-to-t from-amber-400 to-yellow-300 text-black rounded-md font-mono text-xs transform hover:scale-105 transition-all duration-200 ease-in-out"
            href={createInstallLink(script.command, script.url)}
            >
            <span>Add to Kit.app</span>
            <span className="group-hover:rotate-90 font-bold transform transition-all ease-in-out duration-300 text-base leading-none">
            +
            </span>
          </a> */}
            </div>
            <div className="px-6 pb-6 pt-2">
              {script.description && (
                <h3 className="leading-normal text-gray-100">
                  {script.description}
                </h3>
              )}
            </div>
          </a>
        </Link>
        <InstallScriptButton
          className="absolute right-5 -bottom-4 z-10"
          url={script.url}
          name={script.command}
        />
      </header>
      <Link href={`/${script.user}/${script.command}`}>
        <a className="block h-full hover:bg-gray-800 hover:bg-opacity-50 transition-all ease-in-out duration-200">
          {script.extension === Extension.md ? (
            <ReactMarkdown
              allowedElements={['pre', 'code', 'p']}
              components={{
                p({children}: any) {
                  const c = String(children)

                  if (c.startsWith('http') && c.endsWith('.mp4')) {
                    return (
                      <video controls className="w-full">
                        <source src={c} type="video/mp4" />
                      </video>
                    )
                  }

                  return null // <p>{children}</p>
                },
                code({node, inline, className, children, ...props}: any) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <CodeBlock
                      value={String(children).replace(/\n$/, '')}
                      // @ts-ignore
                      theme={theme}
                      language={match[1] as Language}
                      className="text-sm"
                    />
                  ) : (
                    <code className="inline-code" {...props}>
                      {children}
                    </code>
                  )
                },
              }}
            >
              {script.content}
            </ReactMarkdown>
          ) : (
            <CodeBlock
              className="font-mono py-5 text-sm"
              value={script.content}
              language="javascript"
              // @ts-ignore
              theme={theme}
            />
          )}
        </a>
      </Link>
    </article>
  )
}

export default ScriptCard

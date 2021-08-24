import * as React from 'react'
import Link from 'next/link'
import {FunctionComponent} from 'react'
import CodeBlock from 'components/code-block'
import createInstallLink from '../../../utils/createInstallLink'
import {Script} from 'utils/get-user-scripts'

type ScriptCardProps = {
  script: Script
  handleOpenScriptDetail?: (script: Script) => void
  origin: string
  withAuthor?: boolean
}

const ScriptCard: FunctionComponent<ScriptCardProps> = ({
  script,
  withAuthor = true,
}) => {
  return (
    <article className="rounded-lg overflow-hidden flex flex-col justify-between border border-gray-900">
      <div className="flex items-start px-6 pt-6">
        <div className="flex-grow">
          <Link href={`${script.user}/scripts/${script.command}`}>
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
        <a
          className="group flex items-center space-x-2 relative font-semibold px-3 py-2 leading-4 bg-gradient-to-t from-amber-400 to-yellow-300 text-black rounded-md font-mono text-xs transform hover:scale-105 transition-all duration-200 ease-in-out"
          href={createInstallLink(script.command, script.url)}
        >
          <span>Add to Kit.app</span>
          <span className="group-hover:rotate-90 font-bold transform transition-all ease-in-out duration-300 text-base leading-none">
            +
          </span>
        </a>
      </div>
      <div className="px-6 pb-6 pt-2 border-b border-white border-opacity-10">
        {script.description && (
          <h3 className="leading-normal text-gray-100">{script.description}</h3>
        )}
      </div>

      <CodeBlock
        className="text-sm h-80 overflow-hidden"
        value={script.content}
        language="javascript"
      />
    </article>
  )
}

export default ScriptCard

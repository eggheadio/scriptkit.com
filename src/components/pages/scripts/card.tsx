import * as React from 'react'
import {FunctionComponent} from 'react'
import type {ScriptProps} from 'pages/[user]/scripts'
import CodeBlock from 'components/code-block'
import createInstallLink from '../../../utils/createInstallLink'

type ScriptCardProps = {
  script: ScriptProps
  handleOpenScriptDetail?: (script: ScriptProps) => void
  origin: string
  withAuthor?: boolean
}

const ScriptCard: FunctionComponent<ScriptCardProps> = ({
  script,
  handleOpenScriptDetail,
  origin,
  withAuthor = false,
}) => {
  return (
    <article className="rounded-lg overflow-hidden flex flex-col justify-between border border-gray-900">
      <div className="flex items-start px-6 pt-6">
        <div className="flex-grow">
          <h2 className="md:text-2xl text-xl font-bold leading-tight">
            {script.command}
          </h2>
          {withAuthor && (
            <div className="flex space-x-2 font-xs text-sm opacity-70">
              {script.author && <div>by {script.author}</div>}
            </div>
          )}
        </div>
        <a
          className="group flex items-center space-x-2 relative font-semibold px-3 py-2 leading-4 bg-gradient-to-t from-amber-400 to-yellow-300 text-black rounded-md font-mono text-xs transform hover:scale-105 transition-all duration-200 ease-in-out"
          href={createInstallLink(script.command, origin + script.url)}
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
      {handleOpenScriptDetail ? (
        <button
          onClick={() => handleOpenScriptDetail(script)}
          className="relative block text-left group"
          style={{cursor: 'zoom-in'}}
          type="button"
        >
          <CodeBlock
            className="text-sm h-80 overflow-hidden"
            value={script.content}
            language="javascript"
          />
        </button>
      ) : (
        <CodeBlock
          className="text-sm h-80 overflow-hidden"
          value={script.content}
          language="javascript"
        />
      )}
    </article>
  )
}

export default ScriptCard

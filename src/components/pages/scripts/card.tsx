import * as React from 'react'
import {FunctionComponent} from 'react'
import {ScriptProps} from 'pages/scripts/[user]'
import CodeBlock from 'components/code-block'

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
    <article className="bg-white rounded-md overflow-hidden shadow-sm flex flex-col justify-between">
      <div className="flex items-start px-6 pt-6">
        <div className="flex-grow">
          <h2 className="md:text-xl text-lg font-bold font-mono leading-tight mt-1">
            {script.command}
          </h2>
          {withAuthor && (
            <div className="flex space-x-2 font-xs text-sm text-gray-500">
              {script.author && <div>by {script.author}</div>}
            </div>
          )}
        </div>
        <a
          className="group flex items-center space-x-2 relative font-semibold px-3 py-2 leading-4 bg-black text-white rounded-md font-mono text-xs"
          href={
            `simple://cli/new ` +
            script.command +
            ' --url ' +
            origin +
            script.url
          }
        >
          <span>Install</span>
          <span className="group-hover:rotate-90 font-bold transform transition-all ease-in-out duration-300 text-base leading-none">
            +
          </span>
        </a>
      </div>
      <div className="px-6 pb-6 pt-2">
        {script.description && (
          <h3 className="leading-normal text-gray-800">{script.description}</h3>
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
            className="text-sm h-80 overflow-hidden bg-gray-50 "
            value={script.content}
            language="javascript"
          />
        </button>
      ) : (
        <CodeBlock
          className="text-sm h-80 overflow-hidden bg-gray-50 "
          value={script.content}
          language="javascript"
        />
      )}
    </article>
  )
}

export default ScriptCard

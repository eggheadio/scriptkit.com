import * as React from 'react'
import {FunctionComponent} from 'react'
import type {ScriptProps} from 'pages/[user]/scripts'
import CodeBlock from 'components/code-block'
import createInstallLink from 'utils/createInstallLink'

const ScriptDetail: FunctionComponent<ScriptProps> = ({
  command,
  description,
  content,
  url,
  author,
  twitter,
  github,
}) => {
  let [origin, setOrigin] = React.useState('')
  React.useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  return (
    <div key={command} className="">
      <div className="py-6">
        <div className="flex w-full justify-between">
          <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold leading-tight">
            {command}
          </h2>
          <a
            className="group flex items-center space-x-2 relative font-semibold px-3 py-2 leading-4 bg-gradient-to-t from-amber-400 to-yellow-300 text-black rounded-md font-mono text-xs transform hover:scale-105 transition-all duration-200 ease-in-out"
            href={createInstallLink(command, 'origin' + url)}
          >
            <span>Add to Kit.app</span>
            <span className="group-hover:rotate-90 font-bold transform transition-all ease-in-out duration-300 text-base leading-none">
              +
            </span>
          </a>
        </div>
        {description && <h3 className="leading-tight py-2">{description}</h3>}
        {author && <div className="opacity-70">by {author}</div>}
        {/* {twitter && <div>{twitter}</div>} */}
        {github && <div>{github}</div>}
      </div>
      <div className="border border-white border-opacity-10 rounded-md">
        <CodeBlock
          className="text-base"
          value={content}
          language="javascript"
        />
      </div>
    </div>
  )
}

export default ScriptDetail

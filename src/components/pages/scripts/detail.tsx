import * as React from 'react'
import {FunctionComponent} from 'react'
import {ScriptProps} from 'pages/scripts/[user]'
import CodeBlock from 'components/code-block'

const ScriptDetail: FunctionComponent<ScriptProps> = ({
  file,
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
    <div key={file} className="bg-white rounded-md overflow-hidden">
      <div className="p-6">
        <div className="flex w-full justify-between">
          <h2 className="md:text-3xl text-2xl font-bold font-mono leading-tight">
            {command}
          </h2>
          <a
            className="group inline-flex items-center space-x-2 relative font-semibold px-4 py-3 leading-4 bg-black text-white rounded-md font-mono text-sm"
            href={`kit://` + command + ' --url ' + origin + url}
          >
            <span>Install</span>
            <span className="group-hover:rotate-90 font-bold transform transition-all ease-in-out duration-300 text-base leading-none">
              +
            </span>
          </a>
        </div>
        {description && <h3 className="leading-tight mt-2">{description}</h3>}
        {author && <div>{author}</div>}
        {twitter && <div>{twitter}</div>}
        {github && <div>{github}</div>}
      </div>
      <CodeBlock
        className="text-base bg-gray-50"
        value={content}
        language="javascript"
      />
    </div>
  )
}

export default ScriptDetail

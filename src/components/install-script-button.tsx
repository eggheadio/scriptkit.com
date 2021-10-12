import React from 'react'
import createInstallLink from 'utils/createInstallLink'

const InstallScriptButton: React.FC<{
  name: string
  url: string
  className?: string
  expanded?: boolean
}> = ({name, url, className = '', expanded = false}) => {
  return (
    <div className={className}>
      <a
        className="flex items-center group hover:bg-yellow-300 transition-all ease-in-out duration-200 p-1 text-yellow-900 rounded-full bg-yellow-400"
        href={createInstallLink(name, url)}
      >
        <span
          className={`${
            expanded ? 'block' : 'hidden'
          } group-hover:block pl-2 text-xs font-semibold font-mono`}
        >
          Install
        </span>
        <span className="sr-only">Add to Kit.app</span>
        <i className="gg-play-button" aria-hidden />
      </a>
    </div>
  )
}

export default InstallScriptButton

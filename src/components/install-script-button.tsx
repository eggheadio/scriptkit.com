import classNames from 'classnames'
import React from 'react'
import createInstallLink from 'utils/createInstallLink'

const InstallScriptButton: React.FC<{
  name: string
  url: string
  className?: string
  expanded?: boolean
}> = ({name, url, className = '', expanded = false}) => {
  if (!Boolean(url)) return <p />
  return (
    <div className={className}>
      <div className="relative group">
        <a
          className="hover:translate-y-[-2px] relative z-10 flex items-center group hover:bg-yellow-200 transition-all ease-in-out duration-200 p-1 text-yellow-900 rounded-full bg-yellow-300"
          href={createInstallLink(name, url)}
        >
          <span
            className={`${classNames({
              block: expanded,
              hidden: !expanded,
            })} group-hover:block pl-2 text-xs font-semibold font-mono`}
          >
            Install
          </span>
          <span className="sr-only">Add to Kit.app</span>
          <i className="gg-play-button" aria-hidden />
        </a>
        <div
          aria-hidden
          className={`group-hover:opacity-100 opacity-0 rounded-full bottom-0 z-0 absolute w-full h-full translate-y-[2px] bg-yellow-600`}
        />
      </div>
    </div>
  )
}

export default InstallScriptButton

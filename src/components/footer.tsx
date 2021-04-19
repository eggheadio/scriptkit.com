import * as React from 'react'
import JohnIcon from 'images/john.svg'
import GitHubIcon from 'images/github.svg'

const Footer = () => {
  return (
    <footer className="max-w-screen-lg mx-auto flex sm:flex-row flex-col justify-between items-center w-full sm:pt-32 pt-24 pb-10 lg:px-0 px-5 ">
      <a
        className="flex items-center group sm:pb-0 pb-24"
        href="https://johnlindquist.com"
      >
        <JohnIcon />
        <div className="pl-2">
          <div className="uppercase opacity-70 text-xs font-mono">
            created by
          </div>
          <div className="text-xl font-semibold group-hover:underline">
            John Lindquist
          </div>
        </div>
      </a>

      <div className="flex items-center space-x-4">
        <a
          href="https://github.com/johnlindquist/kit"
          className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-900 transition-all duration-100 ease-in-out opacity-90 hover:opacity-100"
        >
          <GitHubIcon />
          <span className="pl-1">Open Source</span>
        </a>
      </div>
    </footer>
  )
}

export default Footer

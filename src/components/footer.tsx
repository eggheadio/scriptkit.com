import * as React from 'react'
import JohnIcon from 'images/john.svg'
import GitHubIcon from 'images/github.svg'

const Footer = () => {
  return (
    <footer className="max-w-screen-lg mx-auto flex flex-row  justify-between sm:items-end items-center w-full sm:pt-32 pt-24 pb-10 lg:px-0 px-5 ">
      <a
        className="flex items-center group transform sm:scale-100 scale-75 origin-left"
        href="https://johnlindquist.com"
      >
        <JohnIcon width={48} />
        <div className="pl-2">
          <div className="uppercase opacity-70 text-xxs font-mono">
            created by
          </div>
          <div className="text-lg font-semibold group-hover:underline">
            John Lindquist
          </div>
        </div>
      </a>

      <div className="flex items-center space-x-4">
        <a
          href="https://github.com/johnlindquist/kit"
          className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-900 transition-all duration-100 ease-in-out opacity-90 hover:opacity-100 sm:text-base text-sm"
        >
          <GitHubIcon />
          <span className="pl-1 text-sm font-medium leading-snug sm:block hidden">
            Open Source
          </span>
        </a>
      </div>
    </footer>
  )
}

export default Footer

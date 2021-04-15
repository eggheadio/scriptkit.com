import * as React from 'react'
import JohnIcon from 'images/john.svg'
import GitHubIcon from 'images/github.svg'

const Footer = () => {
  return (
    <footer className="max-w-screen-lg mx-auto flex flex-col items-center w-full sm:pt-32 pt-24 pb-10 lg:px-0 px-5 ">
      <div className="flex items-center space-x-4">
        <a
          href="https://github.com/johnlindquist/kit"
          className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-900 transition-all duration-100 ease-in-out opacity-90 hover:opacity-100"
        >
          <GitHubIcon />
          <span className="pl-1">Open Source</span>
        </a>
      </div>

      <div className="pt-16">
        <a href="https://johnlindquist.com">
          <div className="flex space-x-2 items-center">
            <JohnIcon />
            <div>
              <div className="uppercase opacity-70 text-xs font-mono">
                created by
              </div>
              <div className="text-xl font-semibold">John Lindquist</div>
            </div>
          </div>
        </a>
      </div>
    </footer>
  )
}

export default Footer

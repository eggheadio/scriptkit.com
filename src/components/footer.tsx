import * as React from 'react'
import JohnIcon from 'images/john.svg'
import GitHubIcon from 'images/github.svg'

const Footer = () => {
  return (
    <footer className="max-w-screen-lg mx-auto w-full py-5 lg:px-0 px-5">
      <div className=" mx-auto flex items-center justify-between">
        <a href="https://johnlindquist.com">
          <div className="flex space-x-2 items-center">
            <JohnIcon />
            <div>
              <div className="uppercase tracking-wide text-xs font-mono">
                Created By
              </div>
              <div className="text-xl font-semibold">John Lindquist</div>
            </div>
          </div>
        </a>
        <div className="flex items-center space-x-4">
          <a
            className="flex items-center space-x-1"
            href="https://github.com/johnlindquist/kit"
          >
            <GitHubIcon />
            <span className="pl-1">ScriptKit on GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

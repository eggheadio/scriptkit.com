import * as React from 'react'
import JohnIcon from 'images/john.svg'
import GitHubIcon from 'images/github.svg'

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 sm:py-16 py-8 px-8 ">
      <div className="max-w-screen-lg mx-auto flex items-center justify-between">
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
            href="https://github.com/johnlindquist/simplescripts"
          >
            <GitHubIcon />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

import * as React from 'react'
import Link from 'components/link'
import Logo from 'images/logo.svg'

const Navigation = () => {
  return (
    <nav className="flex items-center justify-between w-full max-w-screen-lg px-5 py-5 mx-auto font-medium lg:px-0">
      <Link href="/">
        <a className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 font-bold tracking-tighter text-black rounded-lg bg-gradient-to-t from-amber-400 to-yellow-300">
            <Logo />
          </div>
          <div className="pl-2">
            <div className="text-lg font-bold leading-tighter">Script Kit</div>
            <div className="text-sm opacity-80">by John Lindquist</div>
          </div>
        </a>
      </Link>
      <div className="flex items-center space-x-5">
        <Link href="/scripts" activeClassName="cursor-pointer bg-gray-900">
          <a className="flex items-center px-2 py-1 space-x-1 text-sm transition-all duration-100 ease-in-out rounded-lg sm:text-base sm:px-3 sm:py-2 hover:bg-gray-900 opacity-90 hover:opacity-100">
            Browse Scripts
          </a>
        </Link>
        <Link href="/blog" activeClassName="cursor-pointer bg-gray-900">
          <a className="flex items-center px-2 py-1 space-x-1 text-sm transition-all duration-100 ease-in-out rounded-lg sm:text-base sm:px-3 sm:py-2 hover:bg-gray-900 opacity-90 hover:opacity-100">
            Blog
          </a>
        </Link>

        <a
          href="https://github.com/johnlindquist/kit/discussions"
          className="flex items-center px-2 py-1 space-x-1 text-sm transition-all duration-100 ease-in-out rounded-lg sm:text-base sm:px-3 sm:py-2 hover:bg-gray-900 opacity-90 hover:opacity-100"
        >
          Discuss
        </a>
      </div>
    </nav>
  )
}

export default Navigation

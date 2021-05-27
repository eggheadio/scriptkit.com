import * as React from 'react'
import Link from 'components/link'
import Logo from 'images/logo.svg'

const Navigation = () => {
  return (
    <nav className="w-full flex items-center justify-between py-5 lg:px-0 px-5 max-w-screen-lg mx-auto font-medium">
      <Link href="/">
        <a className="flex items-center">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-t from-amber-400 to-yellow-300 text-black font-bold flex items-center justify-center tracking-tighter">
            <Logo />
          </div>
          <div className="pl-2 font-bold text-lg leading-tighter">
            Script Kit
          </div>
        </a>
      </Link>
      <div className="flex items-center space-x-5">
        <Link href="/scripts" activeClassName="cursor-default bg-gray-900">
          <a className="sm:text-base text-sm flex items-center space-x-1 sm:px-3 px-2 sm:py-2 py-1 rounded-lg hover:bg-gray-900 transition-all duration-100 ease-in-out opacity-90 hover:opacity-100">
            Browse Scripts
          </a>
        </Link>
      </div>
    </nav>
  )
}

export default Navigation

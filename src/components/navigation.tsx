import * as React from 'react'
import Link from 'next/link'

const Navigation = () => {
  return (
    <nav className="w-full flex items-center justify-between py-5 lg:px-0 px-5 max-w-screen-lg mx-auto font-medium">
      <Link href="/">
        <a className="flex items-center">
          <div className="w-10 h-10 rounded-lg bg-yellow-300 text-black font-bold flex items-center justify-center tracking-tighter">
            ►_
          </div>
          <div className="pl-2 font-bold text-lg leading-tighter">
            Script Kit
          </div>
        </a>
      </Link>
      <div className="flex items-center space-x-5">
        <Link href="/scripts/johnlindquist">
          <a>Browse Scripts</a>
        </Link>
      </div>
    </nav>
  )
}

export default Navigation

import * as React from 'react'
import {FunctionComponent} from 'react'
import Logo from 'images/logo.svg'
import Link from 'next/link'

type HeaderProps = {}

const Header: FunctionComponent<HeaderProps> = (props) => {
  return (
    <header className="flex w-full pb-10 md:pt-5 pt-0">
      <Link href="/">
        <a>
          <Logo className="text-yellow-300" />
        </a>
      </Link>
      <div className="pl-3 flex md:flex-row flex-col w-full justify-between md:items-center md:space-y-0 space-y-3">
        {props.children}
      </div>
    </header>
  )
}

export default Header

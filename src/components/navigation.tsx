import * as React from 'react'
import Link from 'components/link'
import Logo from 'images/logo.svg'
import {Disclosure} from '@headlessui/react'
import {MenuIcon, XIcon} from '@heroicons/react/outline'

const navigation = [
  {name: 'Browse Scripts', href: '/scripts', current: false},
  {name: 'Blog', href: '/blog', current: false},
  {
    name: 'Discuss',
    href: 'https://github.com/johnlindquist/kit/discussions',
    current: false,
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type NavigationProps = {
  className?: string
}

function Navigation({className = ''}: NavigationProps) {
  return (
    <Disclosure as="nav">
      {({open}) => (
        <div className={className}>
          <div className="w-full max-w-screen-lg px-5 py-2 mx-auto lg:px-0">
            <div className="relative flex items-center justify-between h-16">
              <Link href="/">
                <a className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 tracking-tighter text-black rounded-lg bg-gradient-to-t from-amber-400 to-yellow-300">
                    <Logo />
                  </div>
                  <div className="pl-2">
                    <div className="text-lg font-semibold leading-none">
                      Script Kit
                    </div>
                    <div className="text-sm opacity-80 leading-none">
                      by John Lindquist
                    </div>
                  </div>
                </a>
              </Link>
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-end">
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-2">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-200 hover:bg-gray-800 hover:text-white',
                          'px-3 py-2 rounded-md text-[0.9em] leading-tighter transition-all ease-in-out duration-150',
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden bg-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-200 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-sm',
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  )
}

// const Navigation = () => {
//   return (
//     <nav className="flex items-center justify-between w-full max-w-screen-lg px-5 py-5 mx-auto font-medium lg:px-0">
//       <Link href="/">
//         <a className="flex items-center">
//           <div className="flex items-center justify-center w-10 h-10 font-bold tracking-tighter text-black rounded-lg bg-gradient-to-t from-amber-400 to-yellow-300">
//             <Logo />
//           </div>
//           <div className="pl-2">
//             <div className="text-lg font-bold leading-tighter">Script Kit</div>
//             <div className="text-sm opacity-80">by John Lindquist</div>
//           </div>
//         </a>
//       </Link>
//       <div className="flex items-center space-x-5">
//         <Link href="/scripts" activeClassName="cursor-pointer bg-gray-900">
//           <a className="flex items-center px-2 py-1 space-x-1 text-sm transition-all duration-100 ease-in-out rounded-lg sm:text-base sm:px-3 sm:py-2 hover:bg-gray-900 opacity-90 hover:opacity-100">
//             Browse Scripts
//           </a>
//         </Link>
//         <Link href="/blog" activeClassName="cursor-pointer bg-gray-900">
//           <a className="flex items-center px-2 py-1 space-x-1 text-sm transition-all duration-100 ease-in-out rounded-lg sm:text-base sm:px-3 sm:py-2 hover:bg-gray-900 opacity-90 hover:opacity-100">
//             Blog
//           </a>
//         </Link>

//         <a
//           href="https://github.com/johnlindquist/kit/discussions"
//           className="flex items-center px-2 py-1 space-x-1 text-sm transition-all duration-100 ease-in-out rounded-lg sm:text-base sm:px-3 sm:py-2 hover:bg-gray-900 opacity-90 hover:opacity-100"
//         >
//           Discuss
//         </a>
//       </div>
//     </nav>
//   )
// }

export default Navigation

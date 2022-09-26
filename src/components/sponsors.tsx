import Image from 'next/image'
import React from 'react'
import sponsorsData from '../../public/data/sponsors.json'

const Sponsors = () => {
  return process.env.NEXT_PUBLIC_SPONSORSHIP_URL ? (
    <div className="flex flex-col items-center justify-center text-center sm:pt-16 pt-10 sm:mt-16 mt-10 px-5 border-t border-gray-900 max-w-screen-lg mx-auto">
      <span className="font-light text-lg opacity-80">
        ScriptKit is made possible thanks to our sponsors
      </span>
      <div className="flex flex-wrap justify-center gap-10 pt-8">
        {sponsorsData.map(({company, url, image}) => {
          return (
            <a
              className="flex items-center justify-center"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              key={company}
            >
              <Image
                src={image.url}
                width={image.width}
                height={image.height}
                alt={company}
              />
            </a>
          )
        })}
        <div className="flex items-center justify-center">
          <a
            className="px-4 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 transition ease-in-out"
            href={process.env.NEXT_PUBLIC_SPONSORSHIP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Become a sponsor
          </a>
        </div>
      </div>
    </div>
  ) : null
}

export default Sponsors

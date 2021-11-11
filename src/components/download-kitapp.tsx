import {DownloadIcon} from '@heroicons/react/outline'
import {Release} from 'pages'
import * as React from 'react'

const DownloadKitApp: React.FC<{
  macIntelRelease: Release
  macSilliconRelease: Release
}> = ({macIntelRelease, macSilliconRelease}) => {
  const [isHovered, setIsHovered] = React.useState('')
  const releases = [
    {...macIntelRelease, label: 'Intel'},
    {...macSilliconRelease, label: 'Apple Sillicon'},
  ]
  return (
    <div className="relative">
      <div className="flex md:flex-row flex-col px-2 md:py-2 py-8 md:rounded-full sm:rounded-lg rounded-b-lg md:translate-y-0 -translate-y-5 bg-white text-black items-center md:justify-between justify-center md:space-y-0 space-y-4">
        <div className="flex items-center md:pl-5 leading-tight font-medium">
          Download Kit.app beta for macOS:
        </div>
        <div className="flex items-center space-x-2">
          {releases.map((release) => {
            return (
              <div className="relative group flex -translate-y-0.5">
                <a
                  onMouseOver={() => setIsHovered(release.name)}
                  onMouseOut={() => setIsHovered('')}
                  className="flex items-center rounded-full px-5 pl-4 py-4 leading-none bg-gradient-to-tr from-purple-500 via-pink-500 to-pink-500 text-white relative z-10 hover:-translate-y-1 transition-all ease-in-out duration-200"
                  href={release?.browser_download_url}
                  onMouseUp={(e) => {
                    e.preventDefault()
                    fetch('/api/update-twitter-count')
                  }}
                >
                  <DownloadIcon className="flex-shrink-0" width={16} />
                  <span className="pl-1">{release.label}</span>
                </a>
                <div className="absolute w-full h-full translate-y-1 bg-gradient-to-tr from-purple-600 via-pink-600 to-pink-600 left-0 rounded-full z-0 transition-all ease-in-out" />
              </div>
            )
          })}
        </div>
      </div>
      <div className="absolute w-full text-center pt-2 text-xs opacity-50">
        {isHovered}
      </div>
    </div>
  )
}

export default DownloadKitApp

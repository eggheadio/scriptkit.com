import * as React from 'react'
import {Release} from 'pages'
import cx from 'classnames'

const DownloadKitApp: React.FC<
  React.PropsWithChildren<{
    macIntelRelease: Release
    macSilliconRelease: Release
    windowsPreviewRelease: Release
  }>
> = ({macIntelRelease, macSilliconRelease, windowsPreviewRelease}) => {
  const [isHovered, setIsHovered] = React.useState('')
  const releases = [
    {...macIntelRelease, label: 'Intel'},
    {...macSilliconRelease, label: 'Apple Sillicon'},
  ]
  return (
    <div className="relative flex md:flex-row flex-col items-center md:gap-3 gap-5">
      <div className="relative">
        <div className="inline-flex items-center gap-5 rounded-xl bg-white text-black pl-4 overflow-hidden">
          <div className="font-medium flex items-center gap-1 h-full">
            <AppleIcon /> MacOS
          </div>
          <div className="flex items-center border-l border-gray-100">
            {releases.map((release, i) => {
              return (
                <div key={release.label} className="relative group flex 00">
                  <a
                    onMouseOver={() => setIsHovered(release.name)}
                    onMouseOut={() => setIsHovered('')}
                    className={cx(
                      'font-medium tracking-tight flex items-center p-4 bg-gray-50 hover:bg-gray-200/70 transition',
                      {
                        'border-r border-gray-100': i === 0,
                      },
                    )}
                    href={release?.browser_download_url}
                    onMouseUp={(e) => {
                      e.preventDefault()
                      fetch('/api/update-twitter-count')
                    }}
                  >
                    <DownloadIcon className="flex-shrink-0 text-gray-400/80" />
                    <span className="pl-1">{release.label}</span>
                  </a>
                </div>
              )
            })}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full translate-y-1.5 h-full rounded-xl from-gray-300 via-gray-200 to-gray-300 bg-gradient-to-r -z-10" />
      </div>

      <div className="relative">
        <div className="inline-flex items-center gap-5 rounded-xl overflow-hidden bg-gray-900 text-white pl-4">
          <div className="font-medium flex items-center gap-1">
            <WindowsIcon /> Windows
          </div>
          <div className="flex items-center bg-gray-800">
            <div className="relative group flex 00">
              <a
                onMouseOver={() => setIsHovered(windowsPreviewRelease.name)}
                onMouseOut={() => setIsHovered('')}
                className={cx(
                  'font-normal tracking-tight flex items-center p-4 hover:bg-gray-700/50 transition',
                  {},
                )}
                href={windowsPreviewRelease?.browser_download_url}
                onMouseUp={(e) => {
                  e.preventDefault()
                  fetch('/api/update-twitter-count')
                }}
              >
                <DownloadIcon className="flex-shrink-0 text-gray-500" />
                <span className="pl-1">Preview (Alpha)</span>
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full translate-y-1.5 h-full rounded-xl from-gray-800 via-gray-900 to-gray-900 bg-gradient-to-r -z-10" />
      </div>
      <div className="absolute w-full text-center text-xs opacity-50 md:mt-28 mt-36">
        {isHovered}
      </div>
    </div>
  )
}

const AppleIcon = () => {
  return (
    <svg
      className="w-4 pb-1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
    >
      <title>apple</title>
      <g fill="currentColor">
        <path
          fill="currentColor"
          d="M14.326,12.08c-0.346,0.766-0.511,1.108-0.957,1.785c-0.621,0.945-1.496,2.123-2.581,2.133 c-0.964,0.009-1.212-0.627-2.52-0.62S6.686,16.009,5.722,16c-1.085-0.01-1.914-1.073-2.536-2.019 C1.45,11.337,1.268,8.235,2.339,6.586c0.761-1.173,1.962-1.858,3.092-1.858c1.15,0,1.872,0.63,2.823,0.63 c0.922,0,1.484-0.631,2.814-0.631c1.005,0,2.07,0.547,2.828,1.492C11.411,7.582,11.815,11.131,14.326,12.08L14.326,12.08z"
        ></path>{' '}
        <path d="M10.604,2.699c0.546-0.7,0.96-1.689,0.809-2.699C10.522,0.061,9.48,0.628,8.871,1.367 C8.319,2.038,7.863,3.033,8.04,4C9.013,4.03,10.019,3.449,10.604,2.699L10.604,2.699z"></path>
      </g>
    </svg>
  )
}

const WindowsIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-3 text-gray-200"
      viewBox="0 0 32 32"
    >
      <title>microsoft</title>
      <g fill="currentColor">
        <rect x="1" y="1" fill="currentColor" width="14" height="14"></rect>{' '}
        <rect x="17" y="1" width="14" height="14"></rect>{' '}
        <rect x="1" y="17" width="14" height="14"></rect>{' '}
        <rect x="17" y="17" fill="currentColor" width="14" height="14"></rect>
      </g>
    </svg>
  )
}

const DownloadIcon: React.FC<{className?: string}> = ({className}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      width="16"
    >
      <path
        className="-translate-y-0.5 group-hover:translate-y-0 transition"
        d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z"
      ></path>
      <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z"></path>
    </svg>
  )
}

export default DownloadKitApp

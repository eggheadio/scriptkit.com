import React from 'react'
import {AppProps} from 'next/app'
import '../styles/globals.css'
import 'focus-visible'
import {DefaultSeo} from 'next-seo'
import SEO from '../../next-seo.json'
import {ViewerProvider} from 'context/viewer-context'
import {ConvertkitProvider} from 'hooks/use-convertkit'

function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <ViewerProvider>
        <ConvertkitProvider>
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
        </ConvertkitProvider>
      </ViewerProvider>
    </>
  )
}

export default MyApp

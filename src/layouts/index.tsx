import React, {FunctionComponent} from 'react'
import {NextSeo, NextSeoProps} from 'next-seo'
import Footer from 'components/footer'
import Navigation from 'components/navigation'

type LayoutProps = {
  meta?: NextSeoProps
}

const DefaultLayout: FunctionComponent<LayoutProps> = ({children, meta}) => {
  const {title, description, openGraph} = meta || {}
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          // url,
          // images: ogImage ? [ogImage] : undefined,
        }}
        // canonical={url}
      />
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <div className="p-5 flex-grow">{children}</div>
        <Footer />
      </div>
    </>
  )
}

export default DefaultLayout

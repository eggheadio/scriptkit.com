import React, {FunctionComponent} from 'react'
import {NextSeo, NextSeoProps} from 'next-seo'
import Footer from 'components/footer'
import Navigation from 'components/navigation'

type LayoutProps = {
  meta?: NextSeoProps
  className?: string
  withFooter?: boolean
  navClassName?: string
}

const DefaultLayout: FunctionComponent<LayoutProps> = ({
  children,
  className = '',
  withFooter = true,
  navClassName = '',
  meta,
}) => {
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
        <Navigation className={navClassName} />
        <div className={`flex-grow ${className}`}>{children}</div>
        {withFooter && <Footer />}
      </div>
    </>
  )
}

export default DefaultLayout

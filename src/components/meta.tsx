import Head from 'next/head'
import {useRouter} from 'next/router'
import qs from 'query-string'

interface MetaProps {
  user: string
  title: string
  twitter?: string
  description?: string
  backgroundImage?: string
}

export default function Meta(props: MetaProps) {
  const {
    user,
    title,
    twitter = '',
    description = '',
    backgroundImage = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/card-background.png`,
  } = props
  const router = useRouter()

  const opengraphImage = `https://${
    process.env.NEXT_PUBLIC_VERCEL_URL
  }/api/cloudinary-cache?${qs.stringify(props)}`

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />

      <meta
        property="og:url"
        content={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/${router.pathname}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={opengraphImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={`@${twitter}`} />
      <meta name="twitter:creator" content={`@${twitter}`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={opengraphImage} />
    </Head>
  )
}

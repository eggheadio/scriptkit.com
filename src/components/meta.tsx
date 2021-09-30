import Head from 'next/head'

interface MetaProps {
  user: string
  title: string
  twitter?: string
  description?: string
  backgroundImage?: string
}

export default function Meta({
  user,
  title,
  twitter = '',
  description = '',
  backgroundImage = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/card-background.png`,
}: MetaProps) {
  const opengraphImage = `https://${process.env.NEXT_PULBIC_VERCEL_URL}/api/opengraph?user=${user}&description=${description}&twitter=${twitter}&title=${title}&backgroundImage=${backgroundImage}`

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={`@${twitter}`} />
      <meta name="twitter:creator" content={`@${twitter}`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={opengraphImage} />
    </Head>
  )
}

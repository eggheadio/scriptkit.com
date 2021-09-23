import * as React from 'react'
import {FunctionComponent} from 'react'
import Layout from 'layouts'
import DiscussionPost from 'components/discussion-post'
import {useOgImage} from 'next-opengraph-image'
import Head from 'next/head'

import {
  Category,
  Discussion,
  DiscussionsProps,
  getDiscussions,
  Login,
} from 'utils/get-discussions'

const Blog: FunctionComponent<DiscussionsProps> = ({discussions}) => {
  const ogImage = useOgImage({
    baseUrl: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`,
  })

  return (
    <Layout className="blog">
      <Head>
        <title>...</title>
        <meta name="description" content="..." />
        <link rel="icon" href="/favicon.ico" />
        // Step 3
        <meta {...ogImage} />
      </Head>
      <main className="max-w-screen-lg mx-auto flex-grow w-full">
        {discussions.map((discussion) => (
          <DiscussionPost
            discussion={discussion}
            key={discussion.id}
            link="blog"
          />
        ))}
      </main>
      <section className="max-w-screen-lg mx-auto"></section>
    </Layout>
  )
}

export async function getStaticProps(
  context: any,
): Promise<{props: {discussions: Discussion[]}}> {
  const discussions = await getDiscussions(
    Category.Announcements,
    Login.johnlindquist,
  )

  return {
    props: {
      discussions,
    },
  }
}

export default Blog

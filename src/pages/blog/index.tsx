import * as React from 'react'
import {FunctionComponent} from 'react'
import Layout from 'layouts'
import DiscussionPost from 'components/discussion-post'
import Meta from 'components/meta'

import {
  Category,
  Discussion,
  DiscussionsProps,
  getDiscussions,
  Login,
} from 'utils/get-discussions'
import {LoadedScript} from 'utils/types'

const Blog: FunctionComponent<DiscussionsProps> = ({discussions}) => {
  return (
    <Layout className="blog">
      <Meta title="Script Kit Blog" />
      <main className="max-w-screen-lg mx-auto flex-grow w-full">
        {discussions.map((discussion) => (
          <DiscussionPost
            discussion={discussion}
            key={discussion.url}
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
): Promise<{props: {discussions: LoadedScript[]}}> {
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

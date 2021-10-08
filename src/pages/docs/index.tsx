import * as React from 'react'
import {FunctionComponent} from 'react'
import Layout from 'layouts'
import DiscussionPost from 'components/discussion-post'

import {
  Category,
  Discussion,
  DiscussionsProps,
  getDiscussions,
  Login,
} from 'utils/get-discussions'
import {LoadedScript} from 'utils/types'

const Docs: FunctionComponent<DiscussionsProps> = ({discussions}) => {
  return (
    <Layout className="blog">
      <main className="max-w-screen-lg mx-auto flex-grow w-full">
        {discussions.map((discussion) => (
          <DiscussionPost
            discussion={discussion}
            link="docs"
            key={discussion.url}
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
  const discussions = await getDiscussions(Category.Docs, Login.johnlindquist)

  return {
    props: {
      discussions,
    },
  }
}

export default Docs

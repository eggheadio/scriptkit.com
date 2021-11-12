import * as React from 'react'
import {FunctionComponent} from 'react'
import Layout from 'layouts'

import {
  Category,
  getDiscussionPaths,
  getDiscussionBySlug,
  DiscussionProps,
  Login,
} from 'utils/get-discussions'
import DiscussionPost from 'components/discussion-post'
import Meta from 'components/meta'

const Doc: FunctionComponent<DiscussionProps> = ({discussion}) => {
  return (
    <Layout className="doc">
      <Meta title={discussion.title} />

      <main className="max-w-screen-lg mx-auto flex-grow w-full pt-8 px-5">
        <DiscussionPost discussion={discussion} key={discussion.url} />
      </main>
    </Layout>
  )
}

export async function getStaticProps(context: any) {
  const {params} = context
  const {slug} = params
  const discussion = await getDiscussionBySlug(Category.Announcements, slug)

  return {
    props: {
      discussion,
    },
  }
}

export async function getStaticPaths() {
  return await getDiscussionPaths(Category.Announcements, Login.johnlindquist)
}

export default Doc

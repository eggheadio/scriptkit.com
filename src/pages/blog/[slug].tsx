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

const Doc: FunctionComponent<DiscussionProps> = ({discussion}) => {
  return (
    <Layout className="doc">
      <main className="max-w-screen-lg mx-auto flex-grow w-full pt-8">
        <DiscussionPost discussion={discussion} key={discussion.id} />
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

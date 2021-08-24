import * as React from 'react'
import {FunctionComponent} from 'react'
import Layout from 'layouts'
import ReactMarkdown from 'react-markdown'
import {
  Category,
  Discussion,
  DiscussionsProps,
  getDiscussions,
} from 'utils/get-discussions'

const Docs: FunctionComponent<DiscussionsProps> = ({discussions}) => {
  return (
    <Layout>
      <header className="sm:pt-10 pt-2 pb-10"></header>
      <main className="max-w-screen-lg mx-auto space-y-10 flex-grow sm:py-32 py-16 w-full">
        {discussions.map(({body, url, title}) => (
          <div key={url}>
            <h2>{title}</h2>
            <ReactMarkdown>{body}</ReactMarkdown>
          </div>
        ))}
      </main>
      <section className="max-w-screen-lg mx-auto"></section>
    </Layout>
  )
}

export async function getStaticProps(
  context: any,
): Promise<{props: {discussions: Discussion[]}}> {
  const discussions = await getDiscussions(Category.Docs)
  return {
    props: {
      discussions,
    },
  }
}

export default Docs

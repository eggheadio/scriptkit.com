import * as React from 'react'
import {FunctionComponent} from 'react'
import Layout from 'layouts'
import ReactMarkdown from 'react-markdown'
import {Language} from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'

import {
  Category,
  getDiscussionPaths,
  getDiscussionBySlug,
  DiscussionProps,
} from 'utils/get-discussions'
import CodeBlock from 'components/code-block'

const Doc: FunctionComponent<DiscussionProps> = ({discussion}) => {
  return (
    <Layout className="doc">
      <main className="max-w-screen-lg mx-auto flex-grow w-full pt-8">
        <div key={discussion.url}>
          <h2>{discussion.title}</h2>

          <ReactMarkdown
            children={discussion.body}
            components={{
              code({node, inline, className, children, ...props}: any) {
                console.log(String(children))
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <div className="border border-white border-opacity-10 rounded-md my-8">
                    <CodeBlock
                      value={String(children).replace(/\n$/, '')}
                      // @ts-ignore
                      theme={theme}
                      language={match[1] as Language}
                    />
                  </div>
                ) : (
                  <code className="inline-code" {...props}>
                    {children}
                  </code>
                )
              },
            }}
          />
        </div>
      </main>
      <section className="max-w-screen-lg mx-auto py-8">
        <a href={discussion.url}>Read discussion</a>
      </section>
    </Layout>
  )
}

export async function getStaticProps(context: any) {
  const {params} = context
  const {slug} = params
  const doc = await getDiscussionBySlug(Category.Docs, slug)

  return {
    props: {
      doc,
    },
  }
}

export async function getStaticPaths() {
  return await getDiscussionPaths(Category.Docs)
}

export default Doc

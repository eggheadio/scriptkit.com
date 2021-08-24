import * as React from 'react'
import {FunctionComponent} from 'react'
import Layout from 'layouts'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import {compareAsc, toDate} from 'date-fns'

import {
  Category,
  Discussion,
  DiscussionsProps,
  getDiscussions,
} from 'utils/get-discussions'
import CodeBlock from 'components/code-block'
import {Language} from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'

const Blog: FunctionComponent<DiscussionsProps> = ({discussions}) => {
  return (
    <Layout className="blog">
      <main className="max-w-screen-lg mx-auto flex-grow w-full">
        {discussions.map(({body, url, title, slug}) => (
          <div key={url}>
            <Link href={`/blog/${slug}`}>
              <a>
                <h2>{title}</h2>
              </a>
            </Link>

            <ReactMarkdown
              children={body}
              components={{
                code({node, inline, className, children, ...props}: any) {
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
        ))}
      </main>
      <section className="max-w-screen-lg mx-auto"></section>
    </Layout>
  )
}

export async function getStaticProps(
  context: any,
): Promise<{props: {discussions: Discussion[]}}> {
  const discussions = await getDiscussions(Category.Announcements)

  return {
    props: {
      discussions,
    },
  }
}

export default Blog

import * as React from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import {Language} from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'

import {DiscussionProps} from 'utils/get-discussions'
import CodeBlock from 'components/code-block'
import rehypeRaw from 'rehype-raw'

const DiscussionPost = ({
  discussion: {url, slug, title, body},
  link,
}: DiscussionProps) => (
  <div key={url} className="discussion">
    {link ? (
      <Link href={`/${link}/${slug}`}>
        <a>
          <h2>{title}</h2>
        </a>
      </Link>
    ) : (
      <h2>{title}</h2>
    )}

    <ReactMarkdown
      children={body}
      rehypePlugins={[rehypeRaw]}
      components={{
        p({children}) {
          const c = String(children)

          if (c.startsWith('http') && c.endsWith('.mp4')) {
            return (
              <video controls className="w-full">
                <source src={c} type="video/mp4" />
              </video>
            )
          }

          return <p>{children}</p>
        },
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
    <section className="max-w-screen-lg mx-auto flex flex-col justify-end items-end">
      <a href={url}>Discuss Post</a>
    </section>
  </div>
)

export default DiscussionPost

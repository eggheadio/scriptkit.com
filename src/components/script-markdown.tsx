import * as React from 'react'
import Link from 'components/link'
import ReactMarkdown from 'react-markdown'
import {Language} from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'

import CodeBlock from 'components/code-block'
import rehypeRaw from 'rehype-raw'
import {LoadedScript} from 'utils/types'

interface DiscussionPostProps {
  script: LoadedScript
}

const ScriptMarkdown = ({
  script: {author, url, command, title, content, user},
}: DiscussionPostProps) => (
  <div key={author + command} className="break-inside">
    <div className="mb-4">
      <Link href={`/${user}/${command}`}>
        <a className="md:text-3xl text-2xl font-bold leading-tight text-white hover:underline flex flex-row">
          <h2>{title}</h2>
        </a>
      </Link>
    </div>

    <ReactMarkdown
      children={content}
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

export default ScriptMarkdown

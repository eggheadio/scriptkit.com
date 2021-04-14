import * as React from 'react'
import {FunctionComponent} from 'react'
import Highlight, {defaultProps, Language} from 'prism-react-renderer'
import SimpleBar from 'simplebar-react'
import theme from 'prism-react-renderer/themes/nightOwl'

type CodeBlockProps = {
  language: Language
  value: string
  className?: string
}

const CodeBlock: FunctionComponent<CodeBlockProps> = ({
  language,
  value,
  className,
}) => {
  return (
    <div className={className}>
      <Highlight
        {...defaultProps}
        code={value}
        language={language}
        theme={theme}
      >
        {({className, tokens, getLineProps, getTokenProps}) => (
          <pre
            className={`${className} sm:rounded-sm overflow-x-auto rounded-none h-full`}
          >
            <SimpleBar className="h-full z-0 bg-black">
              <div className="px-5">
                {tokens.map((line, i) => (
                  <div
                    {...getLineProps({line, key: i})}
                    style={{fontSize: '90%'}}
                  >
                    {line.map((token, key) => (
                      <span {...getTokenProps({token, key})} />
                    ))}
                  </div>
                ))}
              </div>
            </SimpleBar>
          </pre>
        )}
      </Highlight>
    </div>
  )
}

export default CodeBlock

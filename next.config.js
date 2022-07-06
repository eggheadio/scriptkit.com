const withPlugins = require('next-compose-plugins')
const withMDX = require('@next/mdx')()
const withSvgr = require('next-svgr')
const withMarkdoc = require('@markdoc/next.js')

const IMAGE_HOST_DOMAINS = ['res.cloudinary.com', 'github.com']

const nextConfig = {
  webpack5: true,
  reactStrictMode: true,
  images: {
    domains: IMAGE_HOST_DOMAINS,
  },
  async redirects() {
    return []
  },
  webpack: (config, {isServer}) => {
    config.experiments = {topLevelAwait: true, layers: true}

    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      }
    }

    return config
  },
}

module.exports = withPlugins(
  [
    withMarkdoc({mode: 'static'})({
      pageExtensions: ['md', 'mdoc', 'js', 'jsx', 'ts', 'tsx'],
    }),
    // withMDX({
    //   pageExtensions: ['ts', 'tsx', 'mdx'],
    //   remarkPlugins: [
    //     // require('remark-slug'),
    //     // require('remark-footnotes'),
    //     require('remark-code-titles'),
    //   ],
    //   rehypePlugins: [require('mdx-prism')],
    // }),
    withSvgr,
  ],
  nextConfig,
)

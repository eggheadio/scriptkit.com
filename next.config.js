const withPlugins = require('next-compose-plugins')
const withMDX = require('@next/mdx')()
const withSvgr = require('next-svgr')

const IMAGE_HOST_DOMAINS = [`res.cloudinary.com`]

const nextConfig = {
  future: {
    webpack5: true,
  },
  reactStrictMode: true,
  images: {
    domains: IMAGE_HOST_DOMAINS,
  },
  async redirects() {
    return []
  },
}

module.exports = withPlugins(
  [
    withMDX({
      pageExtensions: ['ts', 'tsx', 'mdx'],
      remarkPlugins: [
        require('remark-slug'),
        require('remark-footnotes'),
        require('remark-code-titles'),
      ],
      rehypePlugins: [require('mdx-prism')],
    }),
    withSvgr,
  ],
  nextConfig,
)

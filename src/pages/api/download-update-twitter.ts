import {Octokit} from '@octokit/rest'

let octokit = new Octokit({
  auth: process.env.GITHUB_SCRIPTKITCOM_TOKEN,
})

import Twitter from 'twitter-lite'

let client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY as string,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET as string,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})

let getReleases = async () => {
  let releases = await octokit.paginate('GET /repos/{owner}/{repo}/releases', {
    owner: 'johnlindquist',
    repo: 'kitapp',
  })

  let dmgs = releases.map((release) =>
    release.assets.find((asset) => asset.name.endsWith('.dmg')),
  )

  let count = dmgs
    .filter(Boolean)
    .reduce((acc, asset) => (acc += asset.download_count), 0)

  return count
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {NextApiRequest, NextApiResponse} from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  let response = await client.post('account/update_profile', {
    name: `John (${total}) Lindquist`,
    description: `
The number in my name updates when someone downloads Script Kit 🤓
      
scriptkit.com Creator |
egghead.io founder |
nap enthusiast
  `,
  })

  res.statusCode = 200
  res.json({name: 'John Doe'})
}

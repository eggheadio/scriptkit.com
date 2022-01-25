import {Octokit} from '@octokit/rest'
import axios from 'axios'

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

type Asset = {download_count: number}

let getReleaseCount = async () => {
  let releases = await octokit.paginate('GET /repos/{owner}/{repo}/releases', {
    owner: 'johnlindquist',
    repo: 'kitapp',
  })

  let dmgs = releases.flatMap(
    (release) =>
      release.assets.filter(
        (asset) =>
          asset.name.endsWith('.dmg') ||
          asset.name.endsWith('.exe') ||
          asset.name.endsWith('.AppImage'),
      ) as Asset[],
  )

  let count = dmgs
    .filter(Boolean)
    .reduce((acc, asset) => (acc += asset.download_count), 0)

  return count
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {NextApiRequest, NextApiResponse} from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(`🆙date twitter count`)
  let count = await getReleaseCount()
  let response = await client.post('account/update_profile', {
    name: `John (${count}) Lindquist`,
    //     description: `
    // The number in my name updates when someone downloads Script Kit 🤓

    // · scriptkit.com Creator
    // · egghead.io founder
    // · nap enthusiast
    //   `,
  })

  console.log({count})

  // await axios.post(`https://hooks.zapier.com/hooks/catch/3863955/b98o9wx/`, {
  //   count,
  //   timestamp: new Date().toUTCString(),
  // })

  res.statusCode = 200
  res.json({name: 'John Doe'})
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {NextApiRequest, NextApiResponse} from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let {default: tree} = await import('tree-cli')
  let tmpTree = await tree({l: 4})
  console.log(`tmpTree report`)
  console.log(tmpTree.report)

  await import('@johnlindquist/kit')
  res.json(await kit('repos'))
}

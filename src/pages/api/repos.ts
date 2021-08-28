// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {NextApiRequest, NextApiResponse} from 'next'
import '@johnlindquist/kit'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await import('@johnlindquist/kit/scripts/tmp/repo')
  res.json(await kit('repos'))
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {NextApiRequest, NextApiResponse} from 'next'
import '@johnlindquist/kit'
import '@johnlindquist/kit/tmp/scripts/repos.js'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.json(await kit('repos'))
}

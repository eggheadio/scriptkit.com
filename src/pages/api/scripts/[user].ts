// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {NextApiRequest, NextApiResponse} from 'next'
import {getUserScripts} from 'utils/get-user-scripts'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200
  const {user} = req.query

  const scripts = await getUserScripts(user as string)

  res.send(scripts)
}

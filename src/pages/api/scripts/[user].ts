// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {NextApiRequest, NextApiResponse} from 'next'
import {getUserScripts} from 'utils/get-user-scripts'

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200
  const {user} = req.query

  const scripts = getUserScripts(user as string)

  res.send(scripts)
}

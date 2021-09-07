import {NextApiRequest, NextApiResponse} from 'next'
import '@johnlindquist/kit'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {channel = 'main'} = req.query
  res.json(await kit(`get-kit-release ${channel}`))
}

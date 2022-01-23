import {NextApiRequest, NextApiResponse} from 'next'
import '@johnlindquist/kit'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await post(`https://hooks.zapier.com/hooks/catch/3863955/b9x0a39`, req.body)

  res.send(req.body)
}

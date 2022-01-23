import {NextApiRequest, NextApiResponse} from 'next'
import '@johnlindquist/kit'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.redirect(`/data/showandtell.json`)
}

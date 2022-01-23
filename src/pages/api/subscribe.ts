import {NextApiRequest, NextApiResponse} from 'next'
import '@johnlindquist/kit'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {email_address} = req.body

  await post(`https://app.convertkit.com/forms/2216586/subscriptions`, {
    email_address,
  })

  res.send({email_address})
}

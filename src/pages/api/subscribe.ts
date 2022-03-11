import {NextApiRequest, NextApiResponse} from 'next'
import '@johnlindquist/globals'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {email_address} = req.body

  const response = await post(
    `https://app.convertkit.com/forms/2216586/subscriptions`,
    {
      email_address,
    },
  )

  res.send(response.data)
}

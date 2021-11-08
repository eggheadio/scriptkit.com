import {NextApiRequest, NextApiResponse} from 'next'

import axios from 'axios'
export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body)

  const {action, comment} = req.body

  if (['edited', 'created', 'deleted'].includes(action) && !comment) {
    const response = await axios.post(
      `https://api.vercel.com/v1/integrations/deploy/prj_zRKFY6s5AgVZAn563mHGiMul3IAi/fcS0xcULP0`,
      {},
    )

    res.send(response.data)
  } else {
    res.send(req.body)
  }
}

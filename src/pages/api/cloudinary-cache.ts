import {NextApiRequest, NextApiResponse} from 'next'
import {v2 as cloudinary} from 'cloudinary'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  cloudinary.config({
    cloud_name: 'johnlindquist',
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  })

  const source = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/opengraph?${req.query}`

  const imageUrl = cloudinary.url(source, {
    type: 'fetch',
  })

  res.redirect(imageUrl)
}

import {NextApiRequest, NextApiResponse} from 'next'
import {v2 as cloudinary} from 'cloudinary'
import qs from 'query-string'
import slugify from 'slugify'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {user, title} = req.query
  cloudinary.config({
    cloud_name: 'johnlindquist',
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  })

  const source = `https://${
    process.env.NEXT_PUBLIC_VERCEL_URL
  }/api/opengraph/kit/${user}/${slugify(title as string, {
    lower: true,
  })}.png?${qs.stringify(req.query)}`

  const imageUrl = cloudinary.url(source, {
    type: 'fetch',
  })

  res.redirect(imageUrl)
}

import {NextApiRequest, NextApiResponse} from 'next'
import {v2 as cloudinary} from 'cloudinary'
import slugify from 'slugify'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    user,
    title,
    backgroundImage,
    description = '',
    twitter = '',
  } = req.query

  cloudinary.config({
    cloud_name: 'johnlindquist',
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  })

  const imageUrl = cloudinary.url(
    `/kit/v0/og-images/${user}-${slugify(title as string)}.png`,
    {
      // resouce_type: "raw"
      sign_url: true,
      // secure: true,
      custom_pre_function: {
        function_type: 'remote',
        source: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/opengraph?user=${user}&description=${description}&twitter=${twitter}&title=${title}&backgroundImage=${backgroundImage}`,
      },
    },
  )

  res.redirect(imageUrl)
}

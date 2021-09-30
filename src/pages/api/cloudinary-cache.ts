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

  console.log(cloudinary)

  const imagePath = `/kit/${user}-${slugify(title as string)}.png`
  console.log({imagePath})

  const source = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/opengraph?user=${user}&description=${description}&twitter=${twitter}&title=${title}&backgroundImage=${backgroundImage}`
  console.log({source})

  const imageUrl = cloudinary.url(imagePath, {
    // resouce_type: "raw"
    sign_url: true,
    // secure: true,
    custom_pre_function: {
      function_type: 'remote',
      source,
    },
  })

  console.log({imageUrl})

  res.redirect(imageUrl)
}

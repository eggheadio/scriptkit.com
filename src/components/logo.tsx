import Image from 'next/image'

const Logo = () => {
  return (
    <Image
      src={require('../../public/assets/logo.png')}
      quality={100}
      priority
      alt="Script Kit Logo"
    />
  )
}

export default Logo

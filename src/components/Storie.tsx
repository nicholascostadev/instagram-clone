import Image from 'next/image'

interface StorieProps {
  username?: string
  image?: string
}
export const Storie = ({ username, image }: StorieProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <button className="bg-blue-800 rounded-full flex justify-center items-center p-1">
        <Image
          src={image ?? 'https://github.com/nicholascostadev.png'}
          width={50}
          height={50}
          layout="fixed"
          className="rounded-full outline-red-300 ring-offset-1"
          alt="nicholascostadev"
        />
      </button>
      <p className="text-xs">
        {username
          ? username.length > 11
            ? username?.substring(0, 11) + '...'
            : username
          : 'nicholascostadev'}
      </p>
    </div>
  )
}

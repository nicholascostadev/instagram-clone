import Image from 'next/image'

interface StorieProps {
  username?: string
  image?: string
}
export const Storie = ({ username, image }: StorieProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <button
        className="flex items-center justify-center rounded-full border border-blue-800 p-1"
        type="button"
      >
        <Image
          src={image ?? 'https://github.com/nicholascostadev.png'}
          width={50}
          height={50}
          className="h-[50px] w-[50px] rounded-full outline-red-300"
          alt=""
        />
      </button>
      <p className="text-xs">
        {username
          ? username.length > 11
            ? `${username?.substring(0, 11)}...`
            : username
          : 'nicholascostadev'}
      </p>
    </div>
  )
}

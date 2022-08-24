import Image from 'next/image'

export const Suggestion = () => {
  return (
    <div className="flex justify-center items-center gap-2">
      <div className="border rounded-full flex justify-center items-center">
        <Image
          src="https://github.com/nicholascostadev.png"
          alt=""
          width={30}
          height={30}
          layout="fixed"
          className="rounded-full"
        />
      </div>
      <div>
        <strong className="text-sm">nicholas_m_costa</strong>
        <p className="text-xs text-gray-400">
          Followed by mauricio_fcarv + 50 more
        </p>
      </div>
      <a href="#" className="ml-auto text-xs text-blue-500 font-bold">
        Follow
      </a>
    </div>
  )
}

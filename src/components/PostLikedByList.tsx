import Image from 'next/image'

export const PostLikedByList = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex rounded-full">
        <Image
          src="https://instagram.fsdu7-1.fna.fbcdn.net/v/t51.2885-19/283470845_1238401380302268_6149023941426384671_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fsdu7-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=u6kIZNGZy3QAX_ZTlhE&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AT-GOv_gMxYMMIspHLqqWMYIwaf99QetWvIcf6dNig6GBQ&oe=630B709F&_nc_sid=8fd12b"
          layout="fixed"
          alt=""
          height={20}
          width={20}
          className="rounded-full "
        />
      </div>
      <p className="text-sm">Liked by lucas_mesquita21 and 13.021 others</p>
    </div>
  )
}

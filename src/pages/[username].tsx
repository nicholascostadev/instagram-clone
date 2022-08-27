import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Header } from '../components/Header'
import { ProfileContent } from '../components/Profile/ProfileContent'
import { ProfileHeader } from '../components/Profile/ProfileHeader'
import { trpc } from '../utils/trpc'

const Profile = () => {
  const { query } = useRouter()
  const { username } = query

  const { data: loggedUser } = useSession()
  const { data: userInfo, isError } = trpc.useQuery([
    'user.getUserInfo',
    {
      username: String(username),
    },
  ])

  if (!userInfo || isError) {
    return (
      <>
        <Header />
        <div className="w-[1200px] mx-auto text-center flex flex-col py-8 gap-8">
          <h1 className="font-bold text-2xl">
            Sorry, this page isn&apos;t available.
          </h1>
          <p>
            The link you followed may be broken, or the page may have been
            removed. Go back to Instagram.
          </p>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-2 mt-10 ">
        <ProfileHeader userInfo={userInfo} sessionData={loggedUser} />
        <ProfileContent posts={userInfo.posts} />
      </div>
    </>
  )
}

export default Profile

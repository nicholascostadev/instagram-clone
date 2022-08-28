import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { SpinnerGap } from 'phosphor-react'
import { Header } from '../components/Header'
import { NotFound } from '../components/NotFound'
import { ProfileContent } from '../components/Profile/ProfileContent'
import { ProfileHeader } from '../components/Profile/ProfileHeader'
import { trpc } from '../utils/trpc'

const Profile = () => {
  const { query } = useRouter()
  const { username } = query

  const { data: loggedUser } = useSession()
  const {
    data: userInfo,
    isError,
    isLoading,
  } = trpc.useQuery([
    'user.getUserInfo',
    {
      username: String(username),
    },
  ])

  if ((!userInfo && !isLoading) || isError) {
    return <NotFound />
  }

  if (isLoading && !userInfo)
    return (
      <>
        <Header />
        <div className="flex justify-center items-center h-[calc(100vh-79px)]">
          <SpinnerGap size={25} className="animate-spin" />
        </div>
      </>
    )

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-2 mt-10 ">
        <ProfileHeader userInfo={userInfo} sessionData={loggedUser} />
        <ProfileContent posts={userInfo?.posts} />
      </div>
    </>
  )
}

export default Profile

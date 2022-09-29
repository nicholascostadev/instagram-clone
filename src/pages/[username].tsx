import { Comment, Follows, Like, Post, User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { SpinnerGap } from 'phosphor-react'
import { useState } from 'react'
import { Header } from '../components/Header'
import { NotFound } from '../components/NotFound'
import { ProfileContent } from '../components/Profile/ProfileContent'
import { ProfileHeader } from '../components/Profile/ProfileHeader'
import { trpc } from '../utils/trpc'

type TUserInfo =
  | (User & {
      followers: (Follows & {
        follower: {
          id: string
          username: string | null
        }
      })[]
      following: Follows[]
      posts: (Post & {
        author: User
        comments: Comment[]
        likes: Like[]
      })[]
    })
  | null

const Profile = () => {
  const { query } = useRouter()
  const { username } = query

  const { data: loggedUser } = useSession()
  const [userInfoToShow, setUserInfoToShow] = useState({} as TUserInfo)
  const [userFollows, setUserFollows] = useState(false)

  const {
    data: userInfo,
    isError,
    isLoading,
  } = trpc.useQuery(
    [
      'user.getUserInfo',
      {
        username: String(username),
      },
    ],
    {
      onSuccess: (data) => {
        setUserInfoToShow(data)
        setUserFollows(
          data?.followers?.findIndex(
            (user) => user.follower.id === loggedUser?.user?.id,
          ) !== -1,
        )
      },
    },
  )

  const toggleUserFollows = () => {
    setUserFollows((prev) => !prev)
  }

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
      <Head>
        <title>{`${userInfoToShow?.name} (@${username})`}</title>
      </Head>
      <Header />
      <div className="max-w-6xl mx-auto px-2 mt-10 ">
        <ProfileHeader
          userFollows={userFollows}
          userInfo={userInfoToShow}
          sessionData={loggedUser}
          toggleUserFollows={toggleUserFollows}
        />
        <ProfileContent posts={userInfo?.posts} />
      </div>
    </>
  )
}

export default Profile

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

type TFollower = Follows & {
  follower: {
    id: string
    username: string | null
  }
}

type TUserInfo =
  | (User & {
      followers: TFollower[]
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
  const [followedBy, setFollowedBy] = useState<TFollower[]>([] as TFollower[])

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
        // What's happening is: We want to show recommendations to the user
        // based on who he follows, so for example: user A follows user B, and user B follows user C
        // so we want to recommend user C to user A, because he follows user B, who follows user C
        // basically only recommend users that the other users he follows, follows too
        const newFollowers = data?.followers.filter((user) => {
          return (
            user.follower.followers.findIndex(
              (follower) => follower.followerId === loggedUser?.user?.id,
            ) !== -1
          )
        })

        setFollowedBy(newFollowers ?? [])
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
        <div className="flex h-[calc(100vh-79px)] items-center justify-center">
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
      <div className="mx-auto mt-10 max-w-6xl px-2 ">
        <ProfileHeader
          userFollows={userFollows}
          userInfo={userInfoToShow}
          sessionData={loggedUser}
          toggleUserFollows={toggleUserFollows}
          followedBy={followedBy}
        />
        <ProfileContent posts={userInfo?.posts} />
      </div>
    </>
  )
}

export default Profile

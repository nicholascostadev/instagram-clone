import { User } from '@prisma/client'
import { Session } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { DotsThree, Gear, User as UserIcon } from 'phosphor-react'

interface ProfileHeaderProps {
  userInfo: User
  sessionData: Session | null
}

interface ProfileHeaderDescriptionProps {
  websiteURL: string | null
  description: string | null
  userInfo: User
}

const ProfileHeaderMainInfo = ({
  websiteURL,
  description,
  userInfo,
}: ProfileHeaderDescriptionProps) => {
  if (!websiteURL) {
    return (
      <div>
        <strong className="text-bold">{userInfo.name}</strong>
        {description && <p className="w-full">{description}</p>}
      </div>
    )
  }
  const formattedWebsiteURL = websiteURL.split('https://')[1]
  return (
    <div>
      <strong className="text-bold">{userInfo.name}</strong>
      {description && <p className="w-full">{description}</p>}

      {websiteURL && (
        <a href={websiteURL} className="font-bold hover:underline">
          {formattedWebsiteURL}
        </a>
      )}
    </div>
  )
}

const ProfileHighlight = ({
  highlightImage,
  highlightId,
  highlightName,
}: {
  highlightImage: string | null
  highlightId: string
  highlightName: string
}) => {
  return (
    <Link
      href={`/stories/highlights/${highlightId}`}
      passHref
      className="max-w-[119px]"
    >
      <a className="flex flex-col justify-center items-center gap-2 w-full">
        <div className="flex justify-center items-center border border-red-500 p-1 rounded-full">
          <Image
            src={highlightImage || 'https://github.com/nicholascostadev.png'}
            alt=""
            layout="fixed"
            width={77}
            height={77}
            className="rounded-full"
          />
        </div>
        <p className="overflow-hidden" aria-valuetext={highlightName}>
          {highlightName.length > 12
            ? `${highlightName.slice(0, 9)}...`
            : highlightName}
        </p>
      </a>
    </Link>
  )
}

const ProfileHighlights = () => {
  return (
    <div className="flex items-center gap-4 mt-20 col-span-full">
      <div className="flex justify-center items-center gap-12 max-w-full overflow-x-auto mx-auto md:ml-28">
        <ProfileHighlight
          highlightId=""
          highlightImage=""
          highlightName="Olá"
        />
        <ProfileHighlight highlightId="" highlightImage="" highlightName="A" />
        <ProfileHighlight
          highlightId=""
          highlightImage=""
          highlightName="aaaaaaaaaaaaaaaaaaaaaa"
        />
        <ProfileHighlight
          highlightId=""
          highlightImage=""
          highlightName="aaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        />
        <ProfileHighlight
          highlightId=""
          highlightImage=""
          highlightName="aaaaaaaaaaaaa"
        />
      </div>
    </div>
  )
}

export const ProfileHeader = ({
  userInfo,
  sessionData,
}: ProfileHeaderProps) => {
  return (
    <header className="grid grid-cols-1 md:grid-cols-2 max-w-3xl">
      <div className="w-96 h-48 flex justify-center items-center">
        {userInfo.image ? (
          <Image
            src={userInfo.image}
            alt=""
            width={150}
            height={150}
            layout="fixed"
            className="rounded-full"
          />
        ) : (
          <div className="bg-gray-300 rounded-full">
            <UserIcon
              size={150}
              className="rounded-full"
              color="rgb(156 163 175)"
            />
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 gap-6">
        <div className="flex gap-2 items-end justify-between">
          <p className="text-xl">{userInfo.username}</p>
          {userInfo.id === sessionData?.user?.id ? (
            <div className="flex justify-center items-center gap-3">
              <button className="border px-2 py-1 rounded-md text-sm font-bold">
                Edit Profile
              </button>
              <Gear size={25} className="cursor-pointer" />
            </div>
          ) : (
            <div className="flex justify-center items-center gap-3">
              <button className="px-3 py-1 rounded-md bg-blue-600 text-white font-bold">
                Follow
              </button>
              <DotsThree size={25} />
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <p className="text-sm">
            <span className="font-bold">8</span> posts
          </p>
          <p className="text-sm">
            <span className="font-bold">8</span> followers
          </p>
          <p className="text-sm">
            <span className="font-bold">8</span> following
          </p>
        </div>

        <ProfileHeaderMainInfo
          websiteURL={userInfo.website}
          description={userInfo.description}
          userInfo={userInfo}
        />
      </div>
      <ProfileHighlights />
    </header>
  )
}

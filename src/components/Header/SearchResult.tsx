import * as Avatar from '@radix-ui/react-avatar'
import Link from 'next/link'
import { getUserInitials } from '../../utils/formatters'

type SearchResultProps = {
  username: string
  userImage: string | null
  userName: string | null
}

export const SearchResult = ({
  username,
  userImage,
  userName,
}: SearchResultProps) => {
  return (
    <li>
      <Link href={`/${username}`} className="flex items-center gap-2">
        <Avatar.Root className="AvatarRoot flex h-8 w-8 items-center justify-center rounded-full">
          <Avatar.Image
            className="AvatarImage flex items-center justify-center rounded-full object-cover"
            src={userImage ?? ''}
            alt={`${userName ?? ''} profile picture`}
          />

          <Avatar.Fallback
            className="AvatarFallback flex h-8 w-8 items-center justify-center rounded-full bg-fuchsia-500 p-1 text-sm text-white"
            delayMs={600}
          >
            {getUserInitials(userName)}
          </Avatar.Fallback>
        </Avatar.Root>
        <div>
          <strong>{username}</strong>
          <p className="text-sm">{userName}</p>
        </div>
      </Link>
    </li>
  )
}

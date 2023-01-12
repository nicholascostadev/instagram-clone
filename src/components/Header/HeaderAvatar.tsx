import * as Avatar from '@radix-ui/react-avatar'
import { getUserInitials } from '../../utils/formatters'

type HeaderAvatarProps = {
  userImage: string | null | undefined
  userName: string | null | undefined
}

export const HeaderAvatar = ({ userImage, userName }: HeaderAvatarProps) => {
  return (
    <Avatar.Root className="AvatarRoot flex h-8 w-8 items-center justify-center rounded-full">
      <Avatar.Image
        className="AvatarImage flex items-center justify-center rounded-full object-cover"
        src={userImage as string}
        alt={`${userName ?? ''} profile picture`}
      />

      <Avatar.Fallback
        className="AvatarFallback flex h-8 w-8 items-center justify-center rounded-full bg-fuchsia-500 p-1 text-sm text-white"
        delayMs={600}
      >
        {getUserInitials(userName)}
      </Avatar.Fallback>
    </Avatar.Root>
  )
}

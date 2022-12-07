import { Comment, Follows, Like, Post, User } from '@prisma/client'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowsCounterClockwise,
  Bookmark,
  Gear,
  UserCircle,
} from 'phosphor-react'

interface HeaderProfileDropdownProps {
  userInfo:
    | (User & {
        followers: Follows[]
        following: Follows[]
        posts: (Post & {
          author: User
          likes: Like[]
          comments: Comment[]
        })[]
      })
    | null
    | undefined
}

export const HeaderProfileDropdown = ({
  userInfo,
}: HeaderProfileDropdownProps) => {
  if (!userInfo) {
    return (
      <div className="flex items-center justify-center gap-2 text-gray-400">
        <button
          className="rounded-md bg-blue-500 px-2 py-1 font-bold text-white hover:bg-blue-600"
          onClick={() => signIn('google')}
          type="button"
        >
          Entrar
        </button>
      </div>
    )
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex items-center justify-center rounded-full leading-none outline-1">
        <Image
          src={
            userInfo?.image
              ? String(userInfo.image)
              : 'https://github.com/nicholascostadev.png'
          }
          className="h-8 w-8 rounded-full"
          width={30}
          height={30}
          alt="Profile image dropdown menu"
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side={'bottom'}
          sideOffset={2}
          className="rounded-md border bg-white shadow-lg"
        >
          <DropdownMenu.Label />
          <DropdownMenu.Item />

          <DropdownMenu.Group className="w-64 text-sm">
            <DropdownMenu.Item>
              <Link
                href={`/${userInfo?.username}`}
                passHref
                className="dropdownMenuItem rounded-t-md"
              >
                <UserCircle size={25} />
                Profile
              </Link>
              <DropdownMenu.Separator />
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Link href="/feed" passHref className="dropdownMenuItem">
                <Bookmark size={25} />
                Saved
              </Link>
              <DropdownMenu.Separator />
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Link href="/accounts/edit" passHref className="dropdownMenuItem">
                <Gear size={25} />
                Settings
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Link href="/" passHref className="dropdownMenuItem">
                <ArrowsCounterClockwise size={25} />
                Change Account
              </Link>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Group>
            <DropdownMenu.Separator>
              <hr className="mt-2" />
            </DropdownMenu.Separator>
            <DropdownMenu.Item>
              <button
                className="dropdownMenuItem text-md w-full rounded-b-md !p-2"
                onClick={() => signOut()}
                type="button"
              >
                Sair
              </button>
            </DropdownMenu.Item>
          </DropdownMenu.Group>

          <DropdownMenu.Arrow />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

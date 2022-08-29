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
      <div className="container flex justify-center items-center gap-2 text-gray-400 py-3">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-md mt-2"
          onClick={() => signIn('google')}
        >
          Entrar
        </button>
      </div>
    )
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex justify-center items-center outline-1 leading-none rounded-full">
        <Image
          src={
            userInfo?.image
              ? String(userInfo.image)
              : 'https://github.com/nicholascostadev.png'
          }
          className="rounded-full h-12 w-12"
          width={30}
          height={30}
          alt="nicholascostadev"
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side={'bottom'}
          sideOffset={2}
          className="shadow-lg border rounded-md bg-white"
        >
          <DropdownMenu.Label />
          <DropdownMenu.Item />

          <DropdownMenu.Group className="w-64 text-sm">
            <DropdownMenu.Item>
              <Link href={`/${userInfo?.username}`} passHref>
                <a href="#" className="dropdownMenuItem rounded-t-md">
                  <UserCircle size={25} />
                  Profile
                </a>
              </Link>
              <DropdownMenu.Separator />
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Link href="/feed" passHref>
                <a href="#" className="dropdownMenuItem">
                  <Bookmark size={25} />
                  Saved
                </a>
              </Link>
              <DropdownMenu.Separator />
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Link href="/" passHref>
                <a className="dropdownMenuItem">
                  <Gear size={25} />
                  Settings
                </a>
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Link href="/" passHref>
                <a className="dropdownMenuItem">
                  <ArrowsCounterClockwise size={25} />
                  Change Account
                </a>
              </Link>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Group>
            <DropdownMenu.Separator>
              <hr className="mt-2"></hr>
            </DropdownMenu.Separator>
            <DropdownMenu.Item>
              <button
                className="dropdownMenuItem rounded-b-md w-full text-md !p-2"
                onClick={() => signOut()}
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

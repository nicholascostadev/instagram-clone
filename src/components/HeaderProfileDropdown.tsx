import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { Bookmark, UserCircle } from 'phosphor-react'

export const HeaderProfileDropdown = () => {
  const { data } = useSession()
  if (!data) {
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
      <DropdownMenu.Trigger className="outline-1 leading-none rounded-full">
        <Image
          src={
            data?.user?.image
              ? String(data.user.image)
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
              <Link href={`${data?.user?.name}`} passHref>
                <a href="#" className="dropdownMenuItem rounded-t-md">
                  <UserCircle size={25} />
                  Perfil
                </a>
              </Link>
              <DropdownMenu.Separator />
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Link href="/feed" passHref>
                <a href="#" className="dropdownMenuItem">
                  <Bookmark size={25} />
                  Salvos
                </a>
              </Link>
              <DropdownMenu.Separator />
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Link href="/feed" passHref>
                <a className="dropdownMenuItem rounded-b-md">
                  <UserCircle size={25} />
                  Perfil
                </a>
              </Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item>
              <button
                className="dropdownMenuItem rounded-b-md w-full text-md"
                onClick={() => signOut()}
              >
                Sair
              </button>
            </DropdownMenu.Item>
          </DropdownMenu.Group>

          <DropdownMenu.CheckboxItem>
            <DropdownMenu.ItemIndicator />
          </DropdownMenu.CheckboxItem>

          <DropdownMenu.RadioGroup>
            <DropdownMenu.RadioItem value="">
              <DropdownMenu.ItemIndicator className="text-red bg-red " />
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>

          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger />
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent />
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>

          <DropdownMenu.Separator />
          <DropdownMenu.Arrow />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

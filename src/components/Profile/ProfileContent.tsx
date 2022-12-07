import * as Dialog from '@radix-ui/react-dialog'
import { Comment, Like, Post } from '@prisma/client'
import * as Tabs from '@radix-ui/react-tabs'
import { AddressBook, GridFour } from 'phosphor-react'
import { useCallback, useEffect, useState } from 'react'
import { PostModal } from '../Post/PostModal'
import { ProfilePost } from './ProfilePost'
import Router from 'next/router'
import { trpc } from '../../utils/trpc'

export type TPost = Post & {
  comments: Comment[]
  likes: Like[]
}

interface ProfileContentProps {
  posts: TPost[] | undefined
}

export const ProfileContent = ({ posts }: ProfileContentProps) => {
  const username = String(Router.query.username)
  const utils = trpc.useContext()
  const [currentPostId, setCurrentPostId] = useState<number>()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleChangePostId = useCallback(
    (newPostId: number) => {
      setCurrentPostId(newPostId)
      utils.post.postModalInfo.invalidate()

      Router.push(`/${username}?postId=${newPostId}`, undefined, {
        shallow: true,
      })
    },
    [username, utils.post.postModalInfo],
  )

  useEffect(() => {
    if (Router.query.postId) {
      Router.push(`/p/${Router.query.postId}`)
    }
  }, [])

  useEffect(() => {
    if (!isModalOpen) {
      Router.replace(`/${username}`, undefined, {
        shallow: true,
      })
    }
  }, [isModalOpen, username])

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen} modal>
      <div className="mt-20 w-full border-t">
        <Tabs.Root
          className="flex flex-col items-center justify-center"
          defaultValue="POSTS"
        >
          <Tabs.List>
            <div className="flex">
              <Tabs.Trigger className="profile-tab" value="POSTS">
                <GridFour size={12} />
                <p>POSTS</p>
              </Tabs.Trigger>
              <Tabs.Trigger className="profile-tab" value="TAGGED">
                <AddressBook size={12} />
                <p>TAGGED</p>
              </Tabs.Trigger>
            </div>
          </Tabs.List>
          <Tabs.Content value="POSTS">
            <div className="mt-4 grid grid-cols-2 gap-1 md:grid-cols-3 md:gap-6">
              {posts?.map((post) => (
                <ProfilePost
                  key={post.id}
                  image={post.image}
                  commentsAmount={post.comments.length}
                  likesAmount={post.likes.length}
                  postId={post.id}
                  changePostId={handleChangePostId}
                />
              ))}
            </div>
          </Tabs.Content>
          <Tabs.Content value="TAGGED">
            <div>
              <p>TAGGED</p>
            </div>
          </Tabs.Content>
        </Tabs.Root>
        {currentPostId && (
          <PostModal changePostId={handleChangePostId} postId={currentPostId} />
        )}
      </div>
    </Dialog.Root>
  )
}

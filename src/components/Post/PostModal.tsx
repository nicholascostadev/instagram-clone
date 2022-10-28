import * as Dialog from '@radix-ui/react-dialog'
import Router from 'next/router'
import Image from 'next/image'
import { CaretLeft, CaretRight, Spinner } from 'phosphor-react'
import { trpc } from '../../utils/trpc'
import { PostInfo } from './PostInfo'
import { useState } from 'react'

interface PostModalProps {
  postId: number
  changePostId: (newPostId: number) => void
}

export const PostModal = ({ postId, changePostId }: PostModalProps) => {
  const profileUsername = String(Router.query.username)
  const [currentPostIndex, setCurrentPostIndex] = useState(0)
  const { data: posts } = trpc.useQuery(
    ['post.postModalInfo', { id: postId, profileUsername }],
    {
      onSuccess: (data) => {
        setCurrentPostIndex(data.findIndex((post) => post.id === postId))
      },
      staleTime: 1000 * 60 * 60, // 1hour
      refetchOnWindowFocus: false,
    },
  )

  console.log('Rendered PostModal with Id: ', postId)

  const handleGotoPost = (action: 'prev' | 'next') => () => {
    // if no posts, return (shouldn't happen)
    if (!posts) return

    const isPrev = action === 'prev'

    // if the current post is the first post and the user wants to go to the previous post
    // or if the current post is the last post and the user wants to go to the next post
    // then return
    if (
      (isPrev && currentPostIndex === 0) ||
      (!isPrev && currentPostIndex === posts.length - 1)
    )
      return

    // if the user wants to go to the previous post
    // then decrease the currentPostIndex by 1
    // else increase the currentPostIndex by 1
    const newPostIndex = isPrev ? currentPostIndex - 1 : currentPostIndex + 1

    const changeTo = posts[newPostIndex]?.id
    // set the currentPostIndex to the newPostIndex
    setCurrentPostIndex(newPostIndex)

    // if no id is found then return
    if (!changeTo) return

    // change the postId to the newPostId
    changePostId(changeTo)
  }

  const postImage = posts?.[currentPostIndex]?.image

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 h-screen w-screen bg-black/40" />

      <Dialog.Content className="fixed flex h-full w-full">
        {/* TODO: Position them */}
        <div className="fixed top-[50%] left-[50%] flex h-[95%] w-[75%] translate-x-[-50%] translate-y-[-50%] rounded-tr-lg rounded-br-lg bg-white">
          <div className="relative min-h-full w-[68%]">
            {postImage ? (
              <Image src={postImage} alt="" layout="fill" objectFit="contain" />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Spinner size={50} className="animate-spin text-gray-400" />
              </div>
            )}
          </div>
          <div className="flex w-full flex-1 flex-col rounded-tr-lg rounded-br-lg">
            <PostInfo postData={posts?.[currentPostIndex]} />
          </div>
        </div>
        <button
          onClick={handleGotoPost('prev')}
          className="fixed left-10 top-[50%] z-20 flex translate-y-[-50%] items-center justify-center rounded-full bg-white p-1"
        >
          <CaretLeft size={25} />
        </button>
        <button
          onClick={handleGotoPost('next')}
          className="fixed right-10 top-[50%] z-20 flex translate-y-[-50%] items-center justify-center rounded-full bg-white p-1"
        >
          <CaretRight size={25} />
        </button>
      </Dialog.Content>
    </Dialog.Portal>
  )
}

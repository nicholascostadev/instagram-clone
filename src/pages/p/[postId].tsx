import Image from 'next/image'
import { useRouter } from 'next/router'
import { SpinnerGap } from 'phosphor-react'
import { Header } from '../../components/Header'
import { NotFound } from '../../components/NotFound'
import { PostInfo } from '../../components/Post/PostInfo'
import { trpc } from '../../utils/trpc'

const Post = () => {
  const router = useRouter()
  const { postId } = router.query

  const {
    data: postData,
    isError,
    isLoading,
  } = trpc.useQuery(['post.getSpecificPost', { id: Number(postId) }])

  if ((!postData && !isLoading) || isError) return <NotFound />

  if (isLoading && !postData) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center h-[calc(100vh-79px)]">
          <SpinnerGap size={25} className="animate-spin" />
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="flex flex-col w-full justify-center items-center mt-10 ">
        <div className="flex border w-[933px]">
          <Image
            src={postData?.image ?? ''}
            alt=""
            layout="fixed"
            width={598}
            height={598}
          />
          <PostInfo postData={postData} />
        </div>
      </div>
    </>
  )
}

export default Post

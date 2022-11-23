import Image from 'next/image'
import { useRouter } from 'next/router'
import { SpinnerGap } from 'phosphor-react'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { NotFound } from '../../components/NotFound'
import { PostInfo } from '../../components/Post/PostInfo'
import { trpc } from '../../utils/trpc'

export default function Post() {
  const router = useRouter()
  const { postId } = router.query

  const {
    data: postData,
    isError,
    isLoading,
  } = trpc.post.getSpecificPost.useQuery(
    {
      id: Number(postId),
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  )

  const postToShow = { ...postData } as typeof postData

  if ((!postData && !isLoading) || isError) return <NotFound />

  if (isLoading && !postData) {
    return (
      <>
        <Header />
        <div className="flex h-[calc(100vh-79px)] items-center justify-center">
          <SpinnerGap size={25} className="animate-spin" />
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="mt-10 flex w-full flex-col items-center justify-center">
        <div className="flex w-[933px] border">
          <Image
            src={postData?.image ?? ''}
            alt=""
            width={598}
            height={598}
            style={{ objectFit: 'contain' }}
          />
          <PostInfo postData={postToShow} />
        </div>
      </div>
      <Footer />
    </>
  )
}

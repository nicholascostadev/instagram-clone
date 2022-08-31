import { Comment, Like, Post, User } from '@prisma/client'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { trpc } from '../utils/trpc'

export type PostData =
  | (Post & {
      author: User
      likes: (Like & {
        user: User | null
      })[]
      comments: Comment[]
    })[]
  | undefined

interface FeedPostsContextProps {
  feedPosts:
    | (Post & {
        author: User
        likes: (Like & {
          user: User | null
        })[]
        comments: Comment[]
      })[]
    | undefined
  setFeedPosts: Dispatch<SetStateAction<PostData>>
  isLoading: boolean
}

export const FeedPostsContext = createContext<FeedPostsContextProps>(
  {} as FeedPostsContextProps,
)

export const FeedPostsContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const { data, isLoading } = trpc.useQuery(['post.getAll'])
  const [feedPosts, setFeedPosts] = useState<PostData>([] as PostData)

  useEffect(() => {
    setFeedPosts(data)
  }, [data])

  return (
    <FeedPostsContext.Provider value={{ feedPosts, setFeedPosts, isLoading }}>
      {children}
    </FeedPostsContext.Provider>
  )
}

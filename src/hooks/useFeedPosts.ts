import { useContext } from 'react'
import { FeedPostsContext } from '../contexts/FeedPostsContext'

export const useFeedPosts = () => useContext(FeedPostsContext)

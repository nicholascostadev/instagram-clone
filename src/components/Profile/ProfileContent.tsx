import { Comment, Like, Post } from '@prisma/client'
import * as Tabs from '@radix-ui/react-tabs'
import { AddressBook, GridFour } from 'phosphor-react'
import { ProfilePost } from './ProfilePost'

type TPost = Post & {
  comments: Comment[]
  likes: Like[]
}

interface ProfileContentProps {
  posts: TPost[] | undefined
}

export const ProfileContent = ({ posts }: ProfileContentProps) => {
  return (
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
    </div>
  )
}

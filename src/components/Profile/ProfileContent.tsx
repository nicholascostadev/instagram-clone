import { Comment, Like, Post } from '@prisma/client'
import * as Tabs from '@radix-ui/react-tabs'
import { AddressBook, GridFour } from 'phosphor-react'
import { ProfilePost } from './ProfilePost'

type TPost = Post & {
  comments: Comment[]
  likes: Like[]
}

interface ProfileContentProps {
  posts: TPost[]
}

export const ProfileContent = ({ posts }: ProfileContentProps) => {
  return (
    <div className="border-t w-full mt-20">
      <Tabs.Root
        className="flex flex-col justify-center items-center"
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4">
            {posts?.map((post) => (
              <ProfilePost
                key={post.id}
                image={post.image}
                commentsAmount={post.comments.length}
                likesAmount={post.likes.length}
                postId="1"
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

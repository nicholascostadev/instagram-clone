import { Follows } from '@prisma/client'

export type TFollowedByArr = (Follows & {
  follower: {
    username: string | null
  }
})[]

export function formatFollow(followedByArr: TFollowedByArr) {
  if (followedByArr.length > 0) {
    return `Followed by ${followedByArr[0]?.follower.username}`
  }
  return ''
}

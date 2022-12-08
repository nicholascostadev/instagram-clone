import { Follows } from '@prisma/client'

export type TFollowedByArr = (Follows & {
  follower: {
    username: string | null
  }
})[]

/**
 * It takes an array of followedBy objects and returns a string that says "Followed
 * by [username]" if the array has at least one element, and an empty string
 * otherwise
 * @param {TFollowedByArr} followedByArr - TFollowedByArr
 * @returns A string
 */
export function formatFollow(followedByArr: TFollowedByArr) {
  if (followedByArr.length > 0) {
    return `Followed by ${followedByArr[0]?.follower.username}`
  }
  return ''
}

export const getUserInitials = (name: string | null): string => {
  if (!name) return ''

  return name
    .split(' ')
    .map((name) => name[0])
    .join('')
}

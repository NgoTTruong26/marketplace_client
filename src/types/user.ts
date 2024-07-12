export interface Profile {
  userId: number
  username: string
  avatarUrl: string
  bannerUrl: string
  bio: any
}

export interface User {
  id: number
  email: string
  walletBalance: number
  profile: Profile
}

export interface UserAuth {
  accessToken: string
}

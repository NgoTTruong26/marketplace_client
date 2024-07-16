export interface Profile {
  userId: number
  username: string
  avatarUrl: string
  bannerUrl: string
  bio: string
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

import { Profile } from "./user"

export interface Collection {
    id: number
    name: string
    floorPrice: number
    description: string
    totalVolume: number
    profileId: number
    categoryId: number
    imageUrl: string
    bannerUrl: string
    profile: Profile
}

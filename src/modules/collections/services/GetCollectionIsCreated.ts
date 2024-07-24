import { useQuery } from "@tanstack/react-query"
import { api } from "configs/api"
import { Collection } from "types/collection"

export interface CollectionIsCreatedResponse {
  collections: Collection[]
}

export async function getCollectionCreated(userId: string) {
  return (
    await api.get<CollectionIsCreatedResponse>(`/collections/users/${userId}`)
  ).data
}

export default function useGetCollectionCreated(userId: string) {
  return useQuery({
    queryKey: ["getCollectionCreated", userId],
    queryFn: async () => await getCollectionCreated(userId),
  })
}

import { useQuery } from "@tanstack/react-query"
import { api } from "configs/api"
import { Collection } from "types/collection"

export interface GetTopCollectionsRequest {
  limit?: number
  column?: string
}

export interface GetTopCollectionsResponse {
  data: Collection[]
}

async function getTopCollections({
  limit = 5,
  ...data
}: GetTopCollectionsRequest) {
  return (
    (
      await api.get<GetTopCollectionsResponse>("/top-collections", {
        params: {
          limit,
          ...data,
        },
      })
    ).data.data ?? null
  )
}

export default function useGetTopCollections(limit?: number, column?: string) {
  return useQuery({
    queryKey: ["getTopCollections", limit, column],
    queryFn: async () => await getTopCollections({ limit, column }),
  })
}

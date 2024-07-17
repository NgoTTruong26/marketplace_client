import { Collection } from "../../../types/collection..ts"
import { api } from "../../../configs/api.ts"
import { useMutation } from "@tanstack/react-query"

export  interface createCollectionDTO{
  name: string,
  floor_price: number,
  description: string,
  total_volume: number,
  category_id: number,
  image_url: string,
  banner_url: string,

}


export  async function createCollection(data: createCollectionDTO) {
  return (await api.post<Collection>("/collection", data)).data
}

export function useCreateCollection() {
  return useMutation({
    mutationFn: createCollection,
  })
}


import { useInfiniteQuery } from "@tanstack/react-query"
import { api } from "configs/api"
import { BaseGetList, PageParam } from "types/getList"
import { Product } from "types/product"

export interface GetProductListRequest {
  collectionId: number
  limit?: number
  page: number
}

export interface GetProductListResponse extends BaseGetList {
  data: Product[]
}

export async function getProductList(params: GetProductListRequest) {
  return (
    await api.get<GetProductListResponse>(`/products`, {
      params,
    })
  ).data
}

export function useGetProductList(
  collectionId: number,
  limit?: number,
  enabled?: boolean,
) {
  return useInfiniteQuery({
    queryKey: ["getProductList", collectionId, limit],

    queryFn: async ({ pageParam }) =>
      await getProductList({
        collectionId,
        limit: limit ?? 15,
        page: pageParam.page,
      }),

    initialPageParam: {
      page: 1,
    } as PageParam,
    getNextPageParam: (lastPage) => {
      if (!lastPage.meta) {
        return
      }

      const { currentPage, perPage, total } = lastPage.meta

      if (currentPage * perPage > total) {
        return
      }

      return {
        page: currentPage + 1,
      }
    },
    enabled,
  })
}

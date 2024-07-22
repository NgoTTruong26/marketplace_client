import { useQuery } from "@tanstack/react-query"
import { api } from "configs/api"
import { Product } from "types/product"

export interface GetProductListFromCartRequest {
  cartId: number
}

export interface GetProductListFromCartResponse {
  data: Product[]
}

export async function getProductListFromCart(
  params: GetProductListFromCartRequest,
) {
  return (
    await api.get<GetProductListFromCartResponse>(`/products-from-cart`, {
      params,
    })
  ).data.data
}

export function useGetProductListFromCart(cartId: number) {
  return useQuery({
    queryKey: ["getProductListFromCart", cartId],
    queryFn: async () => await getProductListFromCart({ cartId }),
  })
}

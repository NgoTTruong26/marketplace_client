import { useMutation } from "@tanstack/react-query"
import { api } from "configs/api"

interface CartItem {
  product_id: number
  quantity: number
}

export interface CreateOrderRequest {
  cart_items: CartItem[]
}
export interface CreateOrderResponse {
  data: {
    walletBalance: number
  }
}

export async function createOrder(data: CreateOrderRequest) {
  return (await api.post<CreateOrderResponse>("/order", data)).data.data
}

export function useCreateOrder() {
  return useMutation({
    mutationFn: createOrder,
  })
}

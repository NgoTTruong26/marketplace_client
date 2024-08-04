import { api } from "configs/api"

export interface RefreshTokenResponse {
  accessToken: string
}

export async function refreshToken() {
  return (await api.post<RefreshTokenResponse>("/auth/refresh-token")).data
}

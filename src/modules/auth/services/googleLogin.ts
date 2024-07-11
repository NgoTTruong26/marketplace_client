import { useMutation } from "@tanstack/react-query"
import { api } from "configs/api"
import { User } from "types/user"

export interface GoogleAuthRequest {
  code: string
}

export interface GoogleAuthResponse {
  user: User
  accessToken: string
}

async function googleAuth(data: GoogleAuthRequest) {
  return (await api.post<GoogleAuthResponse>("/auth/user/google", data)).data
}

export function useGoogleAuth() {
  return useMutation({
    mutationFn: googleAuth,
  })
}

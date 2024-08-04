import axios, { AxiosError, AxiosHeaders } from "axios"
import { refreshToken } from "modules/auth/services/refreshToken"
import { toast } from "sonner"
import { useUser } from "store/user"

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const accessToken = useUser.getState().auth.accessToken
  if (accessToken)
    (config.headers as AxiosHeaders).set(
      "Authorization",
      `Bearer ${accessToken}`,
    )
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config
    console.log(config?.url)

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      config?.url !== "/auth/refresh-token"
    ) {
      try {
        const data = await refreshToken()
        if (data) {
          useUser.getState().setAuth(data)
          return api(config!)
        }
      } catch (error) {
        toast.error("Session expired, please re-login")
        useUser.getState().clear()
      }
    }
    return Promise.reject(error)
  },
)

import { User, UserAuth } from "types/user"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface UserState {
  auth: UserAuth
  user: User
  setAuth: (auth: UserAuth) => void
  setUser(user: Partial<User>): void
  clear(): void
}

const defaultUserState: { auth: UserAuth; user: User } = {
  auth: { accessToken: "" },
  user: {
    id: -1,
    email: "",
    profile: {
      id: -1,
      avatarUrl: "",
      bannerUrl: "",
      username: "",
      bio: "",
      userId: -1,
    },
    walletBalance: -1,
    cart: {
      id: -1,
      products: [],
      totalPrice: -1,
      userId: -1,
      totalProducts: -1,
    },
  },
}

export const useUser = create<UserState>()(
  persist(
    (set, state) => ({
      ...defaultUserState,
      setAuth: (auth) => set({ auth }),
      setUser: (user) => set({ user: { ...state().user, ...user } }),
      clear: () => set({ ...defaultUserState }),
    }),
    {
      name: "user", // name of the item in the storage (must be unique)
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => ["auth"].includes(key)),
        ),
    },
  ),
)

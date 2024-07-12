import { RouteObject } from "react-router-dom"
import ProfilePage from "./pages/ProfilePage"

export const settingsRoute: RouteObject = {
  path: "",
  children: [
    {
      path: "profile",
      Component: ProfilePage,
    },
  ],
}

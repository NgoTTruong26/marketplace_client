import MainLayout from "components/Layout"
import { navPaths } from "constants/nav"
import { homeRoute } from "modules/home/route"
import { Navigate, useRoutes } from "react-router-dom"

export default function Routes() {
  const element = useRoutes([
    {
      path: "",
      element: <MainLayout />,
      children: [homeRoute],
    },
    {
      path: "*",
      element: <Navigate to={navPaths.home} />,
    },
  ])
  return element
}

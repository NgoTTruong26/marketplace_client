import AuthLayout from "components/Layout/AuthLayout"
import HeaderLayout from "components/Layout/HeaderLayout"
import MainLayout from "components/Layout/home"
import { navPaths } from "constants/nav"
import { collectionRoute } from "modules/collection/route"
import { homeRoute } from "modules/home/route"
import { productRoute } from "modules/product/route"
import { settingsRoute } from "modules/settings/route"
import { lazy } from "react"
import { Navigate, useRoutes } from "react-router-dom"

const SettingLayout = lazy(() => import("components/Layout/setting"))

export default function Routes() {
  const element = useRoutes([
    {
      path: "",
      element: (
        <AuthLayout>
          <MainLayout />
        </AuthLayout>
      ),
      children: [homeRoute, collectionRoute, productRoute],
    },
    {
      path: navPaths.settings,
      element: (
        <AuthLayout>
          <HeaderLayout>
            <SettingLayout />
          </HeaderLayout>
        </AuthLayout>
      ),
      children: [settingsRoute],
    },
    {
      path: "*",
      element: <Navigate to={navPaths.home} />,
    },
  ])
  return element
}

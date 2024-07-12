import AuthLayout from "components/Layout/AuthLayout"
import HeaderLayout from "components/Layout/HeaderLayout"
import MainLayout from "components/Layout/home"
import SettingLayout from "components/Layout/setting"
import { navPaths } from "constants/nav"
import { homeRoute } from "modules/home/route"
import { settingsRoute } from "modules/settings/route"
import { Navigate, useRoutes } from "react-router-dom"

export default function Routes() {
  const element = useRoutes([
    {
      path: "",
      element: (
        <AuthLayout>
          <MainLayout />
        </AuthLayout>
      ),
      children: [homeRoute],
    },
    {
      path: "/settings",
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

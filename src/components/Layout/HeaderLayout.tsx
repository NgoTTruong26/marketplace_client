import { PropsWithChildren } from "react"
import Header from "./home/Header"

export default function HeaderLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {children}
    </div>
  )
}

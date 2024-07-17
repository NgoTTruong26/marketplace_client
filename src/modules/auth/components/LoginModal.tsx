import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import { Button, ModalBody, ModalHeader } from "@nextui-org/react"
import { useGoogleLogin } from "@react-oauth/google"
import Logo from "components/common/Logo"
import { toast } from "sonner"
import { useUser } from "store/user"
import { useGoogleAuth } from "../services/googleLogin"

interface Props {
  onClose: () => void
}

export default function LoginModal({ onClose }: Props) {
  const user = useUser()
  const googleAuth = useGoogleAuth()

  const handleGoogleLogin = useGoogleLogin({
    flow: "auth-code",
    async onSuccess({ code }) {
      // eslint-disable-next-line no-debugger
      // debugger
      const data = await googleAuth.mutateAsync({ code })
      console.log(data)

      user.setAuth({
        accessToken: data.accessToken,
      })
      console.log(data.user)
      user.setUser(data.user)

      onClose()
    },
    onError() {
      toast.error("Can't sign in with Google")
    },
  })

  return (
    <>
      <ModalHeader className="flex flex-col items-center justify-center gap-4">
        <Logo className="h-28 w-28" />
        <h1>Connect to MARKETPLACE</h1>
      </ModalHeader>
      <ModalBody className="items-center justify-center">
        <Button
          size="lg"
          color="secondary"
          variant="flat"
          className="w-full max-w-sm gap-4 bg-secondary-300 font-semibold text-white"
          children="Login with Google"
          startContent={
            <Icon icon="flat-color-icons:google" className="text-4xl" />
          }
          onPress={() => handleGoogleLogin()}
        />
      </ModalBody>
    </>
  )
}

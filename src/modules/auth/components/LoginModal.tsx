import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import { Button, ModalBody, ModalHeader } from "@nextui-org/react"
import Logo from "components/common/Logo"

export default function LoginModal() {
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
        />
      </ModalBody>
    </>
  )
}

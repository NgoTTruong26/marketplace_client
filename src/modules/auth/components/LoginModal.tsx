import { yupResolver } from "@hookform/resolvers/yup"
import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import { Button, Input, ModalBody, ModalHeader } from "@nextui-org/react"
import Logo from "components/common/Logo"
import Field from "components/core/field"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import OtpInput from "react-otp-input"
import * as yup from "yup"
import { GoogleLoginRequest } from "../services/googleLogin"

const formSchema = yup.object({
  email: yup.string().label("Email").required(),
})

export default function LoginModal() {
  const [isShowOTPInput, setIsShowOTPInput] = useState(false)
  const [otp, setOtp] = useState("")

  const methods = useForm<GoogleLoginRequest>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(formSchema),
  })

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => {
          console.log(data)
        })}
      >
        {isShowOTPInput && (
          <Button
            className="absolute left-4 top-4 h-8 min-h-8 w-8 min-w-8 rounded-full"
            variant="light"
            isIconOnly
            children={
              <Icon
                icon="grommet-icons:form-previous-link"
                className="text-3xl text-default-400"
              />
            }
            onPress={() => setIsShowOTPInput(false)}
          />
        )}
        <ModalHeader className="flex flex-col items-center justify-center gap-4">
          <Logo className="h-28 w-28" />
          {!isShowOTPInput ? (
            <h1>Connect to MARKETPLACE</h1>
          ) : (
            <h1>Enter code</h1>
          )}
        </ModalHeader>
        <ModalBody className="items-center justify-center gap-8">
          {!isShowOTPInput ? (
            <Field
              t="input"
              name="email"
              placeholder="Continue with email"
              variant="flat"
              color="default"
              size="lg"
              classNames={{}}
              endContent={
                <Button
                  type="submit"
                  isIconOnly={true}
                  color="secondary"
                  className="h-8 min-h-8 w-8 min-w-8"
                  onPress={() => setIsShowOTPInput(true)}
                >
                  <Icon
                    icon="grommet-icons:form-next-link"
                    className="text-xl"
                  />
                </Button>
              }
            />
          ) : (
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              containerStyle="gap-4"
              inputType="number"
              shouldAutoFocus
              renderInput={(props: any) => (
                <Input
                  size="lg"
                  {...props}
                  variant="bordered"
                  classNames={{
                    inputWrapper: "border-2 focus-within:!border-default-400",
                    innerWrapper: "justify-center",
                    input: "text-2xl",
                  }}
                />
              )}
            />
          )}

          {isShowOTPInput && (
            <div className="cursor-pointer text-secondary">
              Code expired, please request a new code.
            </div>
          )}
        </ModalBody>
      </form>
    </FormProvider>
  )
}

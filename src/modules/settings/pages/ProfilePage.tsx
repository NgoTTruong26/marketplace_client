import { yupResolver } from "@hookform/resolvers/yup"
import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import { Avatar, Button, Input } from "@nextui-org/react"
import { AxiosResponse } from "axios"
import clsx from "clsx"
import LoadingIcon from "components/common/LoadingIcon"
import Field from "components/core/field"
import { accept, maxSize } from "constants/upload"
import useUpload from "hooks/useUpload"
import {
  UpdateProfileRequest,
  useUpdateProfile,
} from "modules/user/services/updateProfile"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useUser } from "store/user"
import * as yup from "yup"

const formSchema = yup.object({
  username: yup.string().optional(),
  avatarUrl: yup.string().optional(),
  bannerUrl: yup.string().optional(),
  bio: yup.string().optional(),
})

export default function ProfilePage() {
  const { user, setUser } = useUser()

  const [avatarUrl, setAvatarUrl] = useState<string>(user.profile.avatarUrl)
  const [bannerUrl, setBannerUrl] = useState<string>(user.profile.bannerUrl)

  const methods = useForm<Partial<Omit<UpdateProfileRequest, "userId">>>({
    defaultValues: {
      username: user.profile.username,
      avatarUrl: user.profile.avatarUrl,
      bannerUrl: user.profile.bannerUrl || "",
      bio: user.profile.bio || "",
    },
    resolver: yupResolver(formSchema),
    mode: "onChange",
  })

  const onSuccessAvatarUrl = (data: AxiosResponse<string>) => {
    setAvatarUrl(data.data)
    methods.setValue("avatarUrl", data.data, {
      shouldDirty: true,
      shouldValidate: true,
    })

    return data.data
  }

  const onSuccessBannerUrl = (data: AxiosResponse<string>) => {
    setBannerUrl(data.data)
    methods.setValue("bannerUrl", data.data, {
      shouldDirty: true,
      shouldValidate: true,
    })

    return data.data
  }

  const {
    getRootProps: getRootPropsAvatarUrl,
    isPending: isPendingUploadAvatarUrl,
  } = useUpload<string>({
    url: "/upload/image",
    accept,
    maxSize,
    onSuccess: onSuccessAvatarUrl,
  })

  const {
    getRootProps: getRootPropsBannerUrl,
    isPending: isPendingUploadBannerUrl,
  } = useUpload<string>({
    url: "/upload/image",
    accept,
    maxSize,
    onSuccess: onSuccessBannerUrl,
  })

  const { mutate, isPending: isPendingUpdate } = useUpdateProfile()

  const onSubmit = (data: UpdateProfileRequest) => {
    toast.loading("Profile updated successfully")

    mutate(data, {
      onSuccess: (data) => {
        setUser({ ...user, profile: data })
        toast.success("Profile updated successfully")
      },
    })
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="ml-12 flex w-full flex-col gap-4">
          <div className="pb-4 pt-8 text-4xl font-semibold">
            Profile details
          </div>
          <div className="flex gap-20">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div className="font-semibold">Username</div>
                <Field
                  t="input"
                  name="username"
                  variant="bordered"
                  size="lg"
                  placeholder="Enter username"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-semibold">Bio</div>
                <Field
                  t="text-area"
                  name="bio"
                  size="lg"
                  variant="bordered"
                  placeholder="Tell the world your story!"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-semibold">Email Address</div>
                <Input
                  isDisabled
                  variant="bordered"
                  size="lg"
                  placeholder="Enter email"
                  value={user.email}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-semibold">Social Connections</div>
                <div className="text-default-500">
                  Help collectors verify your account by connecting social
                  accounts
                </div>
                <div className="flex items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-4">
                    <Icon
                      icon="mdi:twitter"
                      className="text-3xl text-default-400"
                    />
                    <span className="font-semibold">Twitter</span>
                  </div>
                  <Button size="lg" color="secondary">
                    Connect
                  </Button>
                </div>
                <div className="flex items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-4">
                    <Icon
                      icon="mdi:instagram"
                      className="text-3xl text-default-400"
                    />
                    <span className="font-semibold">Instagram</span>
                  </div>
                  <Button size="lg" color="secondary">
                    Connect
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <div className="font-semibold">Profile Image</div>
                <div
                  {...getRootPropsAvatarUrl()}
                  className={clsx(
                    "relative h-40 w-40 overflow-hidden rounded-full",
                    {
                      "border-4 border-dotted border-secondary":
                        isPendingUploadAvatarUrl,
                    },
                  )}
                >
                  {isPendingUploadAvatarUrl ? (
                    <LoadingIcon />
                  ) : (
                    <>
                      <Avatar
                        src={avatarUrl}
                        className="h-full w-full cursor-pointer"
                      />
                      <div className="absolute top-0 flex h-full w-full cursor-pointer items-center justify-center bg-[#1212120a] opacity-0 transition duration-150 hover:opacity-100">
                        <Icon
                          icon="tdesign:edit"
                          className="text-3xl text-white"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="font-semibold">Profile Banner</div>
                <div
                  {...getRootPropsBannerUrl()}
                  className={clsx(
                    "relative h-40 w-40 overflow-hidden rounded-2xl",
                    {
                      "border-4 border-dotted border-secondary":
                        isPendingUploadBannerUrl,
                    },
                  )}
                >
                  {isPendingUploadBannerUrl ? (
                    <LoadingIcon />
                  ) : (
                    <>
                      <Avatar
                        radius="md"
                        src={bannerUrl}
                        className="h-full w-full cursor-pointer"
                      />
                      <div className="absolute top-0 flex h-full w-full cursor-pointer items-center justify-center bg-[#1212120a] opacity-0 transition duration-150 hover:opacity-100">
                        <Icon
                          icon="tdesign:edit"
                          className="text-3xl text-white"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            <Button
              type="submit"
              size="lg"
              color="secondary"
              isLoading={
                isPendingUpdate ||
                isPendingUploadAvatarUrl ||
                isPendingUploadBannerUrl
              }
              isDisabled={
                !methods.formState.isValid || !methods.formState.isDirty
              }
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

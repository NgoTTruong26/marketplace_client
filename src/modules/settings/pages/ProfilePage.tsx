import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import { Avatar, Button, Input, Textarea } from "@nextui-org/react"
import { AxiosResponse } from "axios"
import clsx from "clsx"
import LoadingIcon from "components/common/LoadingIcon"
import { accept, maxSize } from "constants/upload"
import useUpload from "hooks/useUpload"
import { useState } from "react"
import { useUser } from "store/user"

export default function ProfilePage() {
  const { user } = useUser()

  const [avatarUrl, setAvatarUrl] = useState<string>(user.profile.avatarUrl)

  const onSuccess = (data: AxiosResponse<string>) => {
    setAvatarUrl(data.data)
    /* methods.setValue("avatarUrl", data.data, {
      shouldDirty: true,
      shouldValidate: true,
    }) */

    return data.data
  }

  const { getRootProps, isPending: isPendingUpload } = useUpload<string>({
    url: "/upload/image",
    accept,
    maxSize,
    onSuccess,
  })

  return (
    <div className="ml-12 flex w-full flex-col gap-4">
      <div className="pb-4 pt-8 text-4xl font-semibold">Profile details</div>
      <div className="flex gap-20">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="font-semibold">Username</div>
            <Input
              variant="bordered"
              size="lg"
              placeholder="Enter username"
              defaultValue={user.profile.username}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-semibold">Bio</div>
            <Textarea
              size="lg"
              variant="bordered"
              placeholder="Tell the world your story!"
              value={user.profile.bio || ""}
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
              Help collectors verify your account by connecting social accounts
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
              {...getRootProps()}
              className={clsx(
                "relative h-40 w-40 overflow-hidden rounded-full",
                {
                  "border-4 border-dotted border-secondary": isPendingUpload,
                },
              )}
            >
              {isPendingUpload ? (
                <LoadingIcon />
              ) : (
                <>
                  <Avatar
                    src={avatarUrl}
                    className="h-full w-full cursor-pointer"
                  />
                  <div className="absolute top-0 flex h-full w-full cursor-pointer items-center justify-center bg-[#1212120a] opacity-0 transition duration-150 hover:opacity-100">
                    <Icon icon="tdesign:edit" className="text-3xl text-white" />
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="font-semibold">Profile Banner</div>
            <div className="relative overflow-hidden rounded-2xl">
              <Avatar
                radius="md"
                src={user.profile.bannerUrl}
                className="h-40 w-40 cursor-pointer"
              />
              <div className="absolute top-0 flex h-full w-full cursor-pointer items-center justify-center bg-[#1212120a] opacity-0 transition duration-150 hover:opacity-100">
                <Icon icon="tdesign:edit" className="text-3xl text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Button size="lg" color="secondary">
          Save
        </Button>
      </div>
    </div>
  )
}

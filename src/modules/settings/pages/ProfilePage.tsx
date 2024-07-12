import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import { Avatar, Button, Input, Textarea } from "@nextui-org/react"
import { useUser } from "store/user"

export default function ProfilePage() {
  const { user } = useUser()

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
            <div className="relative overflow-hidden rounded-full">
              <Avatar
                src={user.profile.avatarUrl}
                className="h-40 w-40 cursor-pointer"
              />
              <div className="absolute top-0 flex h-full w-full items-center justify-center hover:bg-[#e4e4e766]"></div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="font-semibold">Profile Banner</div>
            <Avatar
              radius="lg"
              src={user.profile.bannerUrl}
              className="h-40 w-40 cursor-pointer"
            />
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

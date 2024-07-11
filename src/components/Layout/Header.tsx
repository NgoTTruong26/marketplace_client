import { Icon } from "@iconify-icon/react"
import {
  Avatar,
  Badge,
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Input,
  Link,
  Modal,
  ModalContent,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  useDisclosure,
} from "@nextui-org/react"
import Logo from "components/common/Logo"
import LoginModal from "modules/auth/components/LoginModal"
import { useUser } from "store/user"

export default function Header() {
  const { user } = useUser()

  console.log(user)

  const disclosureLogin = useDisclosure()

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ]

  return (
    <Navbar
      isBordered
      classNames={{
        wrapper: "max-w-default px-default",
      }}
    >
      <NavbarContent justify="start" className="!flex-grow-0 gap-0">
        {/* <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        /> */}
        <NavbarBrand>
          <Logo />
          <p className="pl-3 font-bold text-inherit">MARKETPLACE</p>
        </NavbarBrand>
        <div className="flex items-center">
          <Divider orientation="vertical" className="mx-4 h-8" />
          <NavbarItem isActive>
            <Link color="foreground" href="#">
              Create
            </Link>
          </NavbarItem>
        </div>
      </NavbarContent>

      <NavbarContent className="hidden flex-1 gap-4 sm:flex" justify="center">
        <NavbarItem className="w-full max-w-xl">
          <Input
            size="lg"
            classNames={{
              base: "w-full",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            startContent={<Icon icon="icon-park-outline:search" />}
            type="search"
          />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="!flex-grow-0">
        <NavbarItem>
          <Button
            size="lg"
            startContent={
              <Icon icon="material-symbols:wallet" className="text-2xl" />
            }
            variant="flat"
            className="font-semibold"
            onPress={disclosureLogin.onOpen}
          >
            Login
          </Button>
          <Modal
            size="lg"
            isDismissable={false}
            isOpen={disclosureLogin.isOpen}
            onClose={disclosureLogin.onClose}
            className="py-8"
            classNames={{
              closeButton: "top-4 right-4 text-xl",
            }}
          >
            <ModalContent>
              {(onClose) => <LoginModal onClose={onClose} />}
            </ModalContent>
          </Modal>
        </NavbarItem>
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button
                isIconOnly
                size="lg"
                startContent={
                  !user.email ? (
                    <Icon icon="mingcute:user-4-line" className="text-3xl" />
                  ) : (
                    <Avatar
                      size="sm"
                      src={user.profile.avatarUrl}
                      name={user.profile.username}
                    />
                  )
                }
                variant="flat"
              />
            </DropdownTrigger>
            <DropdownMenu variant="flat" aria-label="Profile Actions">
              <DropdownSection
                classNames={{
                  group: "[&>li]:py-3 [&>li]:px-3",
                }}
              >
                <DropdownItem
                  key="profile"
                  startContent={
                    <Icon icon="mdi:user-outline" className="text-xl" />
                  }
                >
                  Profile
                </DropdownItem>
                <DropdownItem
                  key="watchlist"
                  startContent={<Icon icon="ph:eye" className="text-xl" />}
                >
                  Watchlist
                </DropdownItem>
                <DropdownItem
                  key="setting"
                  startContent={<Icon icon="uil:setting" className="text-xl" />}
                >
                  Setting
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  startContent={
                    <Icon icon="material-symbols:logout" className="text-xl" />
                  }
                >
                  Logout
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <NavbarItem>
          <Button
            isIconOnly
            size="lg"
            startContent={
              <Badge
                content="5"
                color="primary"
                shape="circle"
                showOutline={false}
              >
                <Icon icon="mdi:cart-outline" className="text-2xl" />
              </Badge>
            }
            variant="flat"
          />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

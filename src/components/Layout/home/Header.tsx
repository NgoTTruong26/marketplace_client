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
  Modal,
  ModalContent,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  useDisclosure,
} from "@nextui-org/react"
import Logo from "components/common/Logo"
import { queryClient } from "configs/queryClient"
import { useCycle } from "framer-motion"
import LoginModal from "modules/auth/components/LoginModal"
import WalletModal from "modules/user/components/WalletModal"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "store/cart"
import { useUser } from "store/user"
import Cart from "../../../modules/cart/components/Cart"

export default function Header() {
  const { user, clear } = useUser()
  const { cart, clear: clearCart } = useCart()

  const navigate = useNavigate()

  const disclosureLogin = useDisclosure()
  const disclosureWallet = useDisclosure()

  const [open, cycleOpen] = useCycle(false, true)

  return (
    <>
      <div className="fixed z-40 w-full">
        <Navbar
          isBordered
          classNames={{
            base: "py-1",
            wrapper: "max-w-default px-default",
          }}
        >
          <NavbarContent justify="start" className="!flex-grow-0 gap-0">
            <NavbarBrand as={Link} to={"/"} className="cursor-pointer">
              <Logo />
              <p className="pl-3 font-bold text-inherit">MARKETPLACE</p>
            </NavbarBrand>
            <div className="flex items-center">
              <Divider orientation="vertical" className="mx-4 h-8" />
              <NavbarItem>
                <Link
                  color="foreground"
                  to="#"
                  onClick={() => {
                    if (!user.email) {
                      return disclosureLogin.onOpen()
                    }
                  }}
                >
                  Create
                </Link>
              </NavbarItem>
            </div>
          </NavbarContent>

          <NavbarContent
            className="hidden flex-1 gap-4 sm:flex"
            justify="center"
          >
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
              {user.email ? (
                <Button
                  size="lg"
                  startContent={
                    <Icon icon="material-symbols:wallet" className="text-2xl" />
                  }
                  variant="flat"
                  className="font-semibold"
                  onPress={disclosureWallet.onOpen}
                >
                  {Math.round(user.walletBalance).toLocaleString("de-DE")} USD
                </Button>
              ) : (
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
              )}
            </NavbarItem>
            <NavbarItem>
              {user.email ? (
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Button
                      isIconOnly
                      size="lg"
                      startContent={
                        <Avatar
                          size="sm"
                          src={user.profile.avatarUrl}
                          name={user.profile.username}
                        />
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
                        startContent={
                          <Icon icon="ph:eye" className="text-xl" />
                        }
                      >
                        Watchlist
                      </DropdownItem>
                      <DropdownItem
                        key="settings"
                        startContent={
                          <Icon icon="uil:setting" className="text-xl" />
                        }
                        onPress={() => navigate("settings")}
                      >
                        Settings
                      </DropdownItem>
                      <DropdownItem
                        key="logout"
                        startContent={
                          <Icon
                            icon="material-symbols:logout"
                            className="text-xl"
                          />
                        }
                        onClick={() => {
                          clear()
                          clearCart()
                          queryClient.clear()
                        }}
                      >
                        Logout
                      </DropdownItem>
                    </DropdownSection>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <Button
                  isIconOnly
                  size="lg"
                  startContent={
                    <Icon icon="mingcute:user-4-line" className="text-3xl" />
                  }
                  variant="flat"
                  onPress={disclosureLogin.onOpen}
                />
              )}
            </NavbarItem>
            <NavbarItem>
              <Button
                isIconOnly
                size="lg"
                startContent={
                  cart.cartProducts.length > 0 ? (
                    <Badge
                      content={cart.cartProducts.length}
                      color="primary"
                      shape="circle"
                      showOutline={false}
                    >
                      <Icon icon="mdi:cart-outline" className="text-2xl" />
                    </Badge>
                  ) : (
                    <Icon icon="mdi:cart-outline" className="text-2xl" />
                  )
                }
                variant="flat"
                onClick={() => {
                  if (!user.email) {
                    return disclosureLogin.onOpen()
                  }
                  cycleOpen()
                  document.body.style.overflow = "hidden"
                }}
              />
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </div>
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

      <Modal
        size="lg"
        isOpen={disclosureWallet.isOpen}
        onClose={disclosureWallet.onClose}
        className="p-4"
      >
        <ModalContent>
          <WalletModal />
        </ModalContent>
      </Modal>

      <Cart open={open} cycleOpen={cycleOpen} />
    </>
  )
}

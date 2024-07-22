import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import { Avatar, Button, Input } from "@nextui-org/react"
import clsx from "clsx"
import { AnimatePresence, Cycle, Variants, motion } from "framer-motion"
import { useState } from "react"
import { useUser } from "store/user"
import { useGetProductListFromCart } from "../services/getProductListFromCart"

interface Props {
  open: boolean
  cycleOpen: Cycle
}

const sideVariants: Variants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
}

export default function Cart({ open, cycleOpen }: Props) {
  const {
    user: { cart, profile },
  } = useUser()

  const getProductListFromCart = useGetProductListFromCart(cart.id)

  const [quantity, setQuantity] = useState<number>(1)

  const totalPrice = () => {
    return (
      getProductListFromCart.data?.reduce((prevs, curr) => {
        if (curr.price) {
          return (prevs += curr.price)
        }
        return prevs
      }, 0) || 0
    )
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ width: 0 }}
          animate={{
            width: 384,
          }}
          exit={{
            width: 0,
            transition: { duration: 0.3 },
          }}
          onClick={() => {
            document.body.style.overflowY = "auto"
            cycleOpen()
          }}
          className={clsx(
            "fixed right-0 top-0 z-40 h-full w-full",
            "before:fixed before:left-0 before:right-0 before:h-full before:bg-[#12121233]",
          )}
        >
          <motion.div
            className="container relative h-full w-full min-w-96 overflow-y-auto bg-white"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sideVariants}
            color="red"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative p-5">
              <div className="text-2xl font-semibold">Your cart</div>
              <Button
                isIconOnly
                variant="light"
                children={
                  <Icon icon="mingcute:close-fill" className="text-xl" />
                }
                className="absolute right-4 top-7 h-fit w-fit min-w-0"
                onClick={() => {
                  document.body.style.overflowY = "auto"
                  cycleOpen()
                }}
              />
            </div>
            <div className="flex flex-col items-center border-y-1 p-5">
              <div className="flex w-full flex-1 flex-col items-center">
                <div className="flex w-full flex-col gap-5">
                  <div className="flex w-full justify-between gap-5">
                    <div className="font-semibold">
                      {cart.totalProducts} item
                    </div>
                    <div className="font-semibold">Clear all</div>
                  </div>
                  <div className="flex flex-col gap-5">
                    {getProductListFromCart.data?.map((product, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-5 text-sm"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar
                            isBordered
                            radius="sm"
                            src={product.imageUrl}
                            className="h-16 w-16 min-w-16"
                          />
                          <div className="flex flex-col">
                            <div className="line-clamp-1 font-semibold capitalize">
                              {product.name}
                            </div>
                            <div className="line-clamp-2 capitalize">
                              {product.collection.name} by {profile.username}
                            </div>
                          </div>
                        </div>
                        <div className="flex min-w-28 flex-col items-center gap-1">
                          <div>{product.price * quantity} USD</div>
                          <Input
                            size="sm"
                            type="number"
                            variant="bordered"
                            color="secondary"
                            value={quantity.toString()}
                            onChange={(e) =>
                              setQuantity(Number(e.target.value))
                            } // Cập nhật state khi giá trị input thay đổi
                            startContent={
                              <Icon
                                icon="ic:round-minus"
                                className="cursor-pointer text-xl"
                                onClick={() =>
                                  setQuantity((prevs) =>
                                    prevs - 1 > 0 ? prevs - 1 : 0,
                                  )
                                }
                              />
                            }
                            endContent={
                              <Icon
                                icon="ic:round-plus"
                                className="cursor-pointer text-xl"
                                onClick={() =>
                                  setQuantity((prevs) => prevs + 1)
                                }
                              />
                            }
                            className="max-w-44"
                            classNames={{
                              input: "text-center",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* <div className="text-default-500">
                  Add items to get started.
                </div> */}
              </div>
            </div>
            <div className="flex justify-between gap-5 p-5">
              <div className="font-semibold">Total price</div>
              <div className="min-w-28 text-center font-semibold">
                {totalPrice()} USD
              </div>
            </div>
            <div className="px-5">
              <Button size="lg" color="secondary" className="w-full">
                Complete purchase
              </Button>
            </div>
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

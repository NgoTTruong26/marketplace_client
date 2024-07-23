import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import { Avatar, Button, Input } from "@nextui-org/react"
import clsx from "clsx"
import { queryClient } from "configs/queryClient"
import { AnimatePresence, Cycle, Variants, motion } from "framer-motion"
import { useEffect } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"
import { useCart } from "store/cart"
import { useUser } from "store/user"
import { CartProducts } from "types/cartProducts"
import { useGetProductListFromCart } from "../services/getProductListFromCart"
import { useRemoveProductFromCart } from "../services/removeProductFromCart"

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
  const { user } = useUser()

  const { setCart, cart } = useCart()

  const getProductListFromCart = useGetProductListFromCart(user.cart.id)
  const removeProductFromCart = useRemoveProductFromCart()

  const methods = useForm({
    defaultValues: {
      products: [] as CartProducts[],
    },
  })

  const { fields } = useFieldArray({
    control: methods.control,
    name: "products",
  })

  const onSubmit = (data: any) => {
    console.log(data)
  }

  const increaseQuantity = (index: number, currentQuantity: number) => {
    methods.setValue(`products.${index}.quantity`, Number(currentQuantity) + 1)
  }

  const decreaseQuantity = (index: number, currentQuantity: number) => {
    if (Number(currentQuantity) < 2) {
      return methods.setValue(`products.${index}.quantity`, 1)
    }
    methods.setValue(`products.${index}.quantity`, Number(currentQuantity) - 1)
  }

  const totalPrice = () => {
    return (
      getProductListFromCart.data?.reduce((prevs, curr, idx) => {
        if (curr.product.price) {
          return (prevs +=
            curr.product.price * methods.watch(`products.${idx}.quantity`))
        }
        return prevs
      }, 0) || 0
    )
  }

  const handleQuantityChange = (index: number, value: string) => {
    const newQuantity = Number(value)
    if (newQuantity < 1) {
      methods.setValue(`products.${index}.quantity`, 1)
    } else {
      methods.setValue(`products.${index}.quantity`, newQuantity)
    }
  }

  const handleRemoveProductFromCart = (productId: number, cartId: number) => {
    removeProductFromCart.mutate(
      {
        cartId,
        productId,
      },
      {
        onSuccess: () => {
          queryClient
            .refetchQueries({
              queryKey: ["getProductListFromCart"],
            })
            .then(() => {
              toast.success("Delete product from cart successfully")
            })
        },
      },
    )
  }

  useEffect(() => {
    if (getProductListFromCart.data) {
      methods.reset({ products: getProductListFromCart.data })
      setCart({
        cartProducts: getProductListFromCart.data,
      })
    }
  }, [getProductListFromCart.data])

  console.log(cart, "cart")

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
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
              className="container relative flex h-full max-h-screen w-full min-w-96 flex-col overflow-hidden bg-white"
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
              <div className="flex max-h-[80vh] flex-col items-center border-y-1 p-5 pr-2">
                <div className="flex h-full w-full flex-1 flex-col items-center">
                  <div className="flex h-full w-full flex-col gap-5">
                    <div className="flex w-full justify-between gap-5">
                      <div className="font-semibold">{fields.length} item</div>
                      <div className="cursor-pointer font-semibold">
                        Clear all
                      </div>
                    </div>
                    <div className="flex h-full flex-col gap-5 overflow-y-auto pr-2 pt-2">
                      {fields.map((cartProduct, idx) => (
                        <div
                          key={idx}
                          className="relative flex items-center gap-5 text-sm"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar
                              isBordered
                              radius="sm"
                              src={cartProduct.product.imageUrl}
                              className="h-16 w-16 min-w-16"
                            />
                            <div className="flex flex-col">
                              <div className="line-clamp-1 font-semibold capitalize">
                                {cartProduct.product.name}
                              </div>
                              <div className="line-clamp-2 capitalize">
                                {cartProduct.product.collection.name} by{" "}
                                {user.profile.username}
                              </div>
                            </div>
                          </div>
                          <div className="flex min-w-28 flex-col items-center gap-1">
                            <div>
                              {(
                                cartProduct.product.price *
                                methods.watch(`products.${idx}.quantity`)
                              ).toLocaleString("de-DE")}{" "}
                              USD
                            </div>
                            <Controller
                              control={methods.control}
                              name={`products.${idx}.quantity`}
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  size="sm"
                                  type="number"
                                  variant="bordered"
                                  color="secondary"
                                  defaultValue={cartProduct.quantity.toString()}
                                  value={field.value.toString()}
                                  onChange={(e) =>
                                    handleQuantityChange(idx, e.target.value)
                                  }
                                  className="max-w-44"
                                  classNames={{
                                    input: "text-center",
                                  }}
                                  startContent={
                                    <button className="flex items-center">
                                      <Icon
                                        icon="ic:round-minus"
                                        className="cursor-pointer text-xl"
                                        onClick={() =>
                                          decreaseQuantity(idx, field.value)
                                        }
                                      />
                                    </button>
                                  }
                                  endContent={
                                    <button className="flex items-center">
                                      <Icon
                                        icon="ic:round-plus"
                                        className="cursor-pointer text-xl"
                                        onClick={() =>
                                          increaseQuantity(idx, field.value)
                                        }
                                      />
                                    </button>
                                  }
                                />
                              )}
                            />

                            <button
                              onClick={() =>
                                handleRemoveProductFromCart(
                                  cartProduct.productId,
                                  cartProduct.cartId,
                                )
                              }
                              className="absolute -top-2 right-0 z-10"
                            >
                              <Icon
                                icon="mingcute:close-fill"
                                className="text-primary"
                              />
                            </button>
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
                  {totalPrice().toLocaleString("de-DE")} USD
                </div>
              </div>
              <div className="px-5 pb-10">
                <Button
                  type="submit"
                  size="lg"
                  color="secondary"
                  className="w-full"
                >
                  Complete purchase
                </Button>
              </div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </form>
  )
}

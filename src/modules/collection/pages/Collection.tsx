import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import {
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Input,
  Modal,
  ModalContent,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react"
import clsx from "clsx"
import { queryClient } from "configs/queryClient"
import debounce from "lodash.debounce"
import LoginModal from "modules/auth/components/LoginModal"
import { useAddProductToCart } from "modules/cart/services/addProductToCart"
import { useRemoveProductFromCart } from "modules/cart/services/removeProductFromCart"
import { useGetProductList } from "modules/product/services/getProductList"
import { useEffect, useMemo, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import { useCart } from "store/cart"
import { useUser } from "store/user"
import { CollectionParams } from "../route"
import { useGetCollection } from "../services/getCollection"

export const sortOptions: { key: "asc" | "desc"; label: string }[] = [
  { key: "asc", label: "Price Low To High" },
  { key: "desc", label: "Price High To Low" },
]

export default function Collection() {
  const { user } = useUser()

  const { cart } = useCart()

  const { collectionId } = useParams<keyof CollectionParams>()

  if (!collectionId || !Number(collectionId)) {
    return <Navigate to="/" />
  }

  const navigate = useNavigate()
  const { ref, inView } = useInView()

  const [searchCharacters, setSearchCharacters] = useState<string>()
  const [isFilterOwner, setIsFilterOwner] = useState<boolean>(false)
  const [sortedBy, setSortedBy] = useState<"asc" | "desc">()
  const [minPrice, setMinPrice] = useState<number>()
  const [maxPrice, setMaxPrice] = useState<number>()
  const [filterByPrice, setFilterByPrice] = useState<{
    minPrice?: number
    maxPrice?: number
  }>()

  const getCollection = useGetCollection(
    Number(collectionId),
    !!Number(collectionId),
  )

  console.log(filterByPrice, "filterByPrice")

  const getProductList = useGetProductList(
    {
      collectionId: Number(collectionId),
      keyword: searchCharacters,
      userId: isFilterOwner ? user.id : undefined,
      sortedBy: sortedBy,
      maxPrice: filterByPrice?.maxPrice,
      minPrice: filterByPrice?.minPrice,
    },
    !!Number(collectionId),
  )

  const debouncedSearch = useRef(
    debounce((value: string) => {
      setSearchCharacters(value)
    }, 500),
  ).current

  const addProductToCart = useAddProductToCart()
  const removeProductFromCart = useRemoveProductFromCart()

  const disclosureLogin = useDisclosure()

  const handleAddProductToCart = (cartId: number, productId: number) => {
    addProductToCart.mutate(
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
              toast.success("Product added successfully!")
            })
        },
      },
    )
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

  const isRemoveProductFromCart = useMemo(
    () => (productId: number) => {
      if (cart.cartProducts.length > 0) {
        return cart.cartProducts.some((productCart) => {
          return productCart.productId === productId
        })
      }
      return false
    },
    [cart],
  )

  useEffect(() => {
    debouncedSearch.cancel()
  }, [debouncedSearch])

  useEffect(() => {
    if (inView) {
      getProductList.fetchNextPage()
    }
  }, [getProductList.fetchNextPage, inView])

  return (
    <>
      <div className="flex justify-center">
        <div className="flex w-full max-w-default flex-col gap-5">
          <div className="relative max-h-[600px]">
            <Image
              radius="none"
              alt="NextUI Fruit Image with Zoom"
              src={getCollection.data?.bannerUrl}
              className="object-fit h-full w-full"
              classNames={{
                wrapper: clsx(
                  "h-full w-full !max-w-full ",
                  "before:absolute before:w-full before:h-full before:bg-[#00000033] before:z-20",
                ),
              }}
            />
            <div className="absolute bottom-5 z-20 flex w-full items-end justify-between gap-10 px-16 text-white">
              <div className="flex flex-col gap-5">
                <Avatar
                  isBordered
                  size="lg"
                  radius="lg"
                  src={getCollection.data?.imageUrl}
                />
                <div className="flex flex-col">
                  <div className="text-2xl font-semibold capitalize">{`${getCollection.data?.name} by ${getCollection.data?.profile.username}`}</div>
                  <div className="flex items-center">
                    <div>{`Items ${getCollection.data?.totalProducts}`}</div>
                    <Icon icon="mdi:dot" className="text-4xl" />
                    <div>
                      <span>Created </span>
                      <b>
                        {new Date(
                          getCollection.data?.createdAt || "",
                        ).toLocaleDateString("en-US", {
                          month: "short", // "short" cho tên tháng viết tắt, ví dụ: "Jul"
                          year: "numeric", // "numeric" cho năm đầy đủ, ví dụ: "2023"
                        })}
                      </b>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-10">
                <div>
                  <div className="text-xl font-semibold">
                    {getCollection.data?.totalVolume} USD
                  </div>
                  <div>Total volume</div>
                </div>
                <div>
                  <div className="text-xl font-semibold">
                    {getCollection.data?.floorPrice} USD
                  </div>
                  <div>Floor price</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col pb-20">
            <Accordion variant="splitted" className="px-default">
              <AccordionItem aria-label="Description" title="Description">
                {getCollection.data?.description}
              </AccordionItem>
            </Accordion>
            <div className="relative flex w-full flex-col gap-5 pt-5">
              <div className="px-default">
                <Divider />
              </div>
              <div className="sticky top-16 z-20 flex w-full items-center gap-5 bg-background/70 px-default py-3 pt-5 backdrop-blur-xl">
                <div>{getCollection.data?.totalProducts} results</div>
                <div className="flex h-full w-full flex-1 gap-5">
                  <Input
                    size="lg"
                    variant="bordered"
                    color="secondary"
                    placeholder="Type to search..."
                    startContent={<Icon icon="icon-park-outline:search" />}
                    className="h-full flex-1"
                    classNames={{
                      inputWrapper: "h-full",
                    }}
                    onValueChange={debouncedSearch}
                  />

                  <Select
                    variant="bordered"
                    label="Sort"
                    className="max-w-[200px]"
                    onChange={(e) => {
                      setSortedBy(e.target.value as "asc" | "desc")
                    }}
                  >
                    {sortOptions.map((option) => (
                      <SelectItem key={option.key}>{option.label}</SelectItem>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="flex justify-between gap-10 px-default">
                <div className="relative h-full w-full max-w-80">
                  <Accordion
                    className="sticky top-40"
                    selectionMode="multiple"
                    defaultExpandedKeys={["owner", "price"]}
                  >
                    <AccordionItem
                      key="owner"
                      classNames={{
                        heading: "font-semibold",
                      }}
                      aria-label="Owner"
                      title="Owner"
                      className="pb-2"
                    >
                      <RadioGroup
                        color="secondary"
                        size="lg"
                        classNames={{
                          wrapper: "gap-5",
                        }}
                        onValueChange={(value) => {
                          setIsFilterOwner(value === "owner")
                        }}
                        defaultValue="all"
                      >
                        <Radio value="all" className="max-w-full">
                          All
                        </Radio>
                        <Radio value="owner" className="max-w-full">
                          Me
                        </Radio>
                      </RadioGroup>
                    </AccordionItem>
                    <AccordionItem
                      key="price"
                      aria-label="Price"
                      title="Price"
                      classNames={{
                        heading: "font-semibold",
                      }}
                    >
                      <div className="flex flex-col gap-2">
                        <Select
                          variant="bordered"
                          label="Select an Currencies"
                          defaultSelectedKeys={["USD"]}
                        >
                          <SelectItem key="USD">USD</SelectItem>
                        </Select>
                        <div className="flex items-center">
                          <Input
                            type="number"
                            variant="bordered"
                            size="lg"
                            onValueChange={(value) => {
                              setMinPrice(Number(value) || undefined)
                            }}
                          />
                          <b className="px-5">to</b>
                          <Input
                            type="number"
                            variant="bordered"
                            size="lg"
                            onValueChange={(value) => {
                              setMaxPrice(Number(value) || undefined)
                            }}
                          />
                        </div>
                        <Button
                          color="secondary"
                          onClick={() => {
                            setFilterByPrice({
                              maxPrice,
                              minPrice,
                            })
                          }}
                        >
                          Apply
                        </Button>
                      </div>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div className="flex-1">
                  {getProductList.data &&
                    getProductList.data?.pages.map((page, idx) => (
                      <div key={idx} className="grid grid-cols-5 gap-5">
                        {page.data?.map((product, index) => (
                          <Card
                            as="div"
                            shadow="sm"
                            key={index}
                            isPressable
                            className="hover:-translate-y-1 hover:shadow-xl [&:hover>div>#buy]:translate-y-0"
                            onClick={() => navigate(`/product/${product.id}`)}
                          >
                            <CardBody className="overflow-visible p-0">
                              <Image
                                shadow="sm"
                                radius="lg"
                                width="100%"
                                alt={product.name}
                                className="h-48 w-full object-cover"
                                src={product.imageUrl}
                              />
                            </CardBody>
                            <CardFooter className="flex flex-col items-start px-0 pb-0 pt-3">
                              <div className="line-clamp-1 px-3 text-start font-semibold capitalize">
                                {product.name}
                              </div>
                              <div className="flex w-full items-start gap-2 px-3">
                                <div className="text-default-500">Price:</div>
                                <div className="font-semibold">{`${product.price} USD`}</div>
                              </div>
                              <div
                                id="buy"
                                className="flex w-full translate-y-full pt-2 transition-all"
                              >
                                <Button
                                  color="secondary"
                                  radius="none"
                                  className="flex-1 border-r-1"
                                  onClick={() => {
                                    if (!user.email) {
                                      return disclosureLogin.onOpen()
                                    }
                                  }}
                                >
                                  Buy now
                                </Button>
                                <Button
                                  color="secondary"
                                  isIconOnly
                                  radius="none"
                                  className="px-2"
                                  children={
                                    isRemoveProductFromCart(product.id) ? (
                                      <Icon
                                        icon="mdi:cart-off"
                                        className="text-2xl"
                                      />
                                    ) : (
                                      <Icon
                                        icon="mdi:cart-outline"
                                        className="text-2xl"
                                      />
                                    )
                                  }
                                  onClick={() => {
                                    if (!user.email) {
                                      return disclosureLogin.onOpen()
                                    }
                                    isRemoveProductFromCart(product.id)
                                      ? handleRemoveProductFromCart(
                                          product.id,
                                          user.cart.id,
                                        )
                                      : handleAddProductToCart(
                                          user.cart.id,
                                          product.id,
                                        )
                                  }}
                                />
                              </div>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    ))}

                  {getProductList.hasNextPage && <div ref={ref}></div>}
                </div>
              </div>
            </div>
          </div>
        </div>
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
    </>
  )
}

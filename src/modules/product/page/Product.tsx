import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import {
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Input,
} from "@nextui-org/react"
import { useRef, useState } from "react"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"
import { ProductParams } from "../route"
import { useGetProduct } from "../services/getProduct"

export default function Product() {
  const { productId } = useParams<keyof ProductParams>()

  if (!productId || !Number(productId)) {
    return <Navigate to="/" />
  }
  const [quantity, setQuantity] = useState<number>(1)

  const swiperRefProducts = useRef<SwiperRef>(null)
  const nextButtonRefProducts = useRef(null)
  const prevButtonRefProducts = useRef(null)

  const navigate = useNavigate()

  const getProduct = useGetProduct(Number(productId))

  return (
    <div className="flex justify-center pt-24">
      <div className="flex w-full max-w-default flex-col gap-5 px-default">
        <div className="flex w-full gap-10">
          <div className="flex h-full w-full max-w-3xl flex-col gap-5">
            <Avatar
              isBordered
              radius="lg"
              src={getProduct.data?.imageUrl}
              className="h-[70vw] max-h-[768px] w-full max-w-3xl"
            />
            <Accordion
              defaultExpandedKeys={["description"]}
              variant="splitted"
              className="px-0"
            >
              <AccordionItem key="description" title="Description">
                <div>
                  By{" "}
                  <b className="capitalize">
                    {getProduct.data?.collection.profile.username}
                  </b>
                </div>
                {getProduct.data?.description}
              </AccordionItem>
            </Accordion>
          </div>
          <div className="relative w-full">
            <div className="sticky top-20 flex w-full max-w-3xl flex-col gap-5 rounded-2xl pt-2">
              <Link
                to={`/collection/${getProduct.data?.collectionId}`}
                className="capitalize text-secondary-700"
              >
                {getProduct.data?.collection.name} by{" "}
                {getProduct.data?.collection.profile.username}
              </Link>
              <div className="flex flex-col gap-1">
                <div className="text-3xl font-semibold capitalize">
                  {getProduct.data?.name}
                </div>
                <div>
                  Owner by <span className="text-secondary-700">A</span>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex items-center gap-2">
                  <Icon icon="cil:view-module" className="text-2xl" />
                  <div>{getProduct.data?.quantity} items</div>
                </div>
                <div className="flex items-center gap-2">
                  <Icon
                    icon="material-symbols:category-outline"
                    className="text-2xl"
                  />
                  <div>{getProduct.data?.collection.category.name}</div>
                </div>
              </div>
              <div className="flex w-full flex-col items-center justify-center gap-5 rounded-2xl border-1 p-5">
                <div className="flex w-full items-center justify-between gap-5">
                  <div className="w-full">
                    <span className="text-default-600">Price</span>
                    <div className="text-3xl font-semibold">
                      {(getProduct.data?.price || 0) * quantity} USD
                    </div>
                  </div>
                  <div className="flex">
                    <Input
                      size="lg"
                      type="number"
                      variant="bordered"
                      value={quantity.toString()}
                      onChange={(e) => setQuantity(Number(e.target.value))} // Cập nhật state khi giá trị input thay đổi
                      startContent={
                        <button className="flex items-center">
                          <Icon
                            icon="ic:round-minus"
                            className="cursor-pointer text-xl"
                            onClick={() =>
                              setQuantity((prevs) =>
                                prevs - 1 > 0 ? prevs - 1 : 0,
                              )
                            }
                          />
                        </button>
                      }
                      endContent={
                        <button className="flex items-center">
                          <Icon
                            icon="ic:round-plus"
                            className="cursor-pointer text-xl"
                            onClick={() => setQuantity((prevs) => prevs + 1)}
                          />
                        </button>
                      }
                      className="max-w-52"
                      classNames={{
                        input: "text-center",
                      }}
                    />
                  </div>
                </div>
                <div className="flex w-full overflow-hidden">
                  <Button
                    size="lg"
                    color="secondary"
                    radius="none"
                    className="w-full rounded-l-xl border-r-1 font-semibold"
                  >
                    Buy now
                  </Button>
                  <Button
                    size="lg"
                    color="secondary"
                    radius="none"
                    className="rounded-r-xl"
                    children={
                      <Icon icon="mdi:cart-outline" className="text-2xl" />
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -left-2 top-0 flex h-full -translate-x-full items-center opacity-0 transition-all hover:opacity-100">
            <Button
              ref={prevButtonRefProducts}
              isIconOnly
              onClick={() => swiperRefProducts.current?.swiper.slidePrev()}
              children={
                <Icon icon="ooui:next-rtl" className="text-3xl text-white" />
              }
              className="h-40 bg-[#12121233]"
            />
          </div>
          <Swiper
            ref={swiperRefProducts}
            slidesPerView={5}
            spaceBetween={30}
            className="mySwiper px-2 py-8"
          >
            {getProduct.data?.productList.map((product, idx) => (
              <SwiperSlide key={idx}>
                <Card
                  as="div"
                  shadow="sm"
                  key={idx}
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
                      >
                        Buy now
                      </Button>
                      <Button
                        color="secondary"
                        isIconOnly
                        radius="none"
                        children={
                          <Icon icon="mdi:cart-outline" className="text-2xl" />
                        }
                        className="px-2"
                      />
                    </div>
                  </CardFooter>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute -right-2 top-0 flex h-full translate-x-full items-center opacity-0 transition-all hover:opacity-100">
            <Button
              ref={nextButtonRefProducts}
              isIconOnly
              onClick={() => {
                swiperRefProducts.current?.swiper.slideNext()
              }}
              children={
                <Icon icon="ooui:next-ltr" className="text-3xl text-white" />
              }
              className="h-40 bg-[#12121233]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

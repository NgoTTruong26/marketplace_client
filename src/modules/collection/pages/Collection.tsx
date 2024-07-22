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
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from "@nextui-org/react"
import clsx from "clsx"
import { useGetProductList } from "modules/product/services/getProductList"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { CollectionParams } from "../route"
import { useGetCollection } from "../services/getCollection"

export const sortOptions = [
  { key: "price-low-to-high", label: "Price Low To High" },
  { key: "price-high-to-low", label: "Price High To Low" },
]

export default function Collection() {
  const { collectionId } = useParams<keyof CollectionParams>()

  const navigate = useNavigate()

  if (!collectionId || !Number(collectionId)) {
    return <Navigate to="/" />
  }

  const getCollection = useGetCollection(Number(collectionId))
  const getProductList = useGetProductList(Number(collectionId))

  console.log(getProductList.data)

  return (
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
                  <div>{`Items ${getCollection.data?.totalVolume}`}</div>
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
              <div>100 results</div>
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
                />

                <Select
                  variant="bordered"
                  label="Sort"
                  className="max-w-[200px]"
                >
                  {sortOptions.map((option) => (
                    <SelectItem key={option.key}>{option.label}</SelectItem>
                  ))}
                </Select>
              </div>
            </div>
            <div className="flex justify-between gap-10 px-default">
              <div className="relative h-full w-full max-w-80">
                <Accordion className="sticky top-40" selectionMode="multiple">
                  <AccordionItem
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
                        <Input variant="bordered" size="lg" />
                        <b className="px-5">to</b>
                        <Input variant="bordered" size="lg" />
                      </div>
                      <Button color="secondary">Apply</Button>
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
                              >
                                Buy now
                              </Button>
                              <Button
                                color="secondary"
                                isIconOnly
                                radius="none"
                                children={
                                  <Icon
                                    icon="mdi:cart-outline"
                                    className="text-2xl"
                                  />
                                }
                                className="px-2"
                              />
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

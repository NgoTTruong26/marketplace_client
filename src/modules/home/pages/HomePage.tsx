import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Tab,
  Tabs,
} from "@nextui-org/react"
import clsx from "clsx"
import useGetCategories from "modules/category/services/getCategories"
import { useGetCollectionList } from "modules/collection/services/getCollectionList"
import useGetTopCollections from "modules/collection/services/getTopCollections"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Autoplay, Navigation } from "swiper/modules"
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"
import LoadingCollectionList from "../components/LoadingCollectionList"

export default function HomePage() {
  const getCategories = useGetCategories()
  const getTopCollections = useGetTopCollections()
  const getTop10Collections = useGetTopCollections(10)
  const getCollectionList = useGetCollectionList()

  const navigate = useNavigate()

  const swiperRef = useRef<SwiperRef>(null)
  const nextButtonRef = useRef(null)
  const prevButtonRef = useRef(null)

  const swiperRefCollectionList = useRef<SwiperRef>(null)
  const nextButtonRefCollectionList = useRef(null)
  const prevButtonRefCollectionList = useRef(null)

  const swiperRefCategories = useRef<SwiperRef>(null)
  const nextButtonRefCategories = useRef(null)
  const prevButtonRefCategories = useRef(null)

  const handleSlideChange = () => {
    if (
      swiperRefCollectionList.current &&
      swiperRefCollectionList.current?.swiper.realIndex ===
        swiperRefCollectionList.current?.swiper.slides.length - 1
    ) {
      getCollectionList.fetchNextPage()
    }
  }

  return (
    <div className="mb-10 flex justify-center">
      <div className="flex w-full max-w-default flex-col gap-5">
        <div
          className="flex h-full w-full flex-col gap-8 px-default py-5 pt-28"
          style={{
            background:
              "linear-gradient(0deg, rgb(255, 255, 255) 5%, rgba(0, 0, 0, 0) 60%), rgba(0, 0, 0, 0.5)",
          }}
        >
          <Tabs
            size="lg"
            variant="light"
            classNames={{
              cursor: "bg-[#ffffff1f]",
              tabContent: "!text-white",
            }}
          >
            <Tab title="all" className="capitalize" />
            {getCategories.data?.map((category) => (
              <Tab
                key={category.name}
                title={category.name}
                className="capitalize"
              />
            ))}
          </Tabs>
          <div className="relative">
            <div className="absolute -left-2 top-0 flex h-full -translate-x-full items-center opacity-0 transition-all hover:opacity-100">
              <Button
                size="lg"
                isIconOnly
                ref={prevButtonRef}
                onClick={() => swiperRef.current?.swiper.slidePrev()}
                children={
                  <Icon icon="ooui:next-rtl" className="text-3xl text-white" />
                }
                className="h-40 bg-[#12121233]"
              />
            </div>
            <Swiper
              ref={swiperRef}
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Navigation, Autoplay]}
              slideNextClass="!text-white"
              className="mySwiper h-[400px] rounded-3xl"
            >
              {getTopCollections.data?.map((collection, idx) => (
                <SwiperSlide key={idx}>
                  <Image
                    radius="none"
                    isZoomed
                    alt="NextUI Fruit Image with Zoom"
                    src={collection.bannerUrl}
                    className="h-full w-full object-cover"
                    classNames={{
                      zoomedWrapper: clsx(
                        "h-full [&>img]:hover:scale-105",
                        "before:absolute before:w-full before:h-full before:bg-[#00000033] before:z-20",
                      ),
                      wrapper: "h-full w-full !max-w-full",
                      img: "hover:scale-105 object-cover",
                    }}
                  />
                  <div className="absolute bottom-5 left-5 z-20 flex flex-col gap-5 text-white">
                    <Avatar
                      isBordered
                      size="lg"
                      radius="lg"
                      src={collection.imageUrl}
                    />
                    <div className="flex flex-col">
                      <div className="text-2xl font-semibold capitalize">{`${collection.name} by ${collection.profile.username}`}</div>
                      <div className="flex items-center">
                        <div>{`${collection.totalVolume} items`}</div>
                        <Icon icon="mdi:dot" className="text-4xl" />
                        <div>{`${collection.floorPrice} USD`}</div>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="lg"
                    className="absolute bottom-5 right-5 z-20 bg-transparent py-8 font-semibold text-white backdrop-blur-xl"
                    onClick={() => navigate(`/collection/${collection.id}`)}
                  >
                    View collection
                  </Button>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="absolute -right-2 top-0 flex h-full translate-x-full items-center opacity-0 transition-all hover:opacity-100">
              <Button
                isIconOnly
                ref={nextButtonRef}
                onClick={() => swiperRef.current?.swiper.slideNext()}
                children={
                  <Icon icon="ooui:next-ltr" className="text-3xl text-white" />
                }
                className="h-40 bg-[#12121233]"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 px-default">
          <div className="flex flex-col gap-6">
            <Tabs color="secondary" size="lg" variant="bordered">
              <Tab title="Floor Price" className="capitalize" />
              <Tab title="Volume" className="capitalize" />
            </Tabs>
            <div className="flex gap-20">
              <div className="grid flex-1 grid-cols-12 gap-4">
                <div className="col-span-full grid grid-cols-subgrid border-b-2 px-2">
                  <div>Rank</div>
                  <div className="col-span-6">Collection</div>
                  <div className="col-span-2 col-start-9 text-end">
                    Floor Price
                  </div>
                  <div className="col-span-2 text-end">Volume</div>
                </div>

                {getTop10Collections.data
                  ?.slice(0, Math.ceil(getTop10Collections.data.length / 2))
                  .map((collection, idx) => (
                    <div
                      key={idx}
                      className={clsx(
                        "col-span-full grid cursor-pointer grid-cols-subgrid items-center px-2 py-3",
                        "hover:rounded-xl hover:bg-default-100",
                      )}
                      onClick={() => navigate(`/collection/${collection.id}`)}
                    >
                      <div className="text-center">{idx + 1}</div>
                      <div className="col-span-6 flex items-center gap-5">
                        <Avatar
                          isBordered
                          size="lg"
                          radius="lg"
                          src={collection.imageUrl}
                        />
                        <div className="font-semibold capitalize">
                          {collection.name}
                        </div>
                      </div>
                      <div className="col-span-2 col-start-9 text-end font-semibold">{`${collection.floorPrice} USD`}</div>
                      <div className="col-span-2 text-end font-semibold">{`${collection.totalVolume} USD`}</div>
                    </div>
                  ))}
              </div>
              <div className="grid flex-1 grid-cols-12 gap-4">
                <div className="col-span-full grid grid-cols-subgrid border-b-2 px-2">
                  <div>Rank</div>
                  <div className="col-span-6">Collection</div>
                  <div className="col-span-2 col-start-9 text-end">
                    Floor Price
                  </div>
                  <div className="col-span-2 text-end">Volume</div>
                </div>
                {getTop10Collections.data
                  ?.slice(
                    Math.ceil(getTop10Collections.data.length / 2),
                    getTop10Collections.data.length,
                  )
                  .map((collection, idx) => (
                    <div
                      key={idx}
                      className={clsx(
                        "col-span-full grid cursor-pointer grid-cols-subgrid items-center px-2 py-3",
                        "hover:rounded-xl hover:bg-default-100",
                      )}
                      onClick={() => navigate(`/collection/${collection.id}`)}
                    >
                      <div className="text-center">
                        {idx +
                          Math.ceil(getTop10Collections.data.length / 2) +
                          1}
                      </div>
                      <div className="col-span-6 flex items-center gap-5">
                        <Avatar
                          isBordered
                          size="lg"
                          radius="lg"
                          src={collection.imageUrl}
                        />
                        <div className="font-semibold capitalize">
                          {collection.name}
                        </div>
                      </div>
                      <div className="col-span-2 col-start-9 text-end font-semibold">{`${collection.floorPrice} USD`}</div>
                      <div className="col-span-2 text-end font-semibold">{`${collection.totalVolume} USD`}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-2xl font-semibold">Categories</div>
            <div className="relative">
              <div className="absolute -left-2 top-0 flex h-full -translate-x-full items-center opacity-0 transition-all hover:opacity-100">
                <Button
                  ref={prevButtonRefCollectionList}
                  isIconOnly
                  onClick={() =>
                    swiperRefCollectionList.current?.swiper.slidePrev()
                  }
                  children={
                    <Icon
                      icon="ooui:next-rtl"
                      className="text-3xl text-white"
                    />
                  }
                  className="h-40 bg-[#12121233]"
                />
              </div>
              <Swiper
                onSlideChange={handleSlideChange}
                ref={swiperRefCollectionList}
                slidesPerView={1}
                spaceBetween={30}
                navigation={{
                  nextEl: nextButtonRef.current,
                }}
                modules={[Navigation]}
                slideNextClass="!text-white"
                className="mySwiper px-2 py-8"
                lazyPreloadPrevNext={2}
              >
                {getCollectionList.data?.pages.map((page, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="grid grid-cols-6 gap-5">
                      {page.data.map((collection, index) => (
                        <Card
                          shadow="sm"
                          key={index}
                          isPressable
                          className="hover:-translate-y-1 hover:shadow-xl"
                          onClick={() =>
                            navigate(`/collection/${collection.id}`)
                          }
                        >
                          <CardBody className="overflow-visible p-0">
                            <Image
                              shadow="sm"
                              radius="lg"
                              width="100%"
                              alt={collection.name}
                              className="h-48 w-full object-cover"
                              src={collection.imageUrl}
                            />
                          </CardBody>
                          <CardFooter className="flex flex-col items-start gap-4 p-5 pt-3">
                            <div className="line-clamp-1 text-start font-semibold capitalize">
                              {collection.name}
                            </div>
                            <div className="flex w-full items-start justify-between">
                              <div className="flex flex-col items-start">
                                <div className="text-default-500">Floor</div>
                                <div className="font-semibold">{`${collection.floorPrice} USD`}</div>
                              </div>
                              <div className="flex flex-col items-start">
                                <div className="text-default-500">
                                  Total volume
                                </div>
                                <div className="font-semibold">{`${collection.totalVolume} USD`}</div>
                              </div>
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </SwiperSlide>
                ))}
                {getCollectionList.hasNextPage && (
                  <SwiperSlide>
                    <LoadingCollectionList />
                  </SwiperSlide>
                )}
              </Swiper>
              <div className="absolute -right-2 top-0 flex h-full translate-x-full items-center opacity-0 transition-all hover:opacity-100">
                <Button
                  ref={nextButtonRefCollectionList}
                  isIconOnly
                  onClick={() => {
                    swiperRefCollectionList.current?.swiper.slideNext()
                  }}
                  children={
                    <Icon
                      icon="ooui:next-ltr"
                      className="text-3xl text-white"
                    />
                  }
                  className="h-40 bg-[#12121233]"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-2xl font-semibold">Explore Categories</div>
            <div className="relative">
              <div className="absolute -left-2 top-0 flex h-full -translate-x-full items-center opacity-0 transition-all hover:opacity-100">
                <Button
                  ref={prevButtonRefCategories}
                  isIconOnly
                  onClick={() =>
                    swiperRefCategories.current?.swiper.slidePrev()
                  }
                  children={
                    <Icon
                      icon="ooui:next-rtl"
                      className="text-3xl text-white"
                    />
                  }
                  className="h-40 bg-[#12121233]"
                />
              </div>
              <Swiper
                ref={swiperRefCategories}
                slidesPerView={5}
                spaceBetween={30}
                className="mySwiper px-2 py-8"
              >
                {getCategories.data?.map((category, idx) => (
                  <SwiperSlide key={idx}>
                    <Card
                      shadow="sm"
                      isPressable
                      className="w-full hover:-translate-y-1 hover:shadow-xl"
                    >
                      <CardBody className="overflow-visible p-0">
                        <Image
                          shadow="sm"
                          radius="lg"
                          width="100%"
                          alt={category.name}
                          className="h-40 w-full object-cover"
                          src="https://i.seadn.io/s/raw/files/572cdff4974eb0952fd2a22ee6c57014.jpg?auto=format&dpr=1&w=384"
                        />
                      </CardBody>
                      <CardFooter className="justify-between">
                        <b className="capitalize">{category.name}</b>
                      </CardFooter>
                    </Card>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="absolute -right-2 top-0 flex h-full translate-x-full items-center opacity-0 transition-all hover:opacity-100">
                <Button
                  ref={nextButtonRefCategories}
                  isIconOnly
                  onClick={() => {
                    swiperRefCategories.current?.swiper.slideNext()
                  }}
                  children={
                    <Icon
                      icon="ooui:next-ltr"
                      className="text-3xl text-white"
                    />
                  }
                  className="h-40 bg-[#12121233]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

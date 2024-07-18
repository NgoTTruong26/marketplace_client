import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import { Avatar, Button, Image, Tab, Tabs } from "@nextui-org/react"
import clsx from "clsx"
import useGetCategories from "modules/settings/services/getCategories"
import useGetTopCollections from "modules/settings/services/getTopCollections"
import { useRef } from "react"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"

export default function HomePage() {
  const getCategories = useGetCategories()
  const getTopCollections = useGetTopCollections()
  const getTop10Collections = useGetTopCollections(10)

  const swiperRef = useRef<SwiperRef>(null)
  const nextButtonRef = useRef(null)
  const prevButtonRef = useRef(null)

  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-default flex-col gap-5">
        <div
          className="flex h-full w-full flex-col gap-8 px-default py-5"
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
            <Button
              isIconOnly
              ref={prevButtonRef}
              onClick={() => swiperRef.current?.swiper.slidePrev()}
              children={
                <Icon icon="ooui:next-rtl" className="text-3xl text-white" />
              }
              className="absolute -left-2 top-0 h-full -translate-x-full bg-[#12121233] opacity-0 hover:opacity-100"
            />
            <Swiper
              ref={swiperRef}
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              navigation={{
                nextEl: nextButtonRef.current,
              }}
              modules={[Navigation]}
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
                  >
                    View collection
                  </Button>
                </SwiperSlide>
              ))}
            </Swiper>
            <Button
              isIconOnly
              ref={nextButtonRef}
              onClick={() => swiperRef.current?.swiper.slideNext()}
              children={
                <Icon icon="ooui:next-ltr" className="text-3xl text-white" />
              }
              className="absolute -right-2 top-0 h-full translate-x-full bg-[#12121233] opacity-0 hover:opacity-100"
            />
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
                    >
                      <div className="text-center">{idx + 1}</div>
                      <div className="col-span-6 flex items-center gap-5">
                        <Avatar
                          isBordered
                          size="lg"
                          radius="lg"
                          src={collection.imageUrl}
                        />
                        <div className="font-semibold">{collection.name}</div>
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
                        <div className="font-semibold">{collection.name}</div>
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
          </div>
        </div>
      </div>
    </div>
  )
}

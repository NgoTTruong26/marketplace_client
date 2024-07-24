import { useState } from "react"
import useGetProductBuyed from "../services/GetProductBuyed"
import ProductUser from "./ProductUser"
import useGetProductCreated from "../services/GetProductIsCreated"

export default function Profile() {
  const [selectedItem, setSelectedItem] = useState<string>("Collected")
  const handleItemClick = (item: string) => {
    setSelectedItem(item)
  }

  const listProductBuy = useGetProductBuyed("2")
  const listProductCreated = useGetProductCreated("1")
  const { data } = listProductBuy
  const productsCreated = listProductCreated.data?.products

  return (
    <>
      <div className="bg-[rgb(255,255,255)]">
        <div className="border-b-16 border-b border-t-8 border-gray-300 bg-[rgb(255,255,255)] bg-gray-100 px-5 py-2">
          <nav>
            <ul className="flex list-none gap-4 p-0">
              {[
                "Collected",
                "Offers made",
                "Deals",
                "Created",
                "Favorited",
                "Activity",
                "More",
              ].map((item) => (
                <li
                  key={item}
                  className={`cursor-pointer rounded p-2 ${selectedItem === item ? "bg-[rgb(200,246,246)]" : ""}`}
                  onClick={() => handleItemClick(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="grid grid-cols-1 justify-items-center gap-4 p-8 sm:grid-cols-2 lg:grid-cols-5">
          {data &&
            selectedItem !== "Created" &&
            data.map((item, index) => <ProductUser key={index} item={item} />)}
          {selectedItem === "Created" &&
            productsCreated &&
            productsCreated.map((item, index) => (
              <ProductUser key={index} item={item} />
            ))}
        </div>
      </div>
    </>
  )
}

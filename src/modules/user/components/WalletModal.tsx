import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react"
import { useUser } from "store/user"
import RechargeModal from "./RechargeModal"

export default function WalletModal() {
  const { user } = useUser()

  const disclosureRecharge = useDisclosure()

  return (
    <>
      <ModalBody className="items-center justify-center">
        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex flex-col">
            <div className="text-3xl font-medium">
              $
              {parseFloat(user.walletBalance.toString()).toLocaleString(
                "de-DE",
              ) + " "}{" "}
              USD
            </div>
            <div className="text-default-500">Wallet balance</div>
          </div>

          <Button
            size="lg"
            color="secondary"
            isIconOnly
            startContent={<Icon icon="ic:round-plus" className="text-2xl" />}
            onPress={disclosureRecharge.onOpen}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <svg
            fill="none"
            height="120"
            viewBox="0 0 100 100"
            width="120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 28C7 23.5817 10.5817 20 15 20H73C77.4183 20 81 23.5817 81 28V76C81 80.4183 77.4183 84 73 84H15C10.5817 84 7 80.4183 7 76V28Z"
              fill="url(#paint0_linear_6146_5380)"
            ></path>
            <circle cx="50" cy="28" fill="#F6C000" r="16"></circle>
            <path
              clipRule="evenodd"
              d="M7 36V28C7 32.4183 10.5817 36 15 36H85C89.4183 36 93 39.5817 93 44V92C93 96.4183 89.4183 100 85 100H15C10.5817 100 7 96.4183 7 92V36Z"
              fill="url(#paint1_linear_6146_5380)"
              fillRule="evenodd"
            ></path>
            <circle cx="81" cy="68" fill="white" r="4"></circle>
            <rect
              fill="#F6C000"
              height="10"
              transform="rotate(45 14.071 0)"
              width="10"
              x="14.071"
            ></rect>
            <rect
              fill="white"
              height="10"
              transform="rotate(45 50.071 21)"
              width="10"
              x="50.071"
              y="21"
            ></rect>
            <rect
              fill="#F6C000"
              height="4"
              transform="rotate(45 86.8284 4)"
              width="4"
              x="86.8284"
              y="4"
            ></rect>
            <defs>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="paint0_linear_6146_5380"
                x1="44"
                x2="44"
                y1="20"
                y2="52"
              >
                <stop stopColor="#2081E2"></stop>
                <stop offset="1" stopColor="#003D7A"></stop>
              </linearGradient>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="paint1_linear_6146_5380"
                x1="50"
                x2="50"
                y1="28"
                y2="100"
              >
                <stop stopColor="#54CCFF"></stop>
                <stop offset="1" stopColor="#42A0FF"></stop>
              </linearGradient>
            </defs>
          </svg>
          <div className="text-center text-lg font-medium text-default-600">
            Fund your wallet to purchase NFTs
          </div>
        </div>
      </ModalBody>

      <Modal
        size="md"
        isOpen={disclosureRecharge.isOpen}
        onClose={disclosureRecharge.onClose}
        className="p-4"
      >
        <ModalContent>
          {(onClose) => <RechargeModal onClose={onClose} />}
        </ModalContent>
      </Modal>
    </>
  )
}

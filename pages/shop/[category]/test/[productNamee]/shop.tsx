import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react"
import styles from "../../../../../styles/productPage.module.css"
import { BuyForm } from "next/font/components/ProductPageComponents";
export default function Shop() {
    const router = useRouter();
    const context = router.query;
    const backArrowPath = "/svgs/backArrow.svg";
    const [showPhoneNumber, setShowPhoneNumber] = useState(false)
    return (
        <div className="grid font-bebas_neue ">
            <div
                className={`${styles.PhoneNumber} ${showPhoneNumber ? "translate-y-[50vh]" : " "
                    }
          bg-white py-4 px-3 left-0 right-0 ml-auto mr-auto relative 
          `}
            >
                <button onClick={() => setShowPhoneNumber(false)} className="flex justify-start absolute top-[5px] left-[5px] w-[20px] h-[20px]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <p className="text-center text-3xl">
                    Call This Number : 0778726876
                </p>
            </div>
            { /* nav bar */}
            <div className={`border-y-[1px] border-gray-300  flex items-center ${styles.header}`}>
                <Link href={`/`}>
                    <div className={"w-[32px] h-[32px] flex items-center "}>
                        <Image
                            width={14}
                            height={15}
                            src={backArrowPath}
                            alt="BackArrow"
                        />
                    </div>
                </Link>
                <Link href={`/`}>
                    <div className="flex items-center justify-center">
                        <p className="text-2xl tracking-widest text-center">HANMA STORE</p>
                    </div>
                </Link>
                <button onClick={() => setShowPhoneNumber(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
            <BuyForm
                size={context.size} chosenColor={context.chosenColor} productPrice={context.chosenPrice} productName={context.productName} />

        </div>
    )
}

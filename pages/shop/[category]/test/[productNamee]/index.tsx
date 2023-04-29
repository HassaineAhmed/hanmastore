import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useRef } from "react";
import Image from "next/image";
import styles from "../../../../../styles/productPage.module.css"
import { BuyForm } from "../../../../../components/ProductPageComponents";
import { getProductStockData, getProductsStocks, getProductsTypesWithOutFields } from "../../../../../prisma/playingWithData"

export default function ProductPage({ productData }: any) {
  // handle swiping : 
  const containerRef = useRef(null);

  let startX, startY, moveX;
  function touchStart(event: any) {
    startX = event.touches[0].clientX;

  }
  function touchMove(event: any) {
    moveX = event.touches[0].clientX;

  }
  function touchEnd(event: any) {
    if (startX + 100 < moveX) { shownPic > 1 ? setShownPic(prev => prev - 1) : setShownPic(howManyPics) }
    if (startX - 100 > moveX) { shownPic < howManyPics ? setShownPic(prev => prev + 1) : setShownPic(1) }
  }
  function handleTouchMove(e) {
    const touchObj = e.changedTouches[0];
    let deltaX = touchObj.pageX - startX;
    let deltaY = touchObj.pageY - startY;
    dist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    let swipeDir;

    // horizontal swipe
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      swipeDir = deltaX < 0 ? 'left' : 'right';
    }
    // vertical swipe
    else {
      swipeDir = deltaY < 0 ? 'up' : 'down';
    }

    if (dist >= threshold) {
      // handle swipe
      console.log('swiped', swipeDir);
      if (swipeDir == "left" || shownPic > 1) {
        setShownPic(prev => prev + 1);
      } else if (swipeDir == "right" || shownPic < howManyPics) {
        setShownPic(prev => prev - 1);
      }
    }
  }




  const router = useRouter();
  const category = router.query.category;
  const productName = router.query.product;
  const logoPath = "/svgs/logoBlack.png";
  const circlePath = "/svgs/circle.svg";
  const backArrowPath = "/svgs/backArrow.svg";
  const howManyPics = parseInt(productData.howManyPics);
  const [chosenColor, setChosenColor] = useState("");
  const [size, setSize] = useState("");
  const [shownPic, setShownPic] = useState(1);
  const [buyForm, setBuyForm] = useState(false);
  const [showSelectSizeNColor, setShowSelectSizeNColor] = useState(false);
  const [showOrderNotification, setShowOrderNotification] = useState(false);
  let images = [];
  let pictureDots = [];
  function ProductImageComponent({ index }: any) {
    const [isLoading, setIsLoading] = useState(true)

    const handleLoadingComplete = () => {
      setIsLoading(false)
    }
    return (
      <div
        className={`font-bebas_neue ${shownPic != index ? "hidden" : ""
          }`}
      >
        {isLoading && (
          <div className="w-[100%] h-[380px] bg-gray-300">Loading animation...</div>
        )}
        <Image
          src={`${productData.path}/${index}.png`}
          height={400}
          width={600}
          alt="product Image"
          onLoadingComplete={handleLoadingComplete}
        />
      </div>
    );
  }
  for (let i = 1; i <= parseInt(productData.howManyPics); i++) {
    images.push(<ProductImageComponent index={i} key={i} />);
  }

  // this concerns the dots that appear below the image
  function PictureDotComponent({ index }: any) {
    return (
      <button
        onClick={(event) => {
          setShownPic(index);
        }}
      >
        <div className={` w-[10px] h-[10px] ease-in-out transition-all duration-900  ${index != shownPic ? "" : "bg-[black] bg-[#000000] border-none"}
 rounded-full border-[1px] border-[#CFCFCF]`}></div>
      </button>
    );
  }
  for (let i = 1; i <= parseInt(productData.howManyPics); i++) {
    pictureDots.push(<PictureDotComponent index={i} key={i} />);
  }

  return <div className="font-bebas_neue">



    { /* nav bar */}
    <div className={`border-y-[1px] border-gray-300 flex items-center ${styles.header}`}>
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
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
        <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clip-rule="evenodd" />
      </svg>
    </div>

    { /* navbar end */}

    <div className="grid">

      { /* images */}
      <div ref={containerRef}
        onTouchStart={touchStart}
        onTouchMove={touchMove}
        onTouchEnd={touchEnd}
        className={`bg-gray-300`}>
        {images.map((e) => e)}
      </div>




      { /* buttons to walk through the iamges */}
      <div className="flex justify-between items-center mt-4">
        <div
          className={`ease-linear duration-100 ${shownPic == 1 ? "opacity-[0%]" : ""
            }`}
        >
          <button
            onClick={(event) => {
              if (shownPic > 1) {
                setShownPic((prev) => prev - 1);
              }
            }}
            className={"ml-5 w-[6px] h-[6px]"}
          >
            <svg className="Icon Icon--media-arrow-left " role="presentation" viewBox="0 0 6 9">
              <path d="M5 8.5l-4-4 4-4" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="square"></path>
            </svg>
          </button>
        </div>
        <div className={"flex justify-center gap-2 m-[10px]"}>
          {pictureDots.map((e) => e)}
        </div>
        <div
          className={`ease-linear duration-100  ${shownPic == parseInt(productData.howManyPics)
            ? "opacity-[0%]"
            : ""
            }`}
        >
          <button
            onClick={(event) => {
              if (shownPic < howManyPics) {
                setShownPic((prev) => prev + 1);
              }
            }}
            className={`mr-5 w-[6px] h-[6px] `}
          >
            <svg class="Icon Icon--media-arrow-right " role="presentation" viewBox="0 0 6 9">
              <path d="M1 8.5l4-4-4-4" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="square"></path>
            </svg>
          </button>
        </div>

      </div>
    </div>

    { /* end */}
    { /* middle section start  */}
    <div className="grid justify-center items-center gap-4 mt-3">


      { /* <title> */}
      <div className="flex justify-center items-center">
        <p className="font-[500] text-3xl max-w-[70%] text-center tracking-widest"> {productData.name} </p>
      </div>

      { /* <price> */}
      <div className="grid jusify-center justify-center">
        <p className="text-lg line-through leading-3 text-gray-500"> 2400.00 dz</p>
        <p className="text-3xl left-[-20px] "> {productData.price}.00 DZD </p>
      </div>

      { /* Size and Color Section */}
      <div className="w-[85%] gap-3 grid items-center justify-self-center">
        <div className="grid gap-5" >
          <div className="grid gap-3 border-y-[1px] border-[#cfcfcf] py-4">
            <div className="grid">
              <div className="flex gap-3">
                <p className="text-xl">Size : </p>
              </div>
              <div className="grid gap-3">
                <div className="flex ml-3 mt-1 items-center gap-4">
                  <button
                    className={`bg-[black] w-[36px] h-[36px] ${size == "s"
                      ? "border-[2px] border-gray-400  scale-125 ease-in duration-75"
                      : ""
                      } `}
                    onClick={(event) => setSize("s")}
                  >
                    <p className="text-[white] text-[23px]"> S </p>
                  </button>
                  <button
                    className={`bg-[black] w-[36px] h-[36px] ${size == "m"
                      ? "border-[2px] border-gray-400  scale-125 ease-in duration-75"
                      : ""
                      } `}
                    onClick={(event) => setSize("m")}
                  >
                    <p className="text-[white] text-[23px]"> M </p>
                  </button>
                  <button
                    className={`bg-[black] w-[36px] h-[36px] ${size == "l"
                      ? "border-[2px] border-gray-400 scale-125 ease-in duration-55"
                      : ""
                      } `}
                    onClick={(event) => setSize("l")}
                  >
                    <p className="text-[white] text-[23px]"> L </p>
                  </button>
                  <button
                    className={`bg-[black] w-[36px] h-[36px] ${size == "xl"
                      ? "border-[2px] border-gray-400 scale-125 ease-in duration-55"
                      : ""
                      } `}
                    onClick={(event) => setSize("xl")}
                  >
                    <p className="text-[white] text-[23px]"> XL</p>
                  </button>
                </div>
              </div>
            </div>
            <div className="grid">
              <div className="flex flex-1 justify-start">
                <p className="text-xl ">Color : </p>
              </div>
              <div className="flex ml-3 mt-1 gap-4">
                {productData.colors.map(color => {
                  return (<button
                    onClick={(event) => {
                      setChosenColor(color.hexCode);
                    }}
                    className={`border-gray-400 h-[36px] w-[36px] bg-[${color.hexCode}] ${chosenColor == color.hexCode
                      ? "border-[2px] scale-125 ease-in duration-55 border-gray-400"
                      : ""
                      }`}
                  >
                  </button>)
                }
                )}
              </div>
            </div>
            <p
              className={`${showSelectSizeNColor == false ? "hidden" : " "
                } text-[red]`}
            >
              Select a size please
            </p>
          </div>
          { /* End of the color and size section */}

          <button
            className="mt-2 w-[100%] flex justify-center"
            onClick={(event) => {
              if (size == "") {
                setShowSelectSizeNColor(true);
              } else {
                setBuyForm(true);
              }
            }}
          >
            <div className="w-[80%] bg-black  h-[50px] text-white flex justify-center items-center text-3xl justify-self-center " >
              BUY NOW
            </div>
          </button>
          <div className="grid items-center gap-3 mt-5">
            <p className="text-base font-nunito_sans"> <span className="text-base font-nunito_sans font-[500]">MATERIAL: </span> 100% Coton. </p>
            <p className="text-base font-nunito_sans"> <span className="text-base font-nunito_sans font-[500]">FIT: </span> OverSize </p>
            <p className="text-base font-nunito_sans"> <span className="text-base font-nunito_sans font-[500]">DESIGN: </span> a pic of hanma yujiro standing and a quote on the back </p>
          </div>
          { /* End of the color and size section */}
          <div className="grid justify-center">
            <p className="font-nunito_sans font-[500] text-[16px] tracking-[3px]"> YOU MAY ALSO LIKE </p>
          </div>
        </div>
      </div>
    </div>
  </div>
}
export async function getServerSideProps(context: any) {
  const category = context.params.category;
  const product = context.params.productNamee;
  const categories = await getProductsTypesWithOutFields();
  const products = await getProductsStocks();
  let productFound = false, categoryFound = false;
  products.map((p: any) => { if (p.name == product) productFound = true });
  categories.map((c: any) => { if (c.name == category) categoryFound = true });
  if (!categoryFound || !productFound) {
    return {
      notFound: true,
    };
  }
  const productData = await getProductStockData(product)
  return { props: { productData } };
}

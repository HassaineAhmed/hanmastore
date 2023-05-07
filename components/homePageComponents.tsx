import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/homePage.module.css";
import AOS from "aos"
import 'aos/dist/aos.css';
import Link from "next/link";
import { Link as ReactScrollLink, Element } from "react-scroll"

export function Header() {
  const [switchText, setSwitchText] = useState(0);
  useEffect(() => {
    AOS.init();
  }, [])
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSwitchText((switchText + 1) % 2);
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, [switchText]);
  return (
    <div className="bg-black h-[28px] overflow-hidden relative flex justify-center items-center ">
      <p className={`${styles.text} text-[16px] font-cairo absolute text-white ${switchText == 0 ? "animate-slideIn" : "animate-slideOut"}`}> توصيل 58 ولاية لباب المنزل </p>
      <p className={`${styles.text} text-[16px] absolute text-white ${switchText == 0 ? "animate-slideOut" : "animate-slideIn"}`}>Delivery is now available all over Algeria</p>
    </div>
  );
}
export function HeroSection() {

  const videoRef = useRef(null);
  return (
    <div className="flex justify-center items-center">
      <div className={styles.videoContainer}>
        <div className={styles.videoPreloader}></div>
        <video
          ref={videoRef}
          autoPlay
          muted
          controls={false}
          loop
          className={styles.videoObject}
        >
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="absolute top-[70%] left-0 grid justify-center gap-5">
        <div className="grid gap-1 text-white ml-5">
          <p className="text-4xl">style better lift more</p>
          <p className="text-lg font-nunito_sans">Flex what you&apos;ve built with our exclusive and comfortable fits</p>
        </div>

        <ReactScrollLink className="w-[100%] flex justify-center" to={"TrendingSection"} smooth={true}>
          <button className="mx-3 bg-white px-9 py-2 w-[90%]  text-black text-3xl rounded-xl py-2">start shoping now</button>
        </ReactScrollLink>
      </div>
    </div>
  );
}




function CategoryOptions({ categories }) {
  function CategoryComponent({ name }) {
    return (
      <div className={`${styles.category_component} px-8  rounded-sm min-h-[100px] rounded-xl  bg-[url('../public/abc.png')] flex justify-center items-center`} data-aos="zoom-in" data-aos-duration="1000" data-aos-once="true">
        <p className="text-black text-[32px] ml-20 tracking-tight">{name}</p>
      </div>
    );
  }
  { /* <CategoryComponent key={cate.id} name={cate.name} /> */ }
  return (
    <div className="grid gap-4 mx-8 justify-center items-center  ">
      {categories.map((cate, index) =>
        <ReactScrollLink key={index} to={cate.name} smooth={true}>
          <div className="rounded-xl bg-black flex justify-center p-4 px-8"> <p className="text-white text-5xl">{cate.name}S</p> </div>
        </ReactScrollLink>
      )}
    </div>
  );
}
export function WelcomingSection({ categories }) {
  return (
    <div className="bg-white gap-6 grid justify-center items-start py-8">
      <div className="grid gap-2 justify-center items-center">
        <Image
          className={"justify-self-center"}
          src={"/black without name.png"}
          width={94}
          height={78}
          alt="white logo"
        />
        <p className={"text-3xl text-black text-center pt-3"}>
          {" "}
          Welcome to hanma store{" "}
        </p>
        <p className="text-md text-center px-3 font-dm_sans">
          Discover your unique style with our trendy and affordable clothing. Shop now for your new favorite pieces!
        </p>
      </div>
      <div className="grid gap-2 justify-center items-center">
        <p className="text-xl font-bold text-center font-dm_sans ">How Does It Work</p>
        <div className={"grid gap-1 justify-center"}>
          <div className="flex gap-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <p className={"text-md font-dm_sans font-[500] text-black  leading-5"}>
              Buy a product from a website.
            </p>
          </div>
          <div className="flex gap-4">
            <Image src="/delivery_icon.png" height={26} width={26} alt="delivery icon" />
            <p className={"text-md font-dm_sans text-black font-[500]  "}>
              Your Product Will be delivered to you.
            </p>
          </div>
          <div className="flex items-center gap-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
            </svg>
            <p className={"text-md font-dm_sans text-black  font-[500] leading-5"}>
              Tkhlas ki yalha9k l produit.
            </p>
          </div>
        </div>
      </div>
      <div className="grid mt-5 gap-4">
        <div className=" w-[90%] justify-self-center border-solid border-[black] border-t-2 border-black" > </div>
        <p className={"text-lg text-black font-dm_sans text-center leading-[19px]"}>
          Please take a loot at our <span className="font-bold  font-lg" >categories</span>
        </p>
      </div>
      <CategoryOptions categories={categories} />
    </div>
  );
}
export function ProductComponent({ text_color, bg_color, category, productData }) {
  return (
    <Link prefetch={false} href={`/shop/${productData.productTypeName}/test/${productData.name}`}>
      <div className="grid justify-center items-center " data-aos="zoom-in" data-aos-duration="500" data-aos-once="true">
        <Image src={`/images/${category}s/${productData.name}/1.png`} className="mb-1" alt="model" width={300} height={500} />
        <p className={`text-black text-sm tracking-normal text-center mb-1`}>{productData.name}</p>

        <div className="flex justify-center items-center gap-6">
          <div className={"grid justify-center items-start leading-3"}>
            {productData.previous_price != 0 &&
              <p className="text-gray-500 line-through text-sm  leading-3">{productData.previous_price} DZD</p>
            }
            <p className={`text-black text-xl`}>{productData.price} DZD</p>
          </div>
          <div className="flex items-center justify-center mb-1 gap-[2px]">
            <div className="bg-white border-[2px] border-[#686D76] p-[11px]" />
            <div className="bg-black border-[2px] border-[#686D76] p-[11px]" />
          </div>
        </div>
      </div></Link>)
}
export function TrendingSection({ text_color, trendingProducts, bg_color }) {
  return (
    <Element name="TrendingSection" className="">
      <div className={"pt-2 pb-8 bg-white grid justify-center items-center"}>
        <div className=" w-[90%] justify-self-center border-solid border-[black] border-t-2 pt-3 border-black" > </div>
        <p className={`text-center text-black text-[60px]`}>TRENDINGS</p>{" "}
        <div className="grid justify-center content-around gap-2 gap-y-3 mx-3 items-center grid-cols-2">
          {trendingProducts.map((product, index) =>
            <ProductComponent key={index} category={product.productTypeName} text_color={"text-white"} bg_color={"bg-black"} productData={product} />
          )}
        </div>
      </div>
    </Element>
  );
}
export function CategorySection({ title, index, category, productList }) {
  const text_color = index % 2 == 0 ? "text-black" : "text-black"
  const bg_color = index % 2 != 0 ? "bg-white" : "bg-white"
  return (
    <div className={`${bg_color} pb-8 pt-3 grid justify-center items-center`}>
      <div className=" w-[90%] justify-self-center border-solid border-[black] border-t-2 pt-3 border-black" > </div>
      <p className={`${text_color} text-center text-[60px]`}>{title}</p>{" "}
      <div className="grid justify-center content-around gap-2 gap-y-3 mx-3 items-center grid-cols-2">
        {productList.map((product, index) =>
          <ProductComponent key={index} text_color={text_color} bg_color={bg_color} category={category} productData={product} />
        )}
      </div>
    </div>
  )
}
export function InfluenceursSection() {
  return (<div className="grid-template-2cols">
  </div>);
}
export function Footer() {
  return <div className="bg-black gap-7 grid justify-stretch items-center py-4
    w-full">
    <div className="grid justify-center gap-2 items-center">
      <Image src={"/white without name.png"} width={94} height={78} alt="logo" />
      <p className="text-white text-2xl">hanma store</p>
    </div>
    <p className="text-gray-300 font-dm_sans text-sm mx-3 text-center">Copyright © 2023. TATES. All rights’re not reserved.</p>
    <div className="flex justify-between items-center ml-10">
      <div className="grid">
        <p className="text-gray-100 font-bold font-dm_sans text-lg">About</p>
        <p className="text-gray-100 font-bold font-dm_sans text-lg">Our Story</p>
        <p className="text-gray-100 font-bold font-dm_sans text-lg">Careers</p>
        <p className="text-gray-100 font-bold font-dm_sans text-lg">Benefits</p>
      </div>
      <div>
      </div>
      <div className="grid items-center justify-center gap-4 mr-10">
        <Image src="twitter.svg" height={30} width={30} alt="twitter" />
        <Image src="facebook.svg" height={15} className="ml-1" width={15} alt="twitter" />
        <Image src="instagram.svg" height={25} width={25} alt="twitter" />
      </div>
    </div>
    <form onSubmit={(event) => console.log(event.target)} className="grid justify-center items-center justify-self-center" >
      <div className="grid justify-center items-center">
        <p className="font-dm_sans text-white text-2xl text-[600] text-center mt-4">Join our family, and get notified about every discount</p>
        <input type="email" placeholder="type your email" className="p-5 mx-8 mt-4 border-b-2 border-white focus:outline-none text-white bg-black" />
      </div>
    </form>

    <button className="grid justify-center justify-self-center gap-3 items-center ">
      <div className="bg-white rounded-3xl p-3 flex justify-center">
        <svg width="59" height="66" viewBox="0 0 59 66" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40.0884 42.1388L29.0057 29.6054L17.9231 42.1388L14.5028 38.2708L29.0057 21.8694L43.5086 38.2708L40.0884 42.1388Z" fill="black" />
        </svg>
      </div>
      <p className="text-white font-[500] text-center text-2xl">Get back up</p>
    </button>
  </div>
}

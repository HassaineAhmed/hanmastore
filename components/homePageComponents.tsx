import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/homePage.module.css";
import AOS from "aos"
import 'aos/dist/aos.css';

export function Header() {
  const [switchText, setSwitchText] = useState(0);
   useEffect(() => {
        AOS.init();
      }, [])
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSwitchText((switchText + 1) % 2);
    }, 7000);
    return () => {
      clearInterval(intervalId);
    };
  }, [switchText]);
  return (
    <div className="bg-black h-[28px] overflow-hidden relative flex justify-center items-center ">
     <p className={`${styles.text} text-xl absolute text-white ${switchText == 0 ? "animate-slideIn" : "animate-slideOut"}`}> Welcome to our shop </p> 
     <p className={`${styles.text} text-xl absolute text-white ${switchText == 0 ? "animate-slideOut" : "animate-slideIn"}`}>Free Delivery for 58 wilaya</p> 
    </div>
  );
}
export function HeroSection() {
  return (
    <div className="flex justify-center items-center">
      <Image alt="home page image" className="w-[100%]" src={"/homePageImage.png"} width={390} height={500} />{" "}
    </div>
  );
}
function CategorySection() {
  function CategoryComponent() {
    return (
      <div className="bg-gradient-to-r rounded-xl flex justify-center items-center from-cyan-500 to-blue-500" data-aos="zoom-in" data-aos-duration="1000" data-aos-once="true">
        <p className="text-black text-[50px]">GYM TANKS</p>
      </div>
    );
  }
  return (
    <div className="grid gap-5 pt-5">
      <CategoryComponent />
      <CategoryComponent />
      <CategoryComponent />
    </div>
  );
}
export function WelcomingSection() {
  return (
    <div className="bg-black gap-1 grid justify-center items-start py-8">
      <Image
        className={"justify-self-center"}
        src={"/whiteLogo.svg"}
        width={94}
        height={78}
        alt="white logo"
      />
      <p className={"text-3xl text-white text-center pt-3"}>
        {" "}
        Welcome to hanma store{" "}
      </p>
      <div className={"grid pt-3 gap-[-9px]"}>
        <p className={"text-md font-dm_sans text-white text-center leading-5"}>
          Livraison 58 wilaya <br />
          Tkhlas ki yalha9k l produit
        </p>
      </div>
      <p className={"text-lg text-white font-dm_sans text-center leading-[19px] pt-5"}>
        Please take a loot at our categories
      </p>
      <p className={"text-[55px] text-white text-center"}>CATEGORIES</p>
      <CategorySection />
    </div>
  );
}
export function ProductComponent() {
  return (
    <div className="rounded-xl gap-2 bg-white px-[13px] grid justify-center py-3 items-center" data-aos="zoom-in" data-aos-duration="500" data-aos-once="true">
      <Image src={"/sofain.png"} alt="model" height={186} width={148} />
      <div className={"grid justify-center items-center "}>
        <p className="text-[16px]  text-center text-black">Hanma Yujiro Tanks</p>
        <div className="flex gap-6">
          <div className={"grid justify-center items-start leading-3"}>
            <p className="text-gray-500 line-through text-sm  leading-3">2400 dzd </p>
            <p className="text-black text-xl">2200 dzd </p>
          </div>
          <div className="flex items-center gap-[2px]">
            <div className="bg-white border-[2px] border-[#686D76] p-[11px]" />
            <div className="bg-black border-[2px] border-[#686D76] p-[11px]" />
          </div>
        </div>
        <button className="bg-black text-white  py-[1px] text-[20px] rounded-md">
          Buy Nown
        </button>
      </div>
    </div>
  );
}
export function TrendingSection() {
  return (
    <div className={"bg-black grid justify-center items-center"}>
      <p className="text-center text-white text-[60px]">TRENDINGS</p>{" "}
      <div className="grid justify-center gap-3 items-center grid-cols-2">
        <ProductComponent />
        <ProductComponent />
        <ProductComponent />
        <ProductComponent />
      </div>
    </div>
  );
}

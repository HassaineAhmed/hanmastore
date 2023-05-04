import 'next/font/styles/globals.css'
import { useRouter } from 'next/router'
import Router from "next/router"
import { useEffect, useState } from "react"
import type { AppProps } from 'next/app'
import { Cairo, Nunito_Sans, Montserrat, Bebas_Neue, DM_Sans } from 'next/font/google'
import { CircularProgress } from '@mui/material';
import styles from "../styles/homePage.module.css"


const cairo = Cairo({ subsets: ["arabic"], weight: ["400", "500", "600", "700"], variable: "--font-cairo", display: "swap" })
const nunito_sans = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-nunito-sans", display: "swap" })
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-montserrat", display: "swap" })
const bebas = Bebas_Neue({ subsets: ['latin'], weight: ["400"], variable: "--font-bebas-neue", display: "swap" })
const dm_sans = DM_Sans({
  variable: '--font-dm-sans',
  display: 'swap', subsets: ['latin'], weight: ["400", "500", "700"]
});



export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  function Loader() {
    Router.events.on("routeChangeStart", (url) => { console.log("loading started"); setLoading(true) });
   Router.events.on("routeChangeComplete", (url) => { console.log("loading completed"); setLoading(false); });
    return loading ? (<div className='flex justify-center items-center w-[100vw] h-[100vh]'><CircularProgress size="60px" color="inherit" /></div>) : <></>
  }
  return <> <Loader />
    <main className={` ${ loading && "hidden" } ${dm_sans.variable} ${bebas.variable} ${montserrat.variable} ${nunito_sans.variable}`}><Component {...pageProps} /></main> </>
}
export const DOMAINE_URL = "localhost:3000"

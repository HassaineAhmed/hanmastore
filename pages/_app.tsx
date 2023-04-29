import 'next/font/styles/globals.css'
import type { AppProps } from 'next/app'
import { Cairo, Nunito_Sans, Montserrat, Bebas_Neue , DM_Sans} from 'next/font/google'


const cairo =  Cairo({ subsets : ["arabic"] , weight : ["400", "500","600", "700" ] , variable : "--font-cairo", display: "swap"})
const nunito_sans = Montserrat({ subsets : ["latin"] , weight : ["400", "500","600", "700" ] , variable : "--font-nunito-sans", display: "swap"})
const montserrat = Montserrat({ subsets : ["latin"] , weight : ["400", "500", "600", "700" ] , variable : "--font-montserrat", display: "swap"})
const bebas= Bebas_Neue({ subsets: ['latin'], weight : ["400"], variable: "--font-bebas-neue", display: "swap" })
const dm_sans= DM_Sans({
  variable: '--font-dm-sans',
  display: 'swap',subsets: ['latin'], weight : ["400","500", "700"] 
});


export default function App({ Component, pageProps }: AppProps) {
  return <main className={`${dm_sans.variable} ${bebas.variable} ${montserrat.variable} ${nunito_sans.variable}`}><Component {...pageProps} /></main>
}
export const DOMAINE_URL = "localhost:3000"

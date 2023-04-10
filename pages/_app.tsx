import 'next/font/styles/globals.css'
import type { AppProps } from 'next/app'
  import { Bebas_Neue , DM_Sans} from 'next/font/google'

const bebas= Bebas_Neue({ subsets: ['latin'], weight : ["400"], variable: "--font-bebas-neue", display: "swap" })
const dm_sans= DM_Sans({
  variable: '--font-dm-sans',
  display: 'swap',subsets: ['latin'], weight : ["400"] 
});


export default function App({ Component, pageProps }: AppProps) {
  return <main className={`${dm_sans.variable} ${bebas.variable}`}><Component {...pageProps} /></main>
}

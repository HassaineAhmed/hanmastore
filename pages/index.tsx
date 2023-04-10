import Image from "next/image";
import { Header, HeroSection, WelcomingSection, TrendingSection  } from "../components/homePageComponents";
export default function Home() {
  return (
    <div className="font-bebas_neue">
      <Header />
      <HeroSection />
      <WelcomingSection />
      <TrendingSection />
    </div>
  );
}

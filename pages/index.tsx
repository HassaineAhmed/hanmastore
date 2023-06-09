import { Header, HeroSection, InfluenceursSection, CategorySection, WelcomingSection, Footer, TrendingSection } from "../components/homePageComponents";
import { getProductsStocks, getTrendingProductsStocks } from "../prisma/playingWithData";
import { getProductsTypes } from "../prisma/playingWithData"
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
export default function Home({ products, categories, trendingProducts }) {
  return (
    <div className="font-bebas_neue">
      <Header />
      <HeroSection />
      <WelcomingSection categories={categories} />
      <TrendingSection text_color={"text-white"} bg_color={"bg-black"} trendingProducts={trendingProducts} />
      {categories.map((cate, index) => {
        const productList = products.filter(pr => pr.productTypeName == cate.name)
        return <Element name={cate.name} key={index}> <CategorySection title={`${cate.name}s`} index={index} category={cate.name} productList={productList} /> </Element>
      }
      )
      }
      <InfluenceursSection />
      <Footer />
    </div>
  );
}
export async function getStaticProps() {
  const categories = await getProductsTypes();
  const products = await getProductsStocks();
  const trendingProducts = await getTrendingProductsStocks();
  console.log("trending product : ", trendingProducts)
  return { props: { categories, products, trendingProducts } };
}


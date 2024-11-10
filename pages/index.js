import HeroBanner from "@/components/HeroBanner"
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { fetchDataFromApi } from "@/utils/api";

import Category from "./category/[slug]";
export default function Home({products,categories}) {
  
  return (

    <main>
    <HeroBanner />
    <Wrapper>

      {/*heading and paragraph start*/}
      <div className="text-center max-w-[800px] mx-auto my-[30px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            style your look
            {/* Cushioning for your Miles */}
            </div>
          <div className="text-md md:text-xl">
            A lightweight Frames & Sunglasses is combined with
            Flexible Materials to help provide Confort 
            during extended stretches of all the days.
            </div>
      </div>
      {/*heading and paragraph end*/}

      
      
      
        
        
        
 
    {/*pruducts grid start*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14
      px-5 md:px-0">
        {products?.data?.map((product) =>(
          <ProductCard key={product?.id} data={product} />
        ))}
        {/* <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard /> */}
      </div>
      {/*pruducts grid end*/}
    </Wrapper>
   </main>
  );
}

export async function getStaticProps() {
  const products = await fetchDataFromApi ("/api/products?populate=*");

  return {
    props: {products}
  }
}
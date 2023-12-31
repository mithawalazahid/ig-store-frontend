import React, { useState, useEffect } from "react"
import { fetchDataFromApi } from '@/utils/api';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CategoryCard from "./CategoryCard";

function CategorySlider() {
    const [categories,setCategories] = useState(null);


    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };


    useEffect(() => {
        fetchCategories();
      },[])
    
      const fetchCategories = async () => {
        const {data} = await fetchDataFromApi('/api/categories?populate=*');
        setCategories(data);
      }

  return (
    <div>
        <div className="text-2xl font-bold mb-5">SHOP BY CATEGORY</div>
        <Carousel responsive={responsive} containerClass="mx-[10px]" itemClass="px-[10px]">
        {categories?.data?.map((categories) => (
          <CategoryCard key={categories?.id} data={categories} />
        ))}
      </Carousel>;
    </div>
  )
}

export default CategorySlider

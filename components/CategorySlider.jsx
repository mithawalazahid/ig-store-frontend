import React, { useState, useEffect } from "react"
import { fetchDataFromApi } from '@/utils/api';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CategoryCard from "./CategoryCard";

function CategorySlider({ categories }) {

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

  return (
    <div className="mt-[50px] md:mt=[100px] md-[100px] md:mb-0">
      <div className="text-2xl font-bold mb-5">SHOP BY CATEGORY</div>

      <Carousel responsive={responsive} containerClass="mx-[10px]" itemClass="px-[10px]">
        {categories?.data?.map((category) => (
          <CategoryCard key={category?.id} data={category} />
        ))}
      </Carousel>;

    </div>
  )
}

export default CategorySlider

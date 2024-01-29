import React, { useState, useEffect } from "react"
import { fetchDataFromApi } from '@/utils/api';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import Link from "next/link";

function CategoryCard() {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, [])

  const fetchCategories = async () => {
    const { data } = await fetchDataFromApi('/api/categories?populate=*');
    setCategories(data);
  }

  return (
    <div className="flex  flex-wrap gap-5 justify-around">
      {categories?.map(({ attributes: c, id }) => {
        return (
          <Link          
          key={id} 
          href={`/category/${c.slug}`}>
          <>

            <div className="object-contain">
              <Image
                width={500}
                height={500}
                src={c.sliderimg?.data?.attributes?.url}
                alt={c.name}
                className="max-h-[400px]  md:max-h-[350px] max-w-[350px]"/>

              <div className="p-4 text-black/[0.9]">

                <h2 className='text-lg font-bold text-center'>{c.name}</h2>

              </div>

            </div>
          
          </>
          </Link>
        );

      })}
    </div>
  )
}

export default CategoryCard

import Link from 'next/link'
import React from 'react'
import Image from "next/image";
import { getDiscountedPricePercentage } from '@/utils/helper';



const CategoryCard = ({ categories: { attributes: p, id } }) => {
    return (
        <Link href={`/product/${p.slug}`}
            className="transform overflow-hidden bg-white duration-200 hover:scale-105
        cursor-pointer "
        >   
        <div className="object-contain min-h-[500px] min-w-[500px]">


        </div>
           
    
            <div className="p-4 text-black/[0.9]">
                <h2 className='text-lg font-medium'>{p.name}</h2>
                
            </div>
        </Link>
    );
};

export default CategoryCard
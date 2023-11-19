import React, { useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import Wrapper from "@/components/Wrapper";
import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import RelatedProducts from "@/components/RelatedProducts";
import { fetchDataFromApi } from "@/utils/api";
import { getDiscountedPricePercentage } from "@/utils/helper";
import ReactMarkdown from "react-markdown";
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from "@/store/cartSlice";

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const ProductDetails = ({ product, products }) => {
    // my edit on this
    const [selectedSize, setSelectedSize] = useState();
    const [showError, setShowError] = useState(false);
    const dispatch = useDispatch()
    // my edit on this
    const p = product?.data?.[0]?.attributes;

    const notify = () => {
        toast.success('Success. check your cart', {
            position: "bottom-right",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            })
    }
    return (
        <div className="w-full md:py-20">
            <ToastContainer />
            <Wrapper>
                <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
                    {/*left coloumn start*/}
                    <div className="w-full md:auto flex-[1.5] max-w-[500px] lg:max-w-full
            max-auto lg:mx-0">
                        <ProductDetailsCarousel images={p.image.data} />
                    </div>
                    {/*left coloumn end*/}

                    {/*right coloumn start*/}
                    <div className="flex-[1] py-3">
                        {/*Product Title*/}
                        <div className="text-[32px] font-semibold mb-2 leading-tight">
                            {p.name}
                        </div>

                        {/*Product Subtitle*/}
                        <div className="text-[16px] font-semibold mb-5">
                            {p.subtitle}
                        </div>

                        {/*Prodcut Price*/}
                        <div className="flex items-center">
                            <p className="mr-2 text-lg font-semibold">
                                MRP: &#8377;{p.price}
                            </p>
                            {p.original_price && (
                                <>
                                    <p className=" text-base font-medium line-through">
                                        &#8377;{p.original_price}
                                    </p>
                                    <p className="ml-auto text-base font-medium text-green-500">
                                        {getDiscountedPricePercentage(
                                            p.original_price,
                                            p.price
                                        )}
                                        % off
                                    </p>
                                </>
                            )}

                        </div>
                        <div className="text-md font-medium text-black/[0.5]">
                            incl. of taxes
                        </div>
                        <div className="text-md font-medium text-black/[0.5] mb-20">
                            {`(Also includes all applicable duties)`}
                        </div>

                        {/*Product size range start */}
                        <div className="mb-10">

                            {/*Heading start*/}
                            {/* <div className="flex justify-between mb-2">
                                <div className="text-md font-semibold">
                                    Select Size
                                </div>

                                <div className="text-mb font-medium text-black/[0.5]">
                                    Select guide
                                </div>
                            </div> */}
                            {/*Heading End*/}


                                           
                            {/* Size Start */}
                            {/* <div  id="sizesGrid" className="grid grid-cols-3 gap-2">
                                {p?.size?.data?.map((item, i) => (
                                    <div 
                                    key={i} 
                                    className={`border rounded-md text-center py-3
                                        font-medium ${
                                            item.enabled 
                                            ? "hover:border-black cursor-pointer"
                                            : "cursor-not-allowed bg-black/[0.1] opacity-50"
                                        }
                                         
                                        ${selectedSize === item.size ? "border-black" : ""}
                                         
                                         `}


                                    // my edit on this 
                                    onClick={() => {
                                        setSelectedSize(item.size)
                                        setShowError(false)
                                    }}
                                    // my edit on this
                                        >
                                        {item.size}
                                    </div>
                                ))}
                            
                            </div> */}
                            {/*Size End */}
                            


                            {/*Show Error start*/}
                            {showError && (
                                <div className="text-red-600 mt-1">
                                    Size selection is required
                                </div>
                            )}
                            {/*Show Error start*/}
                        </div>
                        {/*Product Size Range End  */}

                        {/* Add To Card Button Start */}
                        <button className="w-full py-4 rounded-full bg-black text-white
                        text-lg font-medium transition active:scale-95 mb-3 hover:opacity-75"
                        onClick={() => {

                            dispatch(addToCart({
                                ...product?.data?.[0],
                               // selectedSize, //size related code to send size in cart items
                                oneQuantityPrice: p.price
                            })
                            );
                            notify();
                                
                            }}
                        // my edit on this
                            >

                            Add to Cart
                        </button>
                        {/* Add To Card Button END */}

                        {/* Whishlist button start */}
                        <button className="w-full py-4 rounded-full border border-black
                     text-lg font-medium transition-transform active:scale-95 
                     flex items-center justify-center gap-2 hover:opacity-75 mb-10">
                            Whishlist
                            <IoMdHeartEmpty size={20} />
                        </button>
                        {/* Whishlist button end */}
                        <div>
                            <div className="text-lg font-bold mb-5">
                                Product Details
                            </div>

                            <div className=" markdown text-md mb-5">
                                <ReactMarkdown>
                                 {p.description}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                    {/*right coloumn end*/}
                </div>

                <RelatedProducts  products={products}/>
            </Wrapper>
        </div>
    )
}

export default ProductDetails

export async function getStaticPaths() {
    const products = await fetchDataFromApi("/api/products?populate=*");
    const paths = products.data.map((p) => ({
        params: {
            slug: p.attributes.slug,
        },
    }));

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params: { slug } }) {
    const product = await fetchDataFromApi(
        `/api/products?populate=*&filters[slug][$eq]=${slug}`
    );
    const products = await fetchDataFromApi(
        `/api/products?populate=*&[filters][slug][$ne]=${slug}`
    );

    return {
        props: {
            product,
            products
        }
    }
}

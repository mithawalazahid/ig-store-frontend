import React, { useState, useEffect } from "react"

import { TbSearch } from "react-icons/tb";
import Search from "./Search/Search";

import Wrapper from "./Wrapper";

import Link from "next/link";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";

import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { fetchDataFromApi } from '@/utils/api';
import { useSelector } from "react-redux";




const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrcollY, setLastScrollY] = useState(0);
  const [categories, setCategories] = useState(null);

  const [showSearch, setShowSearch] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrcollY && !mobileMenu) {
        setShow("-translate-y-[80px]");
      } else {
        setShow("shadow-sm")
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.addEventListener("scroll", controlNavbar);
    }
  }, [lastScrcollY])

  useEffect(() => {
    fetchCategories();
  }, [])

  const fetchCategories = async () => {
    const { data } = await fetchDataFromApi('/api/categories?populate=*');
    setCategories(data);
  }

  return (


    <>

      <header
        className={`w-full h-[50px] md:h-[80px] bg-white flex items-center 
  justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
      >
        <Wrapper className="h-[60px] flex justify-between items-center">
          <Link href="/">
            <h1 className="text-[28px] md:text-[34px] font-semibold leading-tight">IG STORE</h1>
            {/* <img src="/logo.svg" className="w-[40px] md:w-[60px]" /> */}
          </Link>

          <Menu
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            categories={categories}
          />

          {mobileMenu &&
            <MenuMobile
              showCatMenu={showCatMenu}
              setShowCatMenu={setShowCatMenu}
              setMobileMenu={setMobileMenu}
              categories={categories}
            />}

          <div className="flex items-center gap-2 text-black">

            {/* <TbSearch className="text-[15px] md:text-[20px]"
              onClick={() => setShowSearch(true)} /> */}

            {/* Icon start*/}

            <Link href="/Cart">
              <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center 
        items-center hover:bg-black/[0.05] cursor-pointer relative">

                <BsCart className="text-[15px] md:text-[20px]" />

                {cartItems.length > 0 && (
                  <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px]
          rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white
          text-[10px] md:text-[12px] flex justify-center items-center px-[2px] 
          md:px-[5px]">
                    {cartItems.length}
                  </div>
                )}

              </div>

            </Link>

            {/* Icon end*/}

            {/* mobile icon start*/}
            <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center 
          items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2">
              {mobileMenu ? (
                <VscChromeClose className="text-[16px]"
                  onClick={() => setMobileMenu(false)}
                />
              ) : (
                <BiMenuAltRight className="text-[20px]"
                  onClick={() => setMobileMenu(true)}
                />
              )}
            </div>
            {/* mobile icon end*/}
          </div>
        </Wrapper>

      </header>

      {showSearch && <Search setShowSearch={setShowSearch} />}
    </>

  );
}

export default Header;
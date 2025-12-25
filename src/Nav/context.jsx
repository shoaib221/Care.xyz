"use client"

import React, { createContext, useContext, useState } from 'react';
const Navcontext = createContext();
export const useNavContext = () => useContext(Navcontext);
import { useRouter } from 'next/navigation';
import './nav.css';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";




export const NavProvider = ({ children }) => {
    const [navi, setNavi] = useState('/');
    const [down1, setDown1] = useState(false);
    const router = useRouter();


    const SmallScreenTag = () => {

        if (down1) return (
            <div className='text-xl flex justify-center px-6 items-center lg:hidden cursor-pointer' onClick={() => DownWindow(false)} >
                <IoIosArrowUp />
            </div>
        )

        return (
            <div className='text-xl flex justify-center px-6 items-center lg:hidden cursor-pointer' onClick={() => DownWindow(true)} >
                <IoIosArrowDown />
            </div>
        )
    }

    const LargeScreenTag = () => {
        return (
            <div className='hidden lg:flex text-[0.9rem] gap-2 justify-center' >
                <div onClick={() => DownWindow(false, "/")} className={`nav ${navi === "/" ? "active-nav" : "" }`}  >Home</div>
                <div onClick={() => DownWindow(false, "/my-bookings")} className={`nav ${navi === "/my-bookings" ? "active-nav" : "" }`} >Bookings</div>
            </div>
        )
    }

    function DownWindow( wind, path) {
        setDown1( wind )
        if( path ) {
            router.push( path )
            setNavi(path)
        }
        

    }

    const DownWindowTag = () => {
        
        return (
            
            <div className={`${down1 ?  "flex" : "hidden" } absolute z-2 h-[100%] w-[100%] bg-[var(--color1)]  flex-col items-center top-0 left-0 p-4 gap-4`}  >
                <div onClick={() => DownWindow( false, "/")} className={ `nav ${navi === "/" ? "active-nav" : ""}` }  >Home</div>
                <div onClick={() => DownWindow( false, "/my-bookings")} className={ `nav ${navi === "/my-bookings" ? "active-nav" : "" }` } >Bookings</div>                
            </div>
        )
    }

    const info = {
        SmallScreenTag, LargeScreenTag, DownWindowTag, DownWindow
    }

    return (
        <Navcontext.Provider value={info} >
            {children}
        </Navcontext.Provider>
    );
};


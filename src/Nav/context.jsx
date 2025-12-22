"use client"

import React, { createContext, useContext, useState } from 'react';

const Navcontext = createContext()

export const useNavContext = () => useContext(Navcontext);

export const NavProvider = ({ children }) => {
    const [navi, setNavi] = useState('/');
    const [down1, setDown1] = useState(true);


    const SmallScreenTag = () => {

        if (down1) return (
            <div className='flex justify-center px-6 items-center lg:hidden cursor-pointer' onClick={() => DownWindow(false)} >
                Menu
            </div>
        )

        return (
            <div className='flex justify-center px-6 items-center lg:hidden cursor-pointer' onClick={() => DownWindow(true)} >
                Back
            </div>
        )
    }

    const LargeScreenTag = () => {
        return (
            <div className='hidden lg:flex text-[0.9rem]' >
                <div onClick={() => DownWindow(true, "/")} className={`class-1 ${navi === "home" && "active-navi"}`}  >Home</div>
                <div onClick={() => DownWindow(true, "/all-scholarships")} className={`class-1 ${navi === "all-scholarships" && "active-navi"}`} >Scholarships</div>
            </div>
        )
    }

    function DownWindow( wind, path) {

        setDown1( wind )
        if( path ) navigate(path)

    }

    const DownWindowTag = () => {
        
        return (
            
            <div className={`${down1 ? "hidden" : "flex" } absolute z-2 h-[100%] w-[100%] bg-[var(--color1)]  flex-col items-center top-0 left-0 p-4 gap-4`}  >
                <div onClick={() => DownWindow( true, "/")} className={ `class-1 ${navi === "home" && "active-navi" }` }  >Home</div>
                <div onClick={() => DownWindow( true, "/all-scholarships")} className={ `class-1 ${navi === "all-scholarships" && "active-navi" }` } >Scholarships</div>                
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


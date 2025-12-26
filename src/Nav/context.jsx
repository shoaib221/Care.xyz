"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
const Navcontext = createContext();
export const useNavContext = () => useContext(Navcontext);
import { useRouter } from 'next/navigation';
import './nav.css';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSession } from 'next-auth/react';
import axios from 'axios';




export const NavProvider = ({ children }) => {
    const { data: session, status } = useSession()
    const [navi, setNavi] = useState('/');
    const [down1, setDown1] = useState(false);
    const router = useRouter();
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        console.log("logo", status)

        // if( status === 'unauthenticated' ) setProfile(status);
        if (status !== 'authenticated') return;



        async function Fetch() {
            try {
                console.log("status", status)
                let res = await axios.get('/api/auth/profile');
                console.log(res.data, "logo");
                setProfile(res.data.profile);
            } catch (err) {
                console.log(err.message);
            }
        }

        Fetch();

    }, [status])


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
                <div onClick={() => DownWindow(false, "/")} className={`nav ${navi === "/" ? "active-nav" : ""}`}  >Home</div>
                <div onClick={() => DownWindow(false, "/my-bookings")} className={`nav ${navi === "/my-bookings" ? "active-nav" : ""}`} >Bookings</div>
                { profile && profile.role === 'admin' && <div onClick={() => DownWindow(false, "/dashboard")} className={`nav ${navi === "/dashboard" ? "active-nav" : ""}`} >Dashboard</div> }
            </div>
        )
    }

    function DownWindow(wind, path) {
        setDown1(wind)
        if (path) {
            router.push(path)
            setNavi(path)
        }


    }

    const DownWindowTag = () => {

        return (

            <div className={`${down1 ? "flex" : "hidden"} absolute z-2 h-full w-full bg-(--color1)  flex-col items-center top-0 left-0 p-4 gap-4`}  >
                <div onClick={() => DownWindow(false, "/")} className={`nav ${navi === "/" ? "active-nav" : ""}`}  >Home</div>
                <div onClick={() => DownWindow(false, "/my-bookings")} className={`nav ${navi === "/my-bookings" ? "active-nav" : ""}`} >Bookings</div>
                { profile && profile.role === 'admin' && <div onClick={() => DownWindow(false, "/dashboard")} className={`nav ${navi === "/dashboard" ? "active-nav" : ""}`} >Dashboard</div> }
            </div>
        )
    }

    const info = {
        SmallScreenTag, LargeScreenTag, DownWindowTag, DownWindow, profile, session_status: status
    }

    return (
        <Navcontext.Provider value={info} >
            {children}
        </Navcontext.Provider>
    );
};


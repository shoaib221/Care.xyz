"use client"

import React, { useEffect, useState } from 'react';
import { FaGraduationCap } from "react-icons/fa6";
import { useNavContext } from './context';
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { getSession } from './SessionHook';
import { useSession } from 'next-auth/react';


export const Logo = () => {
    return (
        <div className='h-12 text-(--color4) flex gap-2' >
            <FaGraduationCap className='h-full text-2xl' />
            <div className='cen-ver font-black' >ScholarStream</div>
        </div>
    )
};


const ProfileLogo = () => {
    const { data: session, status } = useSession()

    if (status === 'loading') return <p>Loading...</p>

    if (session.user) return (
        <div>Logout</div>
    )

    return (

        <button onClick={() => navigate("/auth")} className='button-1234' >
            Login
        </button>

    )

}


export const Nav = () => {
    const [session, setSession] = useState(null);
    const { LargeScreenTag, SmallScreenTag } = useNavContext();

    

    return (
        <div className='flex justify-between' >
            <Logo />

            <LargeScreenTag />
            <SmallScreenTag />

            <ProfileLogo />
            
        </div>
    )
}
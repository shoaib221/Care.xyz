"use client"

import React, { useEffect, useState } from 'react';
import { FaStethoscope } from "react-icons/fa";
import { useNavContext } from './context';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';



export const Logo = () => {
    return (
        <div className='h-12 text-(--color4) flex gap-2 items-center' >
            <FaStethoscope className='h-full text-2xl' />
            <div className='cen-ver font-black text-2xl' >Care.in</div>
        </div>
    )
};


const ProfileLogo = () => {
    const { data: session, status } = useSession()
    const router = useRouter()


    if (status === 'loading') return <p>Loading...</p>

    function SignOut(e) {
        signOut()
    }

    if (session?.user) return (

        <div className='flex'  >
            {/* <div className='button-1234' onClick={SignOut}>Sign Out</div> */}
            {/* { JSON.stringify( session ) } */}
            <Image
                src={session?.user?.image}
                alt='Profile Photo'
                width={48}
                height={12}
                className='rounded-full cursor-pointer'
                title={session.user.email}
            />
            
        </div>
    )

    return (
        <button className='button-1234' onClick={async () => {
            await signOut({ redirect: false });
            router.push('/api/auth/register');
        }}  >
            Sign Up
        </button >
    )

}


export const Nav = () => {
    const [session, setSession] = useState(null);
    const { LargeScreenTag, SmallScreenTag } = useNavContext();



    return (
        <div className='flex justify-between items-center px-4 py-2' >
            <Logo />

            <LargeScreenTag />
            <SmallScreenTag />

            <ProfileLogo />

        </div>
    )
}
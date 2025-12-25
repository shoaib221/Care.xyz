"use client"

import React, { useEffect, useState } from 'react';
import { FaStethoscope } from "react-icons/fa";
import { useNavContext } from './context';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loading } from '@/miscel/Loading'
import axios from 'axios';


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
    const [ profile, setProfile ] = useState(null)

    useEffect(() => {
        console.log("logo", status)
        if (status !== 'authenticated') return;



        async function Fetch() {
            try {
                console.log("status", status)
                let res = await axios.get('/api/auth/profile');
                console.log(res.data , "logo" );
                setProfile(res.data.profile);
            } catch (err) {
                console.log(err.message);
            }
        }

        Fetch();

    }, [status])

    if (status === 'loading') return <Loading />

    function SignOut(e) {
        signOut()
    }

    if (profile) return (

        <div className='flex' onClick={ () =>  router.push( "/profile" ) } >
            {/* <div className='button-1234' onClick={SignOut}>Sign Out</div> */}
            {/* { JSON.stringify( session ) } */}
            <Image
                src={profile.photo}
                alt='Profile Photo'
                width={36}
                height={36}
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
            <ToastContainer />

            <LargeScreenTag />
            <SmallScreenTag />

            <ProfileLogo />

        </div>
    )
}
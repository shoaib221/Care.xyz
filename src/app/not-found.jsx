"use client"

import { useRouter } from 'next/navigation';

import React from 'react';

const NotFound = () => {
    const  rouetr  = useRouter()

    return (
        <div className='gap-2 flex-1 flex flex-col justify-center items-center' >
            <div className='text-3xl text-(--color5) font-bold' >Incorrect URL</div>
            <button className='bg-(--color4) text-white p-2 rounded-lg' 
                onClick={ () => rouetr.push('/') }
            > Got To Home </button>
        </div>
    );
};

export default NotFound;
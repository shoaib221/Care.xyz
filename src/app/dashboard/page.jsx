"use client"

import { useSession } from 'next-auth/react';
import React from 'react';
import { AdminDash, UserDashboard } from './comp';
import { useNavContext } from '@/Nav/context';
import { ForbiddenAccess } from '@/miscel/ForbiddenAccess';


const Page = () => {
    const { profile } = useNavContext()

    if( profile?.role === 'admin' ) return <AdminDash/>
    
    return <ForbiddenAccess />
};

export default Page;
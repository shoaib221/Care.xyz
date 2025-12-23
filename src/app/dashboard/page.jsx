"use client"

import { useSession } from 'next-auth/react';
import React from 'react';
import { AdminDash, UserDashboard } from './comp';

const Page = () => {
    const { data: session, status } = useSession()

    if( session?.user?.role === 'admin' ) return <AdminDash/>
    
    return <UserDashboard/>
};

export default Page;
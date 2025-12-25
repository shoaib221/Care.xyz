"use client"

import { useRouter, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavContext } from '@/Nav/context';
import { Loading2 } from '@/miscel/Loading';



const Page = () => {
    const { service_id } = useParams();
    const [service, setService] = useState(null)
    const router = useRouter()
    const { DownWindowTag } = useNavContext()

    useEffect(() => {
        async function fetchService() {
            try {
                const res = await axios.get(`/api/caregiving/service/${service_id}`);
                const service = await res.data.service;
                setService(service);
            } catch(err) {
                console.error(err)
            }
        }

        if (service_id) fetchService();

    }, [service_id])

    if(!service) return <Loading2/>

    return (
        <div className='flex-1 w-full max-w-150 mx-auto p-2 relative' >
            <DownWindowTag />
            <div style={{ backgroundImage: `url(${service?.image})` }} 
                className='w-full h-60 bg-cover bg-top bg-no-repeat'
            >
                
            </div>

            <div className='text-2xl text-center text-(--color4) font-bold' > { service?.name } </div>
            <br/>
            
            <div className='text-justify w-full' >
                { service?.description }
            </div>
            <br/>

            <div className='font-bold text-lg text-center' > Availability </div>
            <div className='text-center w-full' >
                { service?.availability }
            </div>

            <br/>
            <div className='text-lg text-(--color4) font-bold text-center' >Cost Per Hour</div>
            <div className='text-center' > { service?.costPerHour } USD</div>

            <br/>
            <button 
                className=' gradbtn-1 w-full mx-auto block'
                onClick={ () => router.push( `/booking/${service_id}` ) } > Book </button>
        </div>
    );
};

export default Page;
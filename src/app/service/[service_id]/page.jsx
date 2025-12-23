"use client"

import { useRouter, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';



const Page = () => {
    const { service_id } = useParams();
    const [service, setService] = useState(null)
    const router = useRouter()

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

    return (
        <div className='flex-1 w-full max-w-150 mx-auto p-4' >
            <div style={{ backgroundImage: `url(${service?.image})` }} 
                className='w-full h-60 bg-contain bg-center bg-no-repeat'
            >
                
            </div>

            <div className='text-2xl text-center text-(--color4) font-bold' > { service?.name } </div>
            <br/>
            <div className='text-lg text-(--color4) font-bold text-center' >Description</div>
            <div className='text-justify' >
                { service?.description }
            </div>
            <br/>

            <div className='font-bold text-lg text-center' > Availability </div>
            <div className='text-center' >
                { service?.availability }
            </div>

            <br/>
            <div className='text-lg text-(--color4) font-bold text-center' >Cost Per Hour</div>
            <div className='text-center' > { service?.costPerHour } USD</div>

            <br/>
            <button 
                className='w-[90%] gradbtn-1 max-w-90 mx-auto block'
                onClick={ () => router.push( `/booking/${service_id}` ) } > Book </button>
        </div>
    );
};

export default Page;
"use client"

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useNavContext } from '@/Nav/context';


const Booking = ( { booking } ) => {
    const [ opener, setOpener ] = useState(false)

    return (
        <div className='box-shadow-1 mx-2  my-1 rounded-lg bg-(--color4) text-white' >
            <div className='justify-between p-2 flex cursor-pointer' onClick={ () => setOpener( prev => !prev ) } >
                <div  >
                    <div> { booking.service.name } </div>
                    
                </div>

                { opener ? <IoIosArrowUp /> : <IoIosArrowDown /> } 
                
            </div>

            {
                opener && <div className='bg-(--color42) text-black p-2' >
                    <div> <span className='font-bold' >Booking Id:</span>   { booking._id }  </div>
                    <div> <span className='font-bold' >Address: </span> { booking.address }  { booking.city }, { booking.district }, { booking.division }. </div>

                    <div> <span className='font-bold' >From: </span> { format( booking.startTime , 'dd MMM yyyy, hh a')  }  </div>
                    <div> <span className='font-bold' > To: </span> { format( booking.endTime , 'dd MMM yyyy, hh a') } </div>
                    <div> <span className='font-bold' > Cost: </span> { booking.totalCost } USD </div>
                    <div> <span className='font-bold' >Booking Status: </span> { booking.status } </div>
                    <div> <span className='font-bold' > Payment Status: </span> { booking.paymentStatus } </div>
                </div>
            }
        </div>
    )
}

const Page = () => {
    const { data: session, status } = useSession();
    const [ bookings, setBookings ] = useState([]);
    const { DownWindowTag } = useNavContext()

    async function Fetch(params) {
        try {
            let res = await axios.get( '/api/my-bookings' )
            console.log( res.data )
            setBookings( res.data.bookings )
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (status === 'loading') return;
        Fetch();
    }, [status])

    return (
        <div className='relative flex-1 flex flex-col gap-2' >
            <DownWindowTag />
            {
                bookings && bookings.map( (elem, _) => <Booking key={_} booking={elem} /> )
            }
        </div>
    );
};

export default Page
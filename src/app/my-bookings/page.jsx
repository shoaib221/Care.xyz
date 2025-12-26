"use client"

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useNavContext } from '@/Nav/context';
import {Loading2} from '@/miscel/Loading';
import { useRouter } from 'next/navigation';


const Booking = ({ booking }) => {
    const [opener, setOpener] = useState(false)
    //console.log( 'booking', booking)
    const router = useRouter()

    async function Checkout() {
        try {
            
            const info = {
                booking
            }
            let res = await axios.post('/api/caregiving/book', info);
            
            router.push(res.data.url)

        } catch (err) {
            console.error(err.message);
            
        }
    }



    return (
        <div className='box-shadow-1 mx-2  my-1 rounded-lg bg-(--color4) text-white' >
            <div className='justify-between p-2 flex cursor-pointer' onClick={() => setOpener(prev => !prev)} >
                <div  >
                    <div> {booking.service.name} </div>

                </div>

                {opener ? <IoIosArrowUp /> : <IoIosArrowDown />}

            </div>

            {
                opener && <div className='bg-(--color42) text-black p-2' >
                    <div> <span className='font-bold' >Booking Id:</span>   {booking._id}  </div>
                    <div> <span className='font-bold' >Address: </span> {booking.address}  {booking.city}, {booking.district}, {booking.division}. </div>

                    <div> <span className='font-bold' >From: </span> {format(booking.startTime, 'dd MMM yyyy, hh a')}  </div>
                    <div> <span className='font-bold' > To: </span> {format(booking.endTime, 'dd MMM yyyy, hh a')} </div>
                    <div> <span className='font-bold' > Cost: </span> {booking.totalCost} USD </div>
                    <div> <span className='font-bold' >Booking Status: </span> {booking.status} </div>
                    <div> <span className='font-bold' > Payment Status: </span> {booking.paymentStatus} 
                        
                     </div>

                    { booking.paymentStatus === 'unpaid' && <button className='bg-(--color4) text-white px-8 cursor-pointer hover:opacity-80 mx-2 py-1 rounded-xl' onClick={Checkout} > Pay </button> } 
                </div>
            }
        </div>
    )
}

const Page = () => {
    const { data: session, status } = useSession();
    const [bookings, setBookings] = useState(null);
    const { DownWindowTag } = useNavContext()



    useEffect(() => {
        if (status === 'loading') return;
        async function Fetch(params) {
            try {
                let res = await axios.get('/api/caregiving/my-bookings')
                console.log(res.data)
                setBookings(res.data.bookings)
            } catch (err) {
                console.log(err)
            }
        }

        Fetch();
    }, [status])

    if(!bookings) return <Loading2 />

    return (
        <div className='relative flex-1' >
            <div className='text-2xl text-(--color4) font-bold px-2' >My Bookings</div>
            <DownWindowTag />
            {
                bookings && <div  >
                 {bookings.map((elem, _) => <Booking key={_} booking={elem} />) }
                 </div>
            }
        </div>
    );
};

export default Page
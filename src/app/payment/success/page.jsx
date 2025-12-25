"use client"

import { useRouter, useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Loading2 } from '@/miscel/Loading';
import { useNavContext } from '@/Nav/context';

let url = "/api/caregiving/after-payment"

const Page = () => {
    
    const router = useRouter();
    const searchParams = useSearchParams();
    const session = useSession()
    const  stripe_session_id = searchParams.get("session_id")
    const [ data, setData ] = useState(null)
    const { DownWindowTag } = useNavContext()

    useEffect(() => {
        if(!stripe_session_id || !session ) return

        console.log("here")

        async function FetchPayment(params) {
            try {
                let res = await axios.post("/api/caregiving/after-payment", { stripe_session_id })
                console.log(res.data)
                setData( res.data )
            } catch (err) {
                console.dir(err)
            }
        }


        FetchPayment()

    }, [stripe_session_id, session])

    if(!data) return <Loading2 />

    return (
        <div className="relative w-full max-w-150 mx-auto" >
            <DownWindowTag />
            <img src="/green-tick.webp" className="h-32" />
            <div className="text-green-800 text-2xl font-bold" >Payment Successful</div>
            <div> Paid Amount: <span className="font-bold" > { data.booking.totalCost } </span>  USD  </div>
            <div>Transaction Reference: <span className="font-bold" > { data.booking.transId } </span> </div>
            <div> Booking ID: <span className="font-bold" > { data.booking._id.toString() } </span> </div>
            <br/>
            <div className="font-bold text-lg" >Service</div>
            <div> { data.service.name } </div>
            
            

            <br/>
            <div className="font-bold text-lg" >Booker</div>
            <div> { data.booker.name } </div>
            <div className="text-gray-600" > { data.booker.username } </div>
            <br/>

            <button className="button-2" onClick={ () => router.push('/my-bookings') } >Bookings</button>
        </div>
    );
};




export default Page;
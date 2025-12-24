"use client"

import { useRouter, useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

let url = "/api/caregiving/after-payment"

const Page = () => {
    
    const router = useRouter();
    const searchParams = useSearchParams();
    const session = useSession()

    const  session_id = searchParams.get("session_id")

    console.log(session_id)

    


    useEffect(() => {
        if(!session_id || !session ) return

        console.log("here")

        async function FetchPayment(params) {
            try {
                let res = await axios.post("/api/caregiving/after-payment", { session_id })
                console.log(res.data)
            } catch (err) {
                console.dir(err)
            }
        }


        FetchPayment()

    }, [session_id, session])

    if(!session_id) return null

    return (
        <div>
            Payment Successful
        </div>
    );
};

export default Page;
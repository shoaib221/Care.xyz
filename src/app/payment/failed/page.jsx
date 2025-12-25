import { Loading2 } from '@/miscel/Loading';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const Page = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const session = useSession()
    const stripe_session_id = searchParams.get("session_id")
    const [data, setData] = useState(null)




    useEffect(() => {
        if (!stripe_session_id || !session) return

        console.log("here")

        async function FetchPayment(params) {
            try {
                let res = await axios.post("/api/caregiving/after-payment", { stripe_session_id })
                console.log(res.data)
                setData(res.data)
            } catch (err) {
                console.dir(err)
            }
        }


        FetchPayment()

    }, [stripe_session_id, session])

    if (!data) return <Loading2 />


    return (
        <div className="w-full max-w-150 mx-auto" >
            <img src="/red-cross.jpg" className="h-32" />
            <div className="text-red-800 font-bold text-2xl" >Payment Failed</div>
            {/* <div>Status: { status }</div> */}
            <div> Payable Amount: <span className="font-bold" > {data.booking.totalCost} </span> USD  </div>
            <div> Booking ID: <span className="font-bold" > {data.booking._id} </span> </div>


            <br />
            <div className="font-bold text-lg" >Service</div>
            <div> {data.service.name} </div>
            
            

            <br />
            <div className="font-bold text-lg" >Booked by</div>
            <div> {data.booker.name} </div>
            <div className="text-gray-600" > {data.booker.username} </div>
            <br />

            <button className="button-2" onClick={() => router.push('/my-bookings') } >Bookings</button>
        </div>
    );
};

export default Page;
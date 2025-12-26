import { useNavContext } from '@/Nav/context';
import axios from 'axios';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { toast } from 'react-toastify';



const Booking = ({ booking }) => {

    const [opener, setOpener] = useState(false)
    //console.log( 'booking', booking)
    const router = useRouter()

    async function Confirm() {
        try {
            
            const info = {
                booking: { ...booking, status: 'confirmed' }
            }
            let res = await axios.post('/api/caregiving/bookings', info);
            
            toast.success("Booking Confirmed")

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

                    { booking.paymentStatus === 'paid' && booking.status === 'pending' && <button className='bg-(--color4) text-white p-4 cursor-pointer hover:opacity-80 my-2 py-1 rounded-xl' onClick={Confirm} > Confirm </button> } 
                </div>
            }
        </div>
    )
}


export const AdminDash = () => {
    const [ board, setBoard ] = useState('profile');
    const [ bookings, setBookings ] = useState(null);
    const { DownWindowTag } = useNavContext()

    useEffect(() => {

        async function FetchBookings() {
            try {
                let res= await axios.get('/api/caregiving/bookings')
                setBookings( res.data.bookings )
            } catch(err) {
                console.log( err.message )
            }
        }

        FetchBookings()


    }, [])
    

    return (
        <div className='flex-1 relative' >
            <DownWindowTag />
            <div className='flex gap-2 p-2' >
                <div className='p-2 bg-(--color4) text-white rounded-lg cursor-pointer hover:opacity-80' >Bookings</div>
            </div>

            

            <div>
                { bookings && bookings.map( (elem, _) => <Booking key={_} booking={elem} /> ) }
            </div>

        </div>
    );
};



export const UserDashboard = () => {

    return (
        <div>
            User dashboard
        </div>
    )
}

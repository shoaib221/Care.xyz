"use client"

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useNavContext } from '@/Nav/context';
import { Loading2 } from '@/miscel/Loading';


const DateX = ({ set }) => {

    const [time, setTime] = useState(null);

    useEffect(() => {

        async function Do(params) {
            const now = new Date();
            setTime({
                year: now.getFullYear(),
                month: now.getMonth() + 1,
                date: now.getDate(),
                hour: now.getHours(),
            });
        }

        Do()

    }, []);



    useEffect(() => {
        if (!time) return
        set(new Date(time.year, time.month - 1, time.date, time.hour))
    }, [time, set])

    if (!time) return null; // prevents mismatch

    return (
        <div className='flex gap-8 justify-center' >
            <label >
                Year <br />
                <input
                    value={time.year} onChange={(e) => setTime(prev => { return { ...prev, year: e.target.value } })}
                    type='number' placeholder='i.g. 2025' className='max-w-24 p-2' />
            </label>

            <label >
                Month <br />
                <input
                    value={time.month} onChange={(e) => setTime(prev => { return { ...prev, month: e.target.value } })}
                    type='number' placeholder='i.g. 11' className='max-w-24 p-2' />
            </label>

            <label >
                Date <br />
                <input
                    value={time.date} onChange={(e) => setTime(prev => { return { ...prev, date: e.target.value } })}
                    type='number' placeholder='i.g. 31' className='max-w-24 p-2' />
            </label>

            <label >
                Hour <br />
                <input
                    value={time.hour} onChange={(e) => setTime(prev => { return { ...prev, hour: e.target.value } })}
                    type='number' placeholder='i.g. 19' className='max-w-24 p-2' />
            </label>

        </div>
    )
}

const Page = () => {
    const { service_id } = useParams();
    const [service, setService] = useState(null)
    const router = useRouter()
    const { DownWindowTag } = useNavContext()

    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())
    const [totalHour, setTotalHour] = useState(0)
    const [totalCost, setTotalCost] = useState(0)
    const [location, setLocation] = useState({
        division: "", district: "", city: "", address: ""
    })



    useEffect(() => {

        async function Do(params) {
            let amount = (endTime - startTime) / 3600000;
            if (amount >= 0) {
                setTotalHour(amount);
                amount *= (service ? service.costPerHour : 0);
                setTotalCost(amount);
            }
            else {
                setTotalHour(0)
                setTotalCost(0)
            }
        }
        Do();
    }, [startTime, endTime, service])


    useEffect(() => {
        async function fetchService() {
            try {
                const res = await axios.get(`/api/caregiving/service/${service_id}`);
                const service = await res.data.service;
                setService(service);
            } catch (err) {
                console.error(err)
            }
        }

        if (service_id) fetchService();

    }, [service_id])


    async function Checkout(params) {
        try {
            if (!location.division || !location.district || !location.city || !location.address || !totalHour) {
                alert('fill all the fields correctly')
                return
            }
            const info = {
                startTime, endTime, totalCost, ...location, service_id,
            }
            let res = await axios.post('/api/caregiving/book', info);
            
            router.push(res.data.url)

        } catch (err) {
            console.error(err.message);
            
        }
    }

    if(!service) return <Loading2 />

    return (
        <div className='flex-1 w-full max-w-150 mx-auto p-2 relative' >
            <DownWindowTag />


            <div className='text-2xl text-center text-(--color4) font-bold' >Book for {service?.name} </div>
            <br />


            {/* Location */}
            <div className='text-lg text-center text-(--color4) font-bold' >Your Location</div>



            <label>
                <div className='font-bold' >Division</div>
                <input placeholder='Your division' value={location.division}
                    onChange={(e) => setLocation({ ...location, division: e.target.value })}
                    className='w-full p-2'
                ></input>
            </label>

            <label>
                <div className='font-bold' > District </div>
                <input placeholder='Your district' value={location.district}
                    onChange={(e) => setLocation(prev => { return { ...prev, district: e.target.value } })}
                    className='w-full p-2'
                ></input>
            </label>

            <label>
                <div className='font-bold' > City </div>
                <input placeholder='Your city' value={location.city}
                    onChange={(e) => setLocation({ ...location, city: e.target.value })}
                    className='w-full p-2'
                ></input>
            </label>



            <label>
                <div className='font-bold' > House Address </div>
                <input placeholder='Your address' value={location.address}
                    onChange={(e) => setLocation({ ...location, address: e.target.value })}
                    className='w-full p-2'
                ></input>
            </label>

            <br /><br />

            <div className='text-lg text-center text-(--color4) font-bold' >Booking Time</div>

            <div className='font-bold' > Start hour </div>

            <DateX set={setStartTime} />



            <div className='font-bold' > End hour </div>
            <DateX set={setEndTime} />


            <div className='font-bold' > Total Hour {totalHour} </div>

            
             

            <br />
            <button
                className='w-full gradbtn-1 mx-auto block'
                onClick={Checkout} > Checkout ($ {totalCost}) </button>
        </div>
    );
};

export default Page;
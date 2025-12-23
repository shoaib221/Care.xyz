"use client"

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';


const DateX = ({ set }) => {

    const [time, setTime] = useState({ year: 2025, month: 1, date: 1, hour: 12 })

    useEffect(() => {
        set(new Date(time.year, time.month - 1, time.date, time.hour))
    }, [time, set])

    return (
        <div className='flex gap-2 ' >
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

    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())
    const [totalHour, setTotalHour] = useState(0)
    const [totalCost, setTotalCost] = useState(0)
    const [location, setLocation] = useState({
        division, district, city, address
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
            const info = {
                startTime, endTime, totalCost, ...location, service_id,
            }
            let res = await axios.post('/api/caregiving/book' , info );

        } catch(err) {
            console.error(err);
        }
    }


    return (
        <div className='flex-1 w-full max-w-150 mx-auto p-4' >
            <div style={{ backgroundImage: `url(${service?.image})` }}
                className='w-full h-60 bg-contain bg-center bg-no-repeat'
            >

            </div>

            <div className='text-xl text-center text-(--color4) font-bold' >Book for {service?.name} </div>
            <br />

            <div>Your Location</div>

            <label>
                <div>Division</div>
                <input  ></input>
            </label>

            <label>
                <div> District </div>
                <input></input>
            </label>

            <label>
                <div> City </div>
                <input></input>
            </label>

            <label>
                <div> House Address </div>
                <input></input>
            </label>

            <div>
                Start hour
                <DateX set={setStartTime} />

            </div>


            <div>
                End hour
                <DateX set={setEndTime} />
            </div>

            <div>Total Hour {totalHour} </div>

            <div>Total Cost</div>
            <div> {totalCost} </div>

            <br />
            <button
                className='w-[90%] gradbtn-1 max-w-90 mx-auto block'
                onClick={() => router.push(`/booking/${service_id}`)} > Checkout </button>
        </div>
    );
};

export default Page;
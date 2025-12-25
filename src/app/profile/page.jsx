"use client"

import { useNavContext } from '@/Nav/context';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import { Loading2 } from '@/miscel/Loading';
import { toast } from 'react-toastify';


const Page = () => {
    const [profile, setProfile] = useState(null)
    const { data: session, status } = useSession()
    const { DownWindowTag } = useNavContext()

    useEffect(() => {
        console.log("status", status)
        if (status !== 'authenticated') return;



        async function Fetch() {
            try {
                console.log("status", status)
                let res = await axios.get('/api/auth/profile');
                console.log(res.data);
                setProfile(res.data.profile);
            } catch (err) {
                console.log(err.message);
            }
        }

        Fetch();

    }, [status])

    async function Update() {
        console.log( profile )
        try {
            let res = await axios.post('/api/auth/profile' , profile);
            toast.success("Updated Successfully")
            
        } catch(err) {

        }

    }

    if (!profile) return <Loading2 />;

    return (
        <div className='flex-1 relative w-full max-w-150 mx-auto' >
            <DownWindowTag />



            <div className='h-32 w-32 lg:h-48 lg:w-48 rounded-full bg-cover bg-top mx-auto'
                style={{ backgroundImage: `url(${profile.photo})` }} >

            </div>

            <div className='text-center text-2xl text-(--color4) font-bold my-4' >
                {profile.username}
                <span className='font-normal text-gray-600 text-[1rem]' > {profile.role} </span>
            </div>

            <button className='text-sm block mx-auto bg-(--color5) text-white p-2 rounded-lg cursor-pointer hover:opacity-85' onClick={() => signOut()} >Sign Out</button>

            <br/>
            <div className='grid grid-cols-4' >
                <div className='cen-ver font-bold' >
                    Name
                </div>

                <input
                    value={profile.name} onChange={(e) => setProfile(prev => { return { ...prev, name: e.target.value } })}                    
                    placeholder='Your name' className='col-span-3 input-1' >

                </input>


                {/* Photo */}
                <div className='cen-ver font-bold' >
                    Photo URL
                </div>

                <input name='name' 
                    value={profile.photo} onChange={(e) => setProfile(prev => { return { ...prev, photo: e.target.value } })}
                    placeholder='Your photo url' className='col-span-3 input-1' >
                </input>


                {/* Contact */}
                <div className='cen-ver font-bold' >
                    Contact
                </div>

                <input 
                    value={profile.contact} onChange={(e) => setProfile(prev => { return { ...prev, contact: e.target.value } })}
                    name='name' placeholder='Your contact' className='col-span-3 input-1' ></input>

                {/* Address */}
                <div className='cen-ver font-bold' >
                    Address
                </div>

                <input 
                    value={profile.address} onChange={(e) => setProfile(prev => { return { ...prev, address: e.target.value } })}
                    name='name' placeholder='Your address' className='col-span-3 input-1' ></input>

                {/* Bio */}

                <div className='cen-ver font-bold' >
                    Bio
                </div>

                <textarea 
                    value={profile.bio} onChange={(e) => setProfile(prev => { return { ...prev, bio: e.target.value } })}
                    name='name' placeholder='Your bio' rows={3} className='col-span-3 resize-none input-1' >
                    
                </textarea>

            </div>

            <br />

            <button className='gradbtn-1 w-full' onClick={Update} > Update </button>

            <br/> <br/>

        </div>
    );
};

export default Page;   
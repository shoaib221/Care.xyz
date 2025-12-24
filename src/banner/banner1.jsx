"use client"

import React from 'react';
import { useState, useEffect } from 'react';
import './banner1.css';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { motion } from 'framer-motion';


export const Banner1 = () => {
    const ids = ["img1", "img2", "img3"];
    const [index, setIndex] = useState(0);
    

    const leftSlide = () => {

        setIndex(prev => (prev - 1 + ids.length) % ids.length)

        //console.log("left slide", index)
    }

    const rightSlide = () => {
        setIndex(prev => (prev + 1) % ids.length)
    }


    useEffect(() => {
        const interval = setInterval(() => {

            leftSlide()
        }, 4000);

        // Cleanup on unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='w-full bg-white' >
            <div id={ids[index]} className='relative h-80 lg:h-100  bg-contain bg-center bg-no-repeat'   >
                {/* <button onClick={leftSlide} className="absolute top-[10%] left-4 w-12 h-[80%] bg-white/50 text-5xl"  >
                    <MdKeyboardArrowLeft />
                </button>

                <button onClick={rightSlide} className="absolute top-[10%] right-4 w-12 h-[80%] bg-white/50 text-5xl"  >
                    <MdKeyboardArrowRight />
                </button> */}
            </div>

            <br/>

            



            

        </div>
    )
};


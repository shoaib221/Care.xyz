"use client"

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/free-mode";
// import './slide1-style.css'
import { useEffect, useRef, useState } from "react";


export function InfiniteSlider() {




    return (
        <div className="w-full p-4 h-60">
            <div className="text-center text-black font-bold" >Our Services</div>

            <Swiper

                className="h-full"
                modules={[Autoplay, FreeMode]}
                freeMode={true}
                loop={true}
                speed={3000}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                }}
                slidesPerView="auto"
                spaceBetween={20}
                allowTouchMove={false}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    480: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                }}
            >

                <SwiperSlide  className="h-full" >
                    <div
                        className="slide-item text-outline-123 border"
                    >

                    </div>
                </SwiperSlide>

                <SwiperSlide  className="h-full" >
                    <div
                        className="slide-item text-outline-123 border"
                    >

                    </div>
                </SwiperSlide>

                <SwiperSlide  className="h-full" >
                    <div
                        className="slide-item text-outline-123 border"
                    >

                    </div>
                </SwiperSlide>

                <SwiperSlide  className="h-full" >
                    <div
                        className="slide-item text-outline-123 border"
                    >

                    </div>
                </SwiperSlide>
                <SwiperSlide  className="h-full" >
                    <div
                        className="slide-item text-outline-123 border"
                    >

                    </div>
                </SwiperSlide>

            </Swiper>
        </div>
    );
}
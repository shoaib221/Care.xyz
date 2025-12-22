import { UserCard } from "@/card/compo";
import { TrumpCard } from "@/card/TrumpCard";
import Image from "next/image";
import { Banner1 } from "@/banner/banner1";
import { InfiniteSlider } from "@/swiper/slide1";
import { ScrollProduct } from "@/slide/slide1";


export default async function Home() {

	return (
		<div className="flex flex-col flex-1 items-center justify-center bg-white font-sans">
			
			<Banner1 />


			<InfiniteSlider />

			<ScrollProduct />
		</div>
	);
}


// 1. Homepage
// ·       Banner / Slider with caregiving Motivation
// ·       About section explaining platform mission
// ·       Services overview: Baby Care, Elderly Service, Sick People Service
// ·       Testimonials / Success metrics

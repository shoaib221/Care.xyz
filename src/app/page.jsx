"use client"

import { Banner1 } from "@/banner/banner1";
import { ScrollProduct } from "@/slide/slide1";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useNavContext } from "@/Nav/context";
import { Loading } from '@/miscel/Loading'



export default function Home() {

	const [services, setServices] = useState(null)
	const router = useRouter()
	const { DownWindowTag } = useNavContext()

	useEffect(() => {

		async function fetch() {
			try {
				let res = await axios.get('/api/caregiving/service')
				console.log(res.data.services)
				setServices(res.data.services)
			} catch (err) {
				console.log(err)
			}

		}

		fetch()

	}, [])

	return (
		<div className="relative flex flex-col flex-1 items-center justify-center bg-white font-sans overflow-auto">
			<DownWindowTag />
			<Banner1 />

			<div className="text-2xl text-(--color4) font-bold" > About Us</div>

			<div className='relative overflow-hidden p-4 text-justify px-8 text-lg' >
				We are dedicated to making quality care accessible, reliable, and compassionate for every family. Our platform connects individuals with trained and trusted caregivers who provide professional nursing, elderly care, and babysitting services—right at your doorstep.

				We understand that caring for a loved one is deeply personal. That’s why we focus not only on skills and experience, but also on empathy, responsibility, and respect. Every caregiver on our platform goes through a careful screening process to ensure safety, professionalism, and peace of mind for families.

				Whether you need short-term assistance, long-term nursing support, or a caring babysitter you can trust, we make the process simple and transparent. From easy booking to flexible scheduling, our goal is to remove stress and help you focus on what truly matters—your loved ones.

				Driven by technology and guided by compassion, we aim to raise the standard of home care services. We believe everyone deserves dignity, comfort, and attentive care, regardless of age or condition.

				With us, you’re not just hiring a service—you’re choosing care you can trust.
			</div>


			<br />

			<div className="text-2xl text-(--color4) font-bold" > Our Services</div>
			<br />

			<div className="flex flex-wrap gap-4 justify-evenly" >
				{services ? services.map(elem => (
					<div onClick={() => router.push(`/service/${elem._id}`)}
						title="Show Detail"
						key={elem._id} className="p-2 rounded-lg box-shadow-1 min-w-64  cursor-pointer" >

						<div style={{ backgroundImage: `url(${elem.image})` }} className="h-40 bg-cover" ></div>
						<div className="font-bold" > {elem.name} </div>
					</div>
				)) : <Loading /> }


			</div>

			<br /><br />

			<ScrollProduct />
		</div>
	);
}


// 1. Homepage
// ·       Banner / Slider with caregiving Motivation
// ·       About section explaining platform mission
// ·       Services overview: Baby Care, Elderly Service, Sick People Service
// ·       Testimonials / Success metrics

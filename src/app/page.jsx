"use client"

import { Banner1 } from "@/banner/banner1";
import { ScrollProduct } from "@/slide/slide1";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";




export default  function Home() {

	const [ services, setServices ] = useState(null)
	const router = useRouter()

	useEffect(() => {

		async function fetch() {
			try {
				let res  =  await axios.get( '/api/caregiving/service' )
				console.log( res.data.services )
				setServices( res.data.services )
			} catch(err) {
				console.log(err)
			}
			
		}

		fetch()

	}, [])

	return (
		<div className="flex flex-col flex-1 items-center justify-center bg-white font-sans overflow-auto">
			
			<Banner1 />


			<br/>

			<div className="text-2xl text-(--color4) font-bold" > Our Services</div>
			<br/>

			<div className="flex flex-wrap gap-4 justify-evenly" >
				{ services && services.map( elem => (
					<div onClick={ () => router.push(`/service/${elem._id}`) }
						title="Show Detail"
						key={elem._id} className="p-2 rounded-lg box-shadow-1 min-w-64  cursor-pointer" >

							<div style={{ backgroundImage: `url(${ elem.image })` }} className="h-40 bg-cover" ></div>
							<div className="font-bold" > { elem.name } </div>
					</div>
				) ) }
				
				
			</div>

			<br/><br/>

			<ScrollProduct />
		</div>
	);
}


// 1. Homepage
// ·       Banner / Slider with caregiving Motivation
// ·       About section explaining platform mission
// ·       Services overview: Baby Care, Elderly Service, Sick People Service
// ·       Testimonials / Success metrics

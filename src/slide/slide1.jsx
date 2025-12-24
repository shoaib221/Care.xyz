const Story = ({ story }) => {

    return (
        <div className='flex flex-col justify-between px-2 md:min-w-80  min-w-60
                        bg-(--color4) hover:bg-(--color4)/80 text-white p-2'  >

            <div className="flex-1 text-justify" >
                {story.comment}
            </div>

            <div className="flex gap-2 items-end" >
                <div className={`w-18 h-18 rounded-full  bg-cover bg-top`} style={{ backgroundImage: `url(${story.image})` }} />
                <div className="text-sm" >
                    {story.name} <br />
                    {story.scholarship} <br />
                    {story.university}
                </div>
            </div>

        </div>
    )
}


const stories = [
    {
        name: "Ayesha Rahman",
        image: "https://tse1.mm.bing.net/th/id/OIP.cV42tAwuBoNSAYftNEgzXAHaEo?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        scholarship: "Nursing",
        comment:
            "I booked a home nurse for my father, and the experience exceeded expectations. The nurse was skilled, punctual, and compassionate. Our family finally felt relaxed knowing he was in capable hands."
    },
    {
        name: "Daniel Kim",
        image: "https://tse3.mm.bing.net/th/id/OIP.i4YH9hPP_yM3nXMIQDDkQwHaLL?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        scholarship: "Elderly Care",
        comment: "The caregiver was extremely professional, patient, and caring. My mother felt safe and respected throughout the service. Communication was excellent, and everything was handled smoothly from booking to completion."
    },
    {
        name: "Maria Gonzalez",
        image: "https://tse1.mm.bing.net/th/id/OIP.4Gt3RAPOCnNj9enH1r6prAHaI-?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        scholarship: "Baby Sitting",
        comment:
            "Finding a trustworthy babysitter was always stressful, but this platform made it easy. The sitter was kind, attentive, and responsible, which gave us complete peace of mind during our absence"
    },
    {
        name: "Joshua Patel",
        image: "https://tse1.explicit.bing.net/th/id/OIP.Ir31nRT7lfY0caGpkbec3gHaLH?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        scholarship: "Baby Sitting",
        comment:
            "From the first contact to service delivery, everything was well organized. Customer support helped us choose the right caregiver, and the service quality fully matched what was promised online."
    },
    {
        name: "Hana Yamada",
        image: "https://tse1.explicit.bing.net/th/id/OIP.BH6Si47Nt136YsDmFAFuQwHaEx?cb=ucfimg2&ucfimg=1&w=1280&h=824&rs=1&pid=ImgDetMain&o=7&rm=3",
        scholarship: "Nursing",
        comment:
            "The home nurse arrived on time and handled medical care confidently. She explained everything clearly and made my mother comfortable. We are very satisfied with the overall quality and reliability."
    },
    {
        name: "Kevin Brown",
        image: "https://tse1.mm.bing.net/th/id/OIP.P3GWxhGR9Y_K7_-4K1fGRQHaLH?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        scholarship: "Baby Sitting",
        comment:
            "Affordable pricing combined with excellent service quality. The babysitter was caring, friendly, and experienced. My child felt comfortable quickly, which is the most important thing for any parent."
    },
    {
        name: "Fatima Noor",
        image: "https://img.freepik.com/premium-photo/bangladeshi-female-student-black-graduation-gown_606460-87.jpg?w=2000",
        scholarship: "Elderly Care",
        comment:
            "The caregiver was respectful, attentive, and well trained. Our elderly family member received both physical support and emotional care, making a noticeable positive difference in daily life."
    },
    {
        name: "Liam Anderson",
        image: "https://media.istockphoto.com/id/171299141/photo/englishman.jpg?s=1024x1024&w=is&k=20&c=FtS_bl0R7qNDr4ECv4RFDq895gzplUlM1kWA1Rjmk54=",
        scholarship: "Baby Sitting",
        comment:
            "This service has been a huge relief for our family. Finding qualified caregivers used to be difficult, but now we feel confident, supported, and secure whenever we need home care assistance."
    }
];


export const ScrollProduct = () => {


    return (
        <>
        <div className="text-2xl font-bold text-(--color4)" >Hear From Our Clients</div>
        <div className='flex overflow-auto h-96 gap-2 w-[95%] p-4 box-shadow-1 my-4 rounded-lg' >
            {stories && stories.map((story, index) => <Story key={index} story={story} />)}
        </div>
        </>
    )
}
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"



export const getSession = async () => {
    const session = await getServerSession(authOptions)

    return session;

}


// export const ProfileLogo = async () => {
//     const session = await getServerSession(authOptions)

//     if (session.user)
//         return (
//             <div className='cursor-pointer h-12 w-12 rounded-full relative bg-cover bg-center z-3' title={user.email} onClick={Opener1} style={{ backgroundImage: `url(${user.photoURL})`, border: '.1rem solid var(--color2)' }}  >
//                 <div className={`box-shadow-1 bg-(--color4) text-(--color1) absolute flex-col p-2 rounded-xl w-[10rem] right-[0%] top-[105%] z-4 ${opener1 ? "flex" : "hidden"}`} style={{ border: '1px solid var(--color2)' }} >
//                     {/* <div onClick={ ()=> navigate('/profile')} className='p-1 text-center w-full'  >Profile</div>
//                         <Breaker />
//                         <Theme /> */}

//                     <div onClick={() => navigate('/dashboard')} className='p-1 text-center w-full'  >Dashboard</div>
//                     {/* <Breaker />
//                     <SignOut /> */}

//                 </div>
//             </div>
//         )

//     return (
//         <button onClick={() => navigate("/auth")} className='button-1234' >
//             Login
//         </button>

//     )



// }


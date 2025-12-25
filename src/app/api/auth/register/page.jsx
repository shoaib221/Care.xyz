"use client"


import { Register } from "./method";
import { signIn } from "next-auth/react";


const Page = () => {

    async function handleSubmit(event) {
        event.preventDefault()
        

        let form = event.target;
        console.log(form)
        const info = {
            name: form.name.value,
            email: form.email.value,
            password: form.password.value,
            photo: form.password.value
        }

        try {
            let response = await Register(info)
            if( response.user ) {
                alert(response.message)
                console.log( response.user )
                signIn();
            }

            else alert( response.message );
            
        } catch(err) {
            console.dir(err)

        }
        

        
    }

    return (
        <div className="max-w-150 mx-auto w-full px-12 py-6 flex-1" >
            <div className="text-2xl text-(--color4) text-center font-bold" > Sign Up </div>

            <form className="flex flex-col" onSubmit={handleSubmit} >
                <label>
                    <div className="font-bold" >Name</div>
                    <input name="name" type="text" className="w-full p-2 my-2 rounded-lg" placeholder="Your Name" />
                </label>
                <label>
                    <div className="font-bold" > Email </div>
                    
                    <input name="email" type="email" className="w-full p-2 my-2 rounded-lg" placeholder="Your Email" />
                </label>
                <label>

                    <div className="font-bold" > Password </div>
                    <input name="password" type="password" className="w-full p-2 my-2 rounded-lg" placeholder="Your Password" />
                </label>

                <label>
                    <div className="font-bold" > Image URL </div>
                    <input name="photo" type="text" className="w-full p-2 my-2 rounded-lg" placeholder="Your image url" />
                </label>

                <br/>
                <button className="gradbtn-1" type="submit" >Submit</button>
            </form>
            <br/>

            <div className="text-center" > Already Have an account? <span className="font-bold underline text-(--color4) cursor-pointer" onClick={() => signIn()} >Login</span>  </div>
            {/* <div className="text-center" > Forgot password? <span className="font-bold underline text-(--color4) cursor-pointer text-center"  >Reset</span> </div> */}
        </div>
    )
}


export default Page
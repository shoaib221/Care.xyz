"use client"

import { Register } from "./method";

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
            console.log(response);
        } catch(err) {
            console.dir(err)
        }
        

        
    }

    return (
        <div>
            <form className="flex flex-col" onSubmit={handleSubmit} >
                <label>
                    Name
                    <input name="name" type="text" />
                </label>
                <label>
                    Email
                    <input name="email" type="email" />
                </label>
                <label>
                    Password
                    <input name="password" type="password" />
                </label>

                <label>
                    Image URL
                    <input name="photo" type="text" />
                </label>

                <button type="submit" >Register</button>
            </form>
        </div>
    )
}


export default Page
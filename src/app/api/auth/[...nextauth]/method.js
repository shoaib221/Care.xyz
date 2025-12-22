"use server";

import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/app/api/auth/model";



export const Login = async ( data ) => {

    try {
        await dbConnect();
        console.log(data)
        let user = await User.findOne({ username: data.email })
        

        if( !user ) return null;

        let isOk = await bcrypt.compare( data.password, user.password )

        user = {
            email: user.username,
            name: user.name,
            role: user.role,
            image: user.photo
        }

        if( isOk )
        {
            return user;
        }

        return null;

    } catch(err) {

    }

}
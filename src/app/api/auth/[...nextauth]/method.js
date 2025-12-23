"use server";

import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/app/api/auth/model";



export const Login = async (data) => {
    console.log( "login" )
    try {
        await dbConnect();
        console.log(data)
        let user = await User.findOne({ username: data.email })


        if (!user) return null;

        let isOk = await bcrypt.compare(data.password, user.password)

        user = {
            email: user.username,
            name: user.name,
            image: user.photo,
            role: user.role
        }

        if (isOk) {
            return user;
        }

        return null;

    } catch (err) {
        return null;
    }

}


export const FetchUserData = async (data) => {
    console.log( "FetchUserData" )
    try {
        await dbConnect();
        console.log(data)
        let user = await User.findOne({ username: data.email })

        user = {
            email: user.username,
            name: user.name,
            image: user.photo,
            role: user.role
        }
        return user;
    } catch (err) {
        return null;
    }

}



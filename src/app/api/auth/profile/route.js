"use server"
import { getServerSession } from "next-auth"
import { authOptions } from "../options"
import { User } from "../model"
import { NextResponse } from "next/server"


export const GET = async (req) => {
    try {

        console.log("profile")
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        let profile = await User.findOne({ username: session.user.email });

        return NextResponse.json(
            { profile },
            { status: 200 }
        )



    } catch (err) {
        console.log(err.message)
        return NextResponse.json(
            { error: err.message },
            { status: 400 }
        )
    }
}


export const POST = async (req) => {

    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        let updation = await req.json();

        let updatedProfile = await User.findByIdAndUpdate(
            updation._id,
            {
                $set: updation
            }, 
            { new: true }
        )

        return NextResponse.json(
            { profile: updatedProfile },
            { status: 200 }
        )


    } catch (err) {
        console.log( err.message )
        NextResponse.json(
            { error: err.message },
            { status: 400 }
        )
    }
}
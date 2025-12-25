import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/options'
import { NextResponse } from "next/server";
import { Booking } from '@/app/api/caregiving/model'
import { User } from "@/app/api/auth/model";

import { CreatePayment, AfterPayment } from "../method";


export const POST = async (req) => {

    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        let booker = await User.findOne({ username: session.user.email })

        let body = await req.json();

        let booking = Booking({ ...body, booker_id: booker._id });

        await booking.save();

        

        let res = await CreatePayment(booking)

        console.log("here")
        if (!res.error) {
            return NextResponse.json({
                booking, url: res.url,
            },
                { status: 201 }
            )
        }

        return NextResponse.json({
            
            error: res.error
        }, 
        { status: 400 }
    )

    } catch (err) {
        console.dir(err)
        return NextResponse.json({
            
            error: err.message
            
        }, { status: 400 } )
    }
}
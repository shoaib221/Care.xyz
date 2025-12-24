"use server"

import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/options'
import { NextResponse } from "next/server";
import { Booking, Service } from '@/app/api/caregiving/model'
import { User } from "@/app/api/auth/model";




export const GET = async (req) => {

    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        let booker = await User.findOne({ username: session.user.email })

        let pipeline = []

        pipeline.push(
            {
                $match: {
                    booker_id: booker._id, 
                },
            },
            {
                $lookup: {
                    from: "services",
                    localField: "service_id",
                    foreignField: "_id",
                    as: "service",
                },
            },
            {
                $unwind: "$service",
            }
        )

        let bookings = await Booking.aggregate(pipeline)
        console.log(booker, bookings)
        return NextResponse.json(
            { bookings, booker },
            { status: 200 }
        )



    } catch (err) {
        console.log(err.message)
        return new NextResponse.json(
            { error: err.message },
            { status: 400 }
        )
    }
}
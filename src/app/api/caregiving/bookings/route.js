import { Booking } from "../model";
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/options';
import { NextResponse } from "next/server";
import { User } from "../../auth/model";


export const GET = async (req) => {

    try {

        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        let requester = await User.findOne({ username: session.user.email })

        if (requester.role !== 'admin') {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }

        let pipeline = []

        pipeline.push(
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

        return NextResponse.json(
            { bookings },
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

        let requester = await User.findOne({ username: session.user.email })

        if (requester.role !== 'admin') {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }

        let  { booking }  = await req.json();

        booking = await Booking.findByIdAndUpdate(
            booking._id,
            {$set : booking},
            { new: true }
        )

        return NextResponse.json(
            { booking },
            { status: 200 }
        )

    } catch (err) {
        console.log( err.message )
        return NextResponse.json(
            { error: err.message },
            { status: 400 }
        )
    }

}
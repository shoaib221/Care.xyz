import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/options';
import { NextResponse } from "next/server";
import { Booking } from '@/app/api/caregiving/model';
import { User } from "@/app/api/auth/model";
import { AfterPayment } from "../method";



export const POST = async (req) => {

    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        let body = await req.json();
        let res = await AfterPayment(body);
        
        if( res.error ) {
            return NextResponse.json(
                res,
                { status: 400 }
            )
        }

        return NextResponse.json(
            {...res},
            { status: 200 }
        )


        // return NextResponse.json({
        //     status: 400,
        //     error: res.error,
        //     ok: false
        // })

    } catch (err) {
        console.log( err.message )
        return NextResponse.json({
            
            error: err.message,
            
        }, { status: 400 } )
    }
}
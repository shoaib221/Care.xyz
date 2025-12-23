

import { NextResponse } from "next/server"
import { Service } from "../../model"
import { dbConnect } from "@/lib/dbConnect"

export const GET = async ( req, { params } ) => {
    
    try {
        await dbConnect();
        let { id } = await params
        let service = await Service.findById( id );

        let url = new URL( req.url )
        return NextResponse.json({ service })
    } catch(err) {
        return NextResponse.json({ error: err.message })
    }
}


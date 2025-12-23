"use server"

import { NextResponse } from "next/server"
import { Service } from "../model"
import { dbConnect } from "@/lib/dbConnect"

export const GET = async (req) => {


    try {
        let aha = new URL( req.url )

        await dbConnect();
        let services = await Service.find({})
        return NextResponse.json({ services })
    } catch(err) {
        return NextResponse.json({ error: err.message })
    }
}
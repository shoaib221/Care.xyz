import { NextResponse } from "next/server"
import { Test } from './model.js'
import { dbConnect } from "@/lib/dbConnect.js"


export const GET = async ( req  ) => {

    try {
        await dbConnect();
        let data = await Test.find({})
        return NextResponse.json({
            ...data
        })
    } catch(err) {
        return NextResponse.json({
            error: err.message
        })
    }
    

}
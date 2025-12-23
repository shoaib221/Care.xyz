import { NextResponse } from "next/server"
import { Test } from './model.js'
import { dbConnect } from "@/lib/dbConnect.js"


export const GET = async (req) => {

    try {
        await dbConnect();
        let data = await Test.find({})
        return NextResponse.json({
            ...data
        })
    } catch (err) {
        return NextResponse.json({
            error: err.message
        })
    }
}

export const POST = async (req, data) => {

    try {
        const { searchParams } = new URL(req.url);

        const def = searchParams.get("def");
        

        console.log("request", req)
        console.log("data", data)
        let body = await req.json()
        return NextResponse.json({ msg: 'success post', body, def })
    } catch (err) {

    }

}
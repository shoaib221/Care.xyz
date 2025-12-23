import { NextResponse } from "next/server";



export async function GET(req, data) {
    try {
        let url = new URL(req.url)

        let params = await data.params

        console.log( params, url.searchParams.get('def') )
        return NextResponse.json({  })
    } catch (err) {
        return NextResponse.json({ error: err.message })
    }
}
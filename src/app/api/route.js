import { Test }  from './model'
import { dbConnect } from '@/lib/dbConnect';


export async function GET(request) {

    try {
        await dbConnect();
        const tests = await Test.find({})
        return Response.json({
            status: 200,
            tests
        })
    } catch (err) {
        return Response.json(
            {
                error: err.message
            }
        )
    }
}


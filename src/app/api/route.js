
import { dbConnect } from '@/lib/dbConnect';


export async function GET(request) {

    try {
        await dbConnect();
        
        return Response.json({
            status: 200,
            message: "api running well..."
        })
    } catch (err) {
        return Response.json(
            {
                error: err.message
            }
        )
    }
}


import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"



export const TrumpCard =  async () => {
    const session = await getServerSession(authOptions)

    return (
        <div>
            { JSON.stringify(session) }
        </div>
    )
}
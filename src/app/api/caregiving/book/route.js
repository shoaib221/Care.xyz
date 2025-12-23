import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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

        console.log(body)

        return

    } catch (err) {

    }
}
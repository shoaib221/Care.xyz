import NextAuth from "next-auth";
import { authOptions } from "../options";




// Create handler
const handler = NextAuth(authOptions);

// ✅ Correct exports for App Router
export { handler as GET, handler as POST };

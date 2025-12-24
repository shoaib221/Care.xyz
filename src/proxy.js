import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';


const privateRoutes = ['/private', '/dashboard', '/secret', '/my-bookings'];



export async function proxy(req) {
    // Get the token (if user is logged in)
    console.log("proxy...")
    const token = await getToken({ req });
    const reqPath = req.nextUrl.pathname;
    console.log( token )

    if(!token) return NextResponse.redirect( new URL( '/api/auth/register', req.url ) )

    const isAuthenticated = Boolean(token);
    const isAdmin = token?.role === 'admin';

    // Check if the requested path is protected
    const isPrivate = privateRoutes.some(route => reqPath.startsWith(route));
    // const isAdminRoute = adminRoutes.some(route => reqPath.startsWith(route));

    // Redirect to login if not authenticated
    if (!isAuthenticated && isPrivate) {
        const loginUrl = new URL('/api/auth/register', req.url);
        loginUrl.searchParams.set('callbackUrl', reqPath);
        return NextResponse.redirect(loginUrl);
    }

    // Redirect non-admin users from admin routes
    // if (isAdminRoute && (!isAuthenticated || !isAdmin)) {
    //     return NextResponse.redirect(new URL('/', req.url));
    // }

    // Allow request to continue
    return NextResponse.next();
}

// Apply middleware only to these paths
export const config = {
    matcher: ['/private/:path*', '/secret/:path*', '/dashboard/:path*', '/my-bookings/:path*'  ],
};
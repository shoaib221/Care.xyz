import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const privateRoutes = [ '/private',  '/secret' ];

const adminRoutes = [ '/dashboard' ];

export async function proxy(req) {
    const token = await getToken({ req });
    console.log(token)
    console.log("proxy")
    const reqPath = req.nextUrl.pathname;
    const isAuthenticated = Boolean(token);
    const isUser = token.role === 'user';
    const isPrivate = privateRoutes.some( route => reqPath.startsWith( route ) )

    if( !isAuthenticated && isPrivate ) {
        const loginUrl = new URL( '/api/auth/signin' , req.url );
        loginUrl.searchParams.set( "callbackUrl", reqPath );
        return NextResponse.redirect( loginUrl );
    }

    return NextResponse.redirect(new URL('/home', request.url));
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/private/:path*', '/secret/:path*', '/dashboard/:path*'  ]
}
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
const PUBLIC_FILE = /\.(.*)$/;

const verifyJWT = async (jwt: string) => {
    const { payload } = await jwtVerify(jwt, new TextEncoder().encode(process.env.JWT_SECRET));

    return payload;
};

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (pathname.startsWith('/register')) {
        // block access to register
        req.nextUrl.pathname = '/login';
        return NextResponse.redirect(req.nextUrl);
    }

    if (pathname.startsWith('/login')) {
        // check if already logged in
        if (await isValidJwt(req)) {
            req.nextUrl.pathname = '/';
            return NextResponse.redirect(req.nextUrl);
        } else {
            return NextResponse.next();
        }
    }

    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/static') ||
        PUBLIC_FILE.test(pathname)
    ) {
        return NextResponse.next();
    }

    const jwt = req.cookies.get('Authorization');

    if (!jwt) {
        req.nextUrl.pathname = '/login';
        return NextResponse.redirect(req.nextUrl);
    }

    try {
        await verifyJWT(jwt.value);
        return NextResponse.next();
    } catch (e) {
        req.nextUrl.pathname = '/login';
        return NextResponse.redirect(req.nextUrl);
    }
}

async function isValidJwt(req: NextRequest): Promise<boolean> {
    const jwt = req.cookies.get('Authorization');
    if (!jwt) {
        return false;
    }

    try {
        await verifyJWT(jwt.value);
    } catch (e) {
        return false;
    }

    return true;
}

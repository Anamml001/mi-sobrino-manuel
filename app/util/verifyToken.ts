import { NextRequest } from 'next/server';
import { headers } from 'next/headers';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET: string = process.env.JWT_SECRET as string;
function verifyToken(req: NextRequest) {
    const authorization: string | null = headers().get('authorization')

    const token: string | undefined = authorization?.slice(7)

    const payload: JwtPayload = jwt.verify(token!, JWT_SECRET) as { sub: string }

    return payload
}
export default verifyToken
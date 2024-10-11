import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import errors from '@/app/errors';
import createOrder from '@/app/api/logic/createOrder';
import verifyToken from '@/app/util/verifyToken';
const JWT_SECRET: string = process.env.JWT_SECRET as string;
const { MatchError, ContentError, SystemError } = errors;

export async function POST(req: NextRequest) {
    try {
        const { order, shippingAddress, phoneNumber } = await req.json();
        const { sub: userId } = verifyToken(req) as JwtPayload;

        await createOrder(userId!, order, shippingAddress, phoneNumber);

        return new NextResponse(null, { status: 201 });
    } catch (error) {
        const _error = error as Error;

        if (_error instanceof MatchError) {
            return NextResponse.json({ error: _error.constructor.name, message: _error.message }, { status: 400 });
        } else if (_error instanceof SystemError) {
            return NextResponse.json({ error: _error.constructor.name, message: _error.message }, { status: 500 });
        }

        return NextResponse.json({ error: ContentError.name, message: _error.message }, { status: 500 });
    }
}
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

import errors from '@/app/errors';
import connect from '@/app/data/connect';
import retrieveUser from '../../logic/retrieveUser';

const { MatchError, SystemError } = errors;

export async function GET(req: NextRequest) {
    await connect();

    const token = req.headers.get('Authorization')?.slice(7);

    if (!token) {
        return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    try {
        const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;

        const targetUserId = req.url.searchParams.get('userId');

        if (!targetUserId) {
            return NextResponse.json({ error: 'targetUserId parameter is missing' }, { status: 400 });
        }

        const user = await retrieveUser(userId, targetUserId);

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        const _error = error as Error;

        if (_error instanceof MatchError) {
            return NextResponse.json({ error: _error.constructor.name, message: _error.message }, { status: 404 });
        } else if (_error instanceof SystemError) {
            return NextResponse.json({ error: _error.constructor.name, message: _error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: SystemError.name, message: _error.message }, { status: 500 });
        }
    }
}
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'

import errors from '@/app/errors';
import authenticateUser from '@/app/api/logic/authenticateUser';
import connect from '@/app/data/connect';


const { DuplicityError, SystemError } = errors;

export async function POST(req: NextRequest) {
    await connect();

    const { email, password } = await req.json();

    try {
        const userId = await authenticateUser(email, password);

        const token = jwt.sign({ sub: userId }, process.env.JWT_SECRET!, { expiresIn: '24h' })

        return NextResponse.json(token, { status: 200 });
    } catch (error) {
        const _error = (error as Error);

        if (_error instanceof DuplicityError) {
            return NextResponse.json({ error: _error.constructor.name, message: _error.message }, { status: 400 });
        } else if (_error instanceof SystemError) {
            return NextResponse.json({ error: _error.constructor.name, message: _error.message }, { status: 500 });
        }

        return NextResponse.json({ error: SystemError.name, message: _error.message }, { status: 500 });
    }
}
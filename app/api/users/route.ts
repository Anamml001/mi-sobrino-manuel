import { NextRequest, NextResponse } from 'next/server';

import errors from '@/app/errors';
import registerUser from '@/app/api/logic/registerUser';


const { DuplicityError, SystemError } = errors;

export async function POST(req: NextRequest) {
    const { name, surname, birthdate, email, password } = await req.json();

    try {
        await registerUser(name, surname, birthdate, email, password);

        return new NextResponse(null, { status: 201 });
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
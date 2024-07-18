import { NextRequest, NextResponse } from 'next/server';

import errors from '@/app/errors';
// import '@/app/data/mongo-db'
import registerUser from '@/app/api/logic/registerUser';

import dbConnect from '@/app/data/dbConnect';


const { DuplicityError, SystemError } = errors;

export async function POST(req: NextRequest) {
    await dbConnect()

    const { name, surname, birthdate, email, password } = await req.json();

    console.log('DATA', name, surname, birthdate, email, password)

    try {
        await registerUser( name, surname, birthdate, email, password );

        return NextResponse.json({ message: 'User registered successfully' })
        // return res.status(200).end(JSON.stringify({ message: 'User registered successfully' }));
    } catch (error) {
        // if (error instanceof DuplicityError) {
        //     return res.status(400).json({ error: (error as Error).message });
        // } else if (error instanceof SystemError) {
        //     return res.status(500).json({ error: (error as Error).message });
        // } else {
        //     return res.status(500).json({ error: 'Internal Server Error' });
        // }

        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
};


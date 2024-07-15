import type { NextApiRequest, NextApiResponse } from 'next';
import errors from '@/app/errors';
// import '@/app/data/mongo-db'
import registerUser from '@/app/api/logic/registerUser';


const {  DuplicityError, SystemError } = errors;

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { name, surname, birthdate, email, password } = req.body;
 
    try {
        await registerUser({ name, surname, birthdate, email, password });
        return res.status(200).end(JSON.stringify({message:'User registered successfully'}));
    } catch (error ) {
        if ( error instanceof DuplicityError) {
            return res.status(400).json({ error: (error as Error).message });
        } else if (error instanceof SystemError) {
            return res.status(500).json({ error: (error as Error).message });
        } else {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};


import type { NextApiRequest, NextApiResponse } from 'next';
import authenticateUser from '@/logic/authenticateUser';
import jwt from 'jsonwebtoken';
import { errors } from 'com';
// import from '@/app/data/mongo-db.js';
const { MatchError, SystemError, TypeError, RangeError, ContentError } = errors;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable not defined');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { email, password } = req.body;

    try {
        const userId = await authenticateUser(email, password);
        const token = jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '50m' });

        return res.status(200).json(token);
    } catch (error) {
        let status = 500;

        if (error instanceof MatchError) {
            status = 401;
        } else if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError) {
            status = 400;
        }

        return res.status(status).json({ error: (error as Error).constructor.name, message: (error as Error).message });
    }
}
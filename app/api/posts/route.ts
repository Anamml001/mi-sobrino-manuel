import type { NextApiRequest, NextResponse } from 'next';
import jwt from 'jsonwebtoken';
import { errors } from '@/app/errors';
import createPost from '@/lib/createPost';
import connect from '@/app/data/connect';

const { MatchError, ContentError } = errors;

export default async function handler(req, res: NextResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  await connect();

  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new MatchError('Invalid or missing authorization header');
    }

    const token = authorization.slice(7);
    const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET!) as { sub: string };

    const { title, image, video, text } = req.body;

    await createPost({ userId, title, image, video, text });
    return res.status(201).send();
  } catch (error) {
    let status = 500;
    const _error = error as Error;

    if (_error instanceof TypeError || _error instanceof RangeError || _error instanceof ContentError) {
      status = 400;
    } else if (_error instanceof MatchError) {
      status = 401;
    } else if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
      status = 401;
      _error = new MatchError(_error.message);
    }

    return res.status(status).json({ error: _error.constructor.name, message: _error.message });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import errors from '@/app/errors';
import createPost from '@/app/api/logic/createPost';


const { MatchError, SystemError, ContentError} = errors;

export function POST(req: NextRequest) {
        return req.json()
        .then(body => {
            const token = ('Authorization')?.slice(7);

            if (!token) {
                return NextResponse.json({ error: 'TokenMissingError', message: 'Authorization token is missing' }, { status: 401 });
            }

            let userId: string;
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET!);
                userId = (decoded as { sub: string }).sub;
            } catch (error) {
                const _error = error as jwt.JsonWebTokenError | jwt.TokenExpiredError;
                return NextResponse.json({ error: 'TokenError', message: _error.message }, { status: 401 });
            }

            const { title, image, video, text } = body;

            return createPost({ userId, title, image, video, text })
                .then(() => {
                    return NextResponse.json(null, {status:201})
                })
                .catch(error => {
                    const _error = error as Error;

                    let status = 500;
                    if (_error instanceof MatchError) {
                        status = 404;
                    } else if (_error instanceof TypeError || _error instanceof RangeError || _error instanceof ContentError) {
                        status = 400;
                    }

                    return NextResponse.json({ error: _error.constructor.name, message: _error.message }, { status });
                });
        })
        .catch(error => {
            const _error = error as Error;
            return NextResponse.json({ error: SystemError.name, message: _error.message }, { status: 500 });
        });
}
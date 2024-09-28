import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import errors from '@/app/errors';
import createPost from '@/app/api/logic/createPost';
import removePost from '../logic/removePost';
import retrievePosts from '../logic/retrievePosts';
import modifyPost from '../logic/modifyPost';
import { headers } from 'next/headers';
import toggleLikePost from '../logic/toggleLikePost';

const JWT_SECRET: string = process.env.JWT_SECRET as string;


const { MatchError, SystemError, ContentError } = errors;

function verifyToken(req: NextRequest) {
    const authorization: string | null = headers().get('authorization')

    const token: any = authorization?.slice(7)

    const payload: JwtPayload = jwt.verify(token, JWT_SECRET) as { sub: string }

    return payload
}

//createPost
export async function POST(req: NextRequest) {
    try {
        const { title, image, video
            , text }: { title: string, image?: string, video?: string, text: string } = await req.json();

        const { sub: userId } = verifyToken(req)

        await createPost(userId!, title, text, image, video);

        return new NextResponse(null, { status: 201 });
    } catch (error) {
        const _error = (error as Error);

        if (_error instanceof MatchError) {
            return NextResponse.json({ error: _error.constructor.name, message: _error.message }, { status: 400 });
        } else if (_error instanceof SystemError) {
            return NextResponse.json({ error: _error.constructor.name, message: _error.message }, { status: 500 });
        }

        return NextResponse.json({ error: ContentError.name, message: _error.message }, { status: 500 });
    }
}
//removePost
export async function DELETE(req: NextRequest) {

    const { postId }: { postId: string } = await req.json();

    const authorization = headers().get('authorization')

    const token = authorization?.slice(7)

    const { sub: userId }: { sub: string } = jwt.verify(token, JWT_SECRET)
    try {
        await removePost(userId, postId);

        return new NextResponse(null, { status: 201 });
    } catch (error) {
        const _error = (error as Error);

        if (_error instanceof MatchError) {
            return NextResponse.json({ error: _error.constructor.name, message: _error.message }, { status: 400 });
        } else if (_error instanceof SystemError) {
            return NextResponse.json({ error: _error.constructor.name, message: _error.message }, { status: 500 });
        }

        return NextResponse.json({ error: ContentError.name, message: _error.message }, { status: 500 });
    }
}
//retrievePost

export async function GET(req: NextRequest) {
    const authorization = req.headers.get('authorization');
    const token = authorization?.slice(7);

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized', message: 'Authorization header missing or invalid' }, { status: 401 });
    }

    try {
        const { sub: userId }: { sub: string } = jwt.verify(token, JWT_SECRET);

        const posts = await retrievePosts(userId);

        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        const _error = error as Error;

        if (_error instanceof MatchError) {
            return NextResponse.json({ error: _error.constructor.name, message: _error.message }, { status: 400 });
        } else if (_error instanceof SystemError) {
            return NextResponse.json({ error: _error.constructor.name, message: _error.message }, { status: 500 });
        } else if (_error instanceof jwt.JsonWebTokenError || _error instanceof jwt.TokenExpiredError) {
            return NextResponse.json({ error: _error.constructor.name, message: _error.message }, { status: 401 });
        }

        return NextResponse.json({ error: ContentError.name, message: _error.message }, { status: 500 });
    }
}
//modifyPost
export async function PATCH(req: NextRequest) {

    const { postId, text }: { postId: string, text: string } = await req.json();

    const authorization = headers().get('authorization')

    const token = authorization?.slice(7)

    const { sub: userId }: { sub: string } = jwt.verify(token, JWT_SECRET)

    try {
        await modifyPost(userId, postId, text);

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        const _error = (error as Error);

        if (_error instanceof MatchError) {
            return NextResponse.json({ error: _error.constructor.name, message: _error.message }, { status: 400 });
        } else if (_error instanceof SystemError) {
            return NextResponse.json({ error: _error.constructor.name, message: _error.message }, { status: 500 });
        }

        return NextResponse.json({ error: ContentError.name, message: _error.message }, { status: 500 });
    }
}
//toggleLikePost
export async function PUT(req: NextRequest) {

    const { postId }: { postId: string } = await req.json();

    const authorization = headers().get('authorization')

    const token = authorization?.slice(7)

    const { sub: userId }: { sub: string } = jwt.verify(token, JWT_SECRET)

    try {
        await toggleLikePost(userId, postId);

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        const _error = (error as Error);

        if (_error instanceof MatchError) {
            return NextResponse.json({ error: _error.constructor.name, message: _error.message }, { status: 400 });
        } else if (_error instanceof SystemError) {
            return NextResponse.json({ error: _error.constructor.name, message: _error.message }, { status: 500 });
        }

        return NextResponse.json({ error: ContentError.name, message: _error.message }, { status: 500 });
    }
}

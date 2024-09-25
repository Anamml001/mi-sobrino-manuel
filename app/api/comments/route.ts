import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import errors from '@/app/errors';
import { headers } from 'next/headers';
import createComment from "../logic/createComment";
import removeComment from '../logic/removeComment';
import modifyComment from '../logic/modifyComment';
const { JWT_SECRET } = process.env

const { MatchError, SystemError, ContentError} = errors;
//createComment
export async function POST(req: NextRequest) {
        
    const { postId, text }:{postId:string, text:string} = await req.json();

    const authorization = headers().get('authorization')
    
    const token = authorization?.slice(7)

    const { sub: userId }:{sub:string}= jwt.verify(token, JWT_SECRET)
    try {
        await createComment(userId, postId, text);

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
//removeComment
export async function DELETE(req: NextRequest) {
        
    const { commentId }:{commentId:string} = await req.json();

    const authorization = headers().get('authorization')
    
    const token = authorization?.slice(7)

    const { sub: userId }:{sub:string} = jwt.verify(token, JWT_SECRET)
    try {
        await removeComment(userId, commentId);

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

//modifyComment
export async function PATCH(req: NextRequest) {
        
    const { postId, commentId, text }:{postId:string, commentId:string, text:string} = await req.json();

    const authorization = headers().get('authorization')
    
    const token = authorization?.slice(7)

    const { sub: userId }:{sub:string} = jwt.verify(token, JWT_SECRET)
    try {
        await modifyComment(userId, postId, commentId, text);

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

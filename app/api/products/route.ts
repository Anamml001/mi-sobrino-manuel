import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import errors from '@/app/errors';
import createProduct from '@/app/api/logic/createProduct';
import retrieveProducts from '@/app/api/logic/retrieveProducts'
import removeProduct from '@/app/api/logic/removeProduct';
import modifyProduct from '@/app/api/logic/modifyProduct';
import verifyToken from '@/app/util/verifyToken';

const JWT_SECRET: string = process.env.JWT_SECRET as string;
const { MatchError, ContentError, SystemError } = errors;

// Create Product
export async function POST(req: NextRequest) {
    try {
        const { name, image, stock, price } = await req.json();
        const { sub: userId } = verifyToken(req) as JwtPayload;

        await createProduct(userId!, { name, image, stock, price });

        return new NextResponse(null, { status: 201 });
    } catch (error) {
        const _error = error as Error;

        if (_error instanceof MatchError) {
            return NextResponse.json({ error: _error.constructor.name, message: _error.message }, { status: 400 });
        } else if (_error instanceof SystemError) {
            return NextResponse.json({ error: _error.constructor.name, message: _error.message }, { status: 500 });
        }

        return NextResponse.json({ error: ContentError.name, message: _error.message }, { status: 500 });
    }
}

// Retrieve Products
export async function GET(req: NextRequest) {
    try {
        const { sub: userId } = verifyToken(req) as JwtPayload;
        const products = await retrieveProducts(userId!);
        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        const _error = error as Error;

        if (_error instanceof MatchError) {
            return NextResponse.json({ error: _error.constructor.name, message: _error.message }, { status: 400 });
        } else if (_error instanceof SystemError) {
            return NextResponse.json({ error: _error.constructor.name, message: _error.message }, { status: 500 });
        }

        return NextResponse.json({ error: ContentError.name, message: _error.message }, { status: 500 });
    }
}

// // Remove Product
export async function DELETE(req: NextRequest) {
    try {
        const { productId }: { productId: string } = await req.json();
        const { sub: userId } = verifyToken(req) as JwtPayload;

        await removeProduct(userId!, productId);

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        const _error = error as Error;

        if (_error instanceof MatchError) {
            return NextResponse.json({ error: _error.constructor.name, message: _error.message }, { status: 400 });
        } else if (_error instanceof SystemError) {
            return NextResponse.json({ error: _error.constructor.name, message: _error.message }, { status: 500 });
        }

        return NextResponse.json({ error: ContentError.name, message: _error.message }, { status: 500 });
    }
}

// Modify Product
export async function PATCH(req: NextRequest) {
    try {
        const { productId, name, image, stock, price } = await req.json();
        const { sub: userId } = verifyToken(req) as JwtPayload;

        await modifyProduct(userId!, { productId, name, image, stock, price });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        const _error = error as Error;

        if (_error instanceof MatchError) {
            return NextResponse.json({ error: _error.constructor.name, message: _error.message }, { status: 400 });
        } else if (_error instanceof SystemError) {
            return NextResponse.json({ error: _error.constructor.name, message: _error.message }, { status: 500 });
        }

        return NextResponse.json({ error: ContentError.name, message: _error.message }, { status: 500 });
    }
}

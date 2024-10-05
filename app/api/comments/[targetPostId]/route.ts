import { NextRequest, NextResponse } from 'next/server';
import errors from '@/app/errors';
import retrieveComments from '../../logic/retrieveComments';

const { MatchError, SystemError } = errors;

export function GET(req: NextRequest, { params }: { params: { targetPostId: string } }) {
    const { targetPostId } = params;

    return retrieveComments(targetPostId)
        .then(comments => {

            return NextResponse.json(comments, { status: 200 });
        })
        .catch(error => {
            const _error = error as Error;
            let status = 500;
            let errorMessage = 'Ha ocurrido un error inesperado.';


            if (_error instanceof MatchError) {
                status = 404;
                errorMessage = _error.message;
            } else if (_error instanceof SystemError) {
                errorMessage = _error.message;
            }


            return NextResponse.json({ error: _error.constructor.name, message: errorMessage }, { status });
        });
}

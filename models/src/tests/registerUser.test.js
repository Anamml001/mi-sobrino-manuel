const httpMocks = require('node-mocks-http');
import handler from '../pages/api/register.js';

describe('/api/register', () => {
    test('register user', async () => {
        const { req, res } = httpMocks.createMocks({
            method: 'POST',
            body: {
                name: 'Ana María',
                surname: 'Moya Liébana',
                birthdate: '04/06/2001',
                email: 'anamml461@gmail.com',
                password: '123123123'
            },
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(JSON.parse(res._getData())).toEqual(
            expect.objectContaining({
                message: 'user registered',
            }),
        );
    });
});
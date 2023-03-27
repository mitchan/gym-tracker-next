import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../lib/db';
import { serialize } from 'cookie';
import { comparePasswords, createJWT } from '../../lib/auth';

export default async function signin(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({});
        return;
    }

    const { body } = req;

    try {
        const user = await db.user.findUnique({
            where: {
                email: body.email,
            },
        });
        if (user) {
            // validate password
            const isCorrectPassword = await comparePasswords(body.password, user.password);
            if (isCorrectPassword) {
                const jwt = await createJWT(user);

                res.setHeader(
                    'Set-Cookie',
                    serialize('Authorization', jwt, {
                        httpOnly: true,
                        path: '/',
                        maxAge: 60 * 60 * 24 * 7,
                    }),
                );
                res.status(201);
                res.json({});
                return;
            }
        }
    } catch (e) {
        console.error(e);
    }

    res.status(401);
    res.json({});
}

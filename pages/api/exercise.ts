import { NextApiRequest, NextApiResponse } from 'next';
import { CreateExercise } from '../../lib/types';
import { getUserFromCookie, validateJWT } from '../../lib/auth';
import { cookies } from 'next/headers';
import { db } from '../../lib/db';

export default async function createExercise(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({});
        return;
    }

    try {
        const user = await validateJWT(req.cookies['Authorization']);

        const body = req.body as CreateExercise;

        const exercise = await db.exercise.findFirst({
            where: {
                name: body.name,
                userId: user.id,
            },
        });

        if (exercise) {
            res.status(400);
            res.json({
                name: `Un esercizio con questo nome esiste gia'`,
            });
            return;
        }

        await db.exercise.create({
            data: {
                name: body.name,
                recovery: body.recovery,
                serie: body.serie,
                weight: body.weight,
                userId: user.id,
            },
        });

        res.status(200).json({});
    } catch (e) {
        res.status(500);
        res.json({});
    }
}

import { NextApiRequest, NextApiResponse } from 'next';

import { validateJWT } from '../../lib/auth';
import { db } from '../../lib/db';
import { CreateExercise, UpdateExercise } from '../../lib/types';

export default async function createExercise(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            await handleCreate(req, res);
            break;

        case 'PATCH':
            await handleUpdate(req, res);
            break;

        default:
            // invalid
            res.status(405).json({});
    }
}

async function handleCreate(req: NextApiRequest, res: NextApiResponse) {
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

async function handleUpdate(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user = await validateJWT(req.cookies['Authorization']);

        const body = req.body as UpdateExercise;

        // check if exercise if present
        const exercise = await db.exercise.findFirst({
            where: {
                id: body.id,
                userId: user.id,
            },
        });

        if (!exercise) {
            // cannot update
            res.status(404).json({ message: 'Exercise not found' });
        }

        await db.exercise.update({
            where: {
                id: body.id,
            },
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

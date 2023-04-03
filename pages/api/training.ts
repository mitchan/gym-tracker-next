import { NextApiRequest, NextApiResponse } from 'next';

import { validateJWT } from '../../lib/auth';
import { db } from '../../lib/db';
import { CreateExercise, CreateTraining, UpdateExercise, UpdateTraining } from '../../lib/types';

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

        const body = req.body as CreateTraining;

        const training = await db.training.findFirst({
            where: {
                title: body.title,
                userId: user.id,
            },
        });

        if (training) {
            res.status(400);
            res.json({
                name: `Una scheda con questo nome esiste gia'`,
            });
            return;
        }

        await db.training.create({
            data: {
                title: body.title,
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

        const body = req.body as UpdateTraining;

        // check if training if present
        const training = await db.training.findFirst({
            where: {
                id: body.id,
                userId: user.id,
            },
        });

        if (!training) {
            // cannot update
            res.status(404).json({ message: 'Scheda non trovata' });
        }

        await db.training.update({
            where: {
                id: body.id,
            },
            data: {
                title: body.title,
            },
        });

        res.status(200).json({});
    } catch (e) {
        res.status(500);
        res.json({});
    }
}

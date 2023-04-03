import { NextApiRequest, NextApiResponse } from 'next';

import { validateJWT } from '../../../lib/auth';
import { db } from '../../../lib/db';
import { AddExercise } from '../../../lib/types';

export default async function createExercise(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            await handleAdd(req, res);
            break;

        default:
            // invalid
            res.status(405).json({});
    }
}

async function handleAdd(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user = await validateJWT(req.cookies['Authorization']);

        const body = req.body as AddExercise;

        // check if traning exists
        const training = await db.training.findFirst({
            where: {
                id: body.trainingId,
                userId: user.id,
            },
            include: {
                exercises: true,
            },
        });

        if (!training) {
            res.status(400).json({ message: `training with id ${body.trainingId} not found` });
            return;
        }

        // check if exercise is already present
        const found = training.exercises.find((relation) => relation.exerciseId === body.exerciseId);
        if (found) {
            res.status(400).json({ message: `exercise ${body.exerciseId} already present` });
            return;
        }

        // check if exercise exists
        const exercise = await db.exercise.findFirst({
            where: {
                id: body.trainingId,
                userId: user.id,
            },
        });

        if (!exercise) {
            res.status(400).json({ message: `exercise with id ${body.exerciseId} not found` });
            return;
        }

        await db.training.update({
            data: {
                exercises: {
                    create: {
                        exerciseId: body.exerciseId,
                    },
                },
            },
            where: {
                id: body.trainingId,
            },
        });

        res.status(200).json({});
    } catch (e) {
        console.error(e);
        res.status(500);
        res.json({});
    }
}

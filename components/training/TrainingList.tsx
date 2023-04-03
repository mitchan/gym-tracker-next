import { Training } from '@prisma/client';
import { cookies } from 'next/headers';
import Link from 'next/link';

import { getUserFromCookie } from '../../lib/auth';
import { db } from '../../lib/db';
import { Card } from '../core/Card';

async function getData(): Promise<Training[]> {
    const user = await getUserFromCookie(cookies());

    if (!user) {
        return [];
    }

    return db.training.findMany({
        where: {
            userId: user?.id,
        },
        orderBy: {
            title: 'asc',
        },
    });
}

export async function TrainingList() {
    const trainings = await getData();

    return (
        <>
            {trainings.map((training) => (
                <Link key={training.id} href={`/training/${training.id}`}>
                    <Card>{training.title}</Card>
                </Link>
            ))}
        </>
    );
}

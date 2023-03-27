import { Exercise } from '@prisma/client';

export type CreateExercise = Pick<Exercise, 'name' | 'serie' | 'recovery' | 'weight' | 'notes'>;

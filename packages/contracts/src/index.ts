import { z } from 'zod';

export const CreateSubmissionSchema = z.object({
  problemId: z.string().uuid(),
  language: z.string().min(1),
  code: z.string().min(1),
});

export type CreateSubmissionDto = z.infer<typeof CreateSubmissionSchema>;

export const UpdateSubmissionStatusSchema = z.object({
  status: z.enum([
    'QUEUED', 'COMPILING', 'RUNNING', 'ACCEPTED', 'WRONG_ANSWER', 
    'TIME_LIMIT_EXCEEDED', 'MEMORY_LIMIT_EXCEEDED', 'RUNTIME_ERROR', 
    'COMPILATION_ERROR', 'SYSTEM_ERROR', 'CANCELLED'
  ]),
  executionTimeMs: z.number().optional(),
  memoryUsedKb: z.number().optional(),
});

export type UpdateSubmissionStatusDto = z.infer<typeof UpdateSubmissionStatusSchema>;

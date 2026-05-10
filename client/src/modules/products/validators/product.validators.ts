import { z } from 'zod';

export const productFiltersSchema = z.object({
  search: z.string().max(100).optional(),
  category: z.string().max(60).optional(),
});

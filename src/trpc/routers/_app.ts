import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { CategoriesRouter } from '@/app/modules/categories/server/procedure';
export const appRouter = createTRPCRouter({
  categories: CategoriesRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;
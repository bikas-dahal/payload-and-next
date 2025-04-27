import { AuthRouter } from '@/app/modules/auth/server/procedure';
import {  createTRPCRouter } from '../init';
import { CategoriesRouter } from '@/app/modules/categories/server/procedure';
import { ProductRouter } from '@/app/modules/products/server/procedure';
export const appRouter = createTRPCRouter({
  categories: CategoriesRouter,
  auth: AuthRouter,
  products: ProductRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;
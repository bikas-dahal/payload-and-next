import { CustomCategory } from "@/app/(app)/(home)/types";
import { Category, Media } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Sort, Where } from "payload";
import { z } from "zod";
import { sortValues } from "../search-params";
import { DEFAULT_LIMIT } from "@/constants";

export const ProductRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_LIMIT),
        categorySlug: z.string().optional().nullable(),
        minPrice: z.string().optional().nullable(),
        maxPrice: z.string().optional().nullable(),
        tags: z.array(z.string()).optional().nullable(),
        sort: z.enum(sortValues).nullable().optional(),
        tenantSlug: z.string().optional().nullable(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};
      let sort: Sort = "-createdAt";

      if (input.sort) {
        switch (input.sort) {
          case "newest":
            sort = "-createdAt";
            break;
          case "oldest":
            sort = "createdAt";
            break;
          case "Trending":
            sort = "-price";
            break;
        }
      }

      if (input.minPrice && input.maxPrice) {
        where.price = {
          greater_than_equal: input.minPrice,
          less_than_equal: input.maxPrice,
        };
      } else if (input.minPrice) {
        where.price = {
          greater_than_equal: input.minPrice,
        };
      } else if (input.maxPrice) {
        where.price = {
          less_than_equal: input.maxPrice,
        };
      }

      if (input.tenantSlug) {
        where["tenant.slug"] = {
          equals: input.tenantSlug,
        };
      }

      if (input.categorySlug) {
        const categoriesData = await ctx.payload.find({
          collection: "categories",
          limit: 1,
          depth: 1,
          pagination: false,
          where: {
            slug: {
              equals: input.categorySlug,
            },
          },
        });

        const formattedData = (categoriesData.docs ?? []).map((doc) => ({
          ...doc,
          subcategories: (doc.subcategories?.docs ?? []).map(
            (doc: Category) => ({
              ...doc,
              subcategory: undefined,
            })
          ),
        }));

        const subcategoriesSlug = [];
        const parentCategory = formattedData[0];

        if (parentCategory) {
          subcategoriesSlug.push(
            ...(parentCategory.subcategories?.docs ?? []).map(
              (subcategory: Category) => subcategory.slug
            )
          );
        }

        where["category.slug"] = {
          in: [parentCategory.slug, ...subcategoriesSlug],
        };
      }

      if (input.tags && input.tags.length > 0) {
        where.tags = {
          in: input.tags,
        };
      }

      const data = await ctx.payload.find({
        collection: "products",
        depth: 2,
        where,
        sort,
        page: input.cursor,
        limit: input.limit,
      });
      // console.log("data", data);

      return {
        ...data,
        docs: data.docs.map((doc: Product) => ({
          ...doc,
          image: doc.images as Media | null,
          name: doc.name as string,
          price: doc.price as number,
          tenant: doc.tenant as Tenant & {
            image: Media | null;
          },
        })),
      };
    }),
});

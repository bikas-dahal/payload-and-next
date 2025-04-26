import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Category } from "@/payload-types";

export const CategoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {

    const data = await ctx.payload.find({
      collection: "categories",
      depth: 1, 
      pagination: false,
      where: {
        parent: {
          exists: false,
        },
      },
      sort: "name",
    });

    console.log("Categories", data.docs);

    const formattedData = data.docs.map((category) => ({
      ...category,
      subcategories: (category.subcategories?.docs ?? []).map((subcategory) => ({
        ...(subcategory as Category),
        subcategory: undefined,
      })) ,
    }));

    console.log("Formatted Categories", formattedData);
    


    return formattedData ;
  }),
});

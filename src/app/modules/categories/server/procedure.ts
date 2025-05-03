import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Category } from "@/payload-types";
import { CustomCategory } from "@/app/(app)/(home)/types";

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

    // Transform the data to the expected CustomCategory type
    const formattedData: CustomCategory[] = data.docs.map((rawDoc: any) => {
      // Extract basic Category fields
      const category: Omit<Category, 'subcategories'> = {
        id: rawDoc.id,
        name: rawDoc.name,
        slug: rawDoc.slug,
        color: rawDoc.color || null,
        parent: rawDoc.parent || null,
        updatedAt: rawDoc.updatedAt,
        createdAt: rawDoc.createdAt,
      };
      
      // Extract subcategories array from the nested structure
      const subcategories: Category[] = (rawDoc.subcategories?.docs || [])
        .map((subDoc: any): Category => ({
          id: subDoc.id,
          name: subDoc.name,
          slug: subDoc.slug,
          color: subDoc.color || null,
          parent: subDoc.parent || null,
          updatedAt: subDoc.updatedAt,
          createdAt: subDoc.createdAt,
          // Initialize with empty subcategories structure
          subcategories: { docs: [], hasNextPage: false, totalDocs: 0 }
        }));
      
      // Create the CustomCategory with transformed subcategories
      return {
        ...category,
        subcategories: subcategories
      };
    });

    return formattedData;
  }),
});
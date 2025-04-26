import { getPayload } from "payload";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { SearchFilters } from "./search-filters";
import configPromise from "@/payload.config";
import { Category } from "@/payload-types";

interface Props {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Props) {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories",
    depth: 1, // 1 is the default depth
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
  });

  const formattedData = data.docs.map((category) => ({
    ...category,
    subcategories: (category.subcategories?.docs ?? []).map(
      (subcategory: Category) => ({
        ...(subcategory as Category),
        subcategory: undefined,
      })
    ),
  }));

  console.log(formattedData, "formattedData");
  console.log(data, "data");
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formattedData} />
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  );
}

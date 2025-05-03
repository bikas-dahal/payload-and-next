import { getPayload } from "payload";
import configPromise from "@payload-config";


export default async function Home() {

    const payload = await getPayload({
      config: configPromise
    })

    const data = await payload.find({
      collection: "categories",

    })

    console.log("Categories", typeof data);
    

  return (
    <div>
      {/* {JSON.stringify(data, null, 2)} */}
      <h1>Categories</h1>
      
    </div>
  );
}

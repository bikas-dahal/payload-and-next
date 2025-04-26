import configPromise from '../../../../payload.config'
import { getPayload } from 'payload'

export default async function Home() {
  //  const payload = await getPayload({
  //     config: configPromise,
  //   })
  
  //   const data = await payload.find({
  //     collection: 'users',
  //     depth: 1, // 1 is the default depth
  //     where: {
  //       parent: {
  //         exists: false,
  //       }
  //     }
  //   })
  
  return (
    <div>
      {/* {JSON.stringify(data, null, 2)} */}
    </div>
  );
}

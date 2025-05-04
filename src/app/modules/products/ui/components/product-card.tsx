import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: string | number;
  name: string;
  imageUrl?: string | null;
  authorUsername: string;
  authorImageUrl?: string | null;
  reviewRating: number;
  reviewCount: number;
  price: number;
}

export const ProductCard = ({
  id,
  name,
  imageUrl,
  authorUsername,
  authorImageUrl,
  reviewRating,
  reviewCount,
  price,
}: ProductCardProps) => {
  return (
    <Link href={`/product/${id}`} className="w-full h-full">
      <div className="hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow border h-full rounded-md bg-white overflow-hidden flex flex-col shadow-sm transition-shadow duration-200">
        <div className="relative aspect-square">
          <Image
            src={imageUrl ?? ""}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4 flex flex-col gap-2 flex-1">
          <h2 className="text-lg font-semibold text-gray-800 line-clamp-4">
            {name}
          </h2>

          <div className="flex items-center gap-2" onClick={() => {}}>
            {authorImageUrl && (
              <Image
                src={authorImageUrl}
                alt={authorUsername}
                width={16}
                height={16}
                className="shrink-0 size-[16px] border rounded-full"
              />
            )}
            <span className="text-sm font-medium underline text-gray-600">
              {authorUsername}
            </span>
          </div>
          {reviewCount > 0 && (
            <div className="flex items-center gap-1">
              <StarIcon className="size-3.5 fill-black" />
              <p className="text-sm font-medium text-gray-600">
                {reviewRating} ({reviewCount})
              </p>
            </div>
          )}
        </div>
        <div className="p-4 border-t flex items-center justify-between">
          <div className="relative px-2 py-1 border bg-pink-400 w-fit">
            <p className="text-sm font-semibold text-white">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(price)}
            </p>
          </div>
        </div>
      </div>
    </Link>
    // <div className="flex flex-col gap-2 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
    //     <img src={imageUrl ?? ''} alt={name} className="w-full h-48 object-cover rounded-md" />
    //     <h3 className="text-lg font-semibold">{name}</h3>
    //     <div className="flex items-center gap-2">
    //         <img src={authorImageUrl ?? ''} alt={authorUsername} className="w-8 h-8 rounded-full" />
    //         <span>{authorUsername}</span>
    //     </div>
    //     <div className="flex items-center gap-1 text-yellow-500">
    //         {Array.from({ length: 5 }, (_, index) => (
    //             <svg
    //                 key={index}
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 fill={index < reviewRating ? 'currentColor' : 'none'}
    //                 viewBox="0 0 24 24"
    //                 strokeWidth={1.5}
    //                 stroke="currentColor"
    //                 className="w-5 h-5"
    //             >
    //                 <path
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                     d="M12 17.25l4.95 2.607a1 1 0 001.45-1.054l-.944-5.52 4.017-3.9a1 1 0 00-.553-1.707l-5.547-.807L12 .587z"
    //                 />
    //             </svg>
    //         ))}
    //         <span>({reviewCount})</span>
    //     </div>
    //     <div className="text-lg font-bold">${price.toFixed(2)}</div>
    // </div>
  );
};


export const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse flex space-x-4">
      <div className="flex-1 space-y-6 py-1">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
};

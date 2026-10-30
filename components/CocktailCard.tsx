import Link from "next/link";
import Image from "next/image";
import FavouriteButton from "@/components/FavouriteButton";
import type { Cocktail } from "@/lib/types";

export default function CocktailCard({cocktail}: {cocktail: Cocktail}){
  return (
    <article className="relative flex flex-col min-w-0 bg-white shadow-sm/3">
      <Link href={`/cocktails/${cocktail.id}`} className="group">
        <Image src={cocktail.imageUrl} width={800} height={800} alt={cocktail.name} className="aspect-[4/3] w-full object-cover transition-opacity group-hover:opacity-90"/>

        <div className="px-3 pt-2 pb-4">
          <p className="mt-3 text-xs uppercase tracking-wider text-gray-500">{cocktail.category}</p>
          <h2 className="text-2xl font-medium tracking-tight break-words">{cocktail.name}</h2>
          <p className="mt-1 text-sm text-gray-500 break-words">
            {cocktail.ingredients?.length
              ? cocktail.ingredients.slice(0, 3).map((ingredient) => ingredient.name).join(" · ") + (cocktail.ingredients.length > 3 ? ` +${cocktail.ingredients.length - 3} more` : "")
              : "View recipe"}
          </p>
        </div>
      </Link>

      <div className="absolute top-3 right-3">
        <FavouriteButton id={cocktail.id}/>
      </div>
    </article>
  );
}

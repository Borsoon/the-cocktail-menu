import Footer from "@/components/Footer";
import FavouriteButton from "@/components/FavouriteButton";
import type { Cocktail as CocktailData } from "@/lib/types";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"]
})

export default async function Cocktail({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;

  async function getCocktails(){
    const res = await fetch(`https://cocktails.solvro.pl/api/v1/cocktails/${id}`);

    if(res.status === 404) notFound();

    if(!res.ok){
      throw new Error("Failed to fetch cocktail");
    }

    return res.json();
  }
  
  const result = await getCocktails();
  const cocktail: CocktailData = result.data;


  return (
    <div className="flex flex-col mx-auto w-full max-w-7xl min-h-screen px-4 sm:px-6">
      <Navbar/>

      <Link href="/" className="mt-3 mb-6 sm:mt-6 sm:mb-10 text-sm text-gray-500 hover:text-black">← Back to the collection</Link>

      <div className="grid grid-cols-1 gap-8 pb-12 lg:grid-cols-2 lg:gap-16 lg:pb-16">
        <Image
          src={cocktail.imageUrl}
          width={800}
          height={800}
          alt={cocktail.name}
          className="aspect-[4/3] w-full object-cover sm:aspect-square"
        />

        <div className="flex flex-col min-w-0 items-start gap-6">
          <p className="text-xs uppercase tracking-wider text-gray-500">{cocktail.category}</p>

          <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-medium ${playfair.className} tracking-tight break-words`}>
            {cocktail.name}
          </h1>

          <div className="flex flex-row flex-wrap gap-3">
            <p className="bg-white px-4 py-2 text-sm shadow-sm/3">
              {cocktail.alcoholic ? "Alcoholic" : "No alcohol"}
            </p>
            <p className="bg-white px-4 py-2 text-sm shadow-sm/3">{cocktail.glass}</p>
          </div>

          <FavouriteButton id={cocktail.id}/>

          <div className="flex flex-col gap-4 mt-4 pt-6 w-full border-t border-gray-200">
            <h2 className={`text-3xl ${playfair.className}`}>Ingredients</h2>
            {cocktail.ingredients?.length ? cocktail.ingredients.map((ingredient) => (
              <div key={ingredient.id} className="flex flex-col gap-3 pb-4 border-b border-gray-200">
                <div className="flex justify-between items-start gap-4 sm:gap-6">
                  <div className="flex flex-col min-w-0 gap-1">
                    <p className="break-words">{ingredient.name}</p>
                    <p className="text-xs text-gray-500">
                      {[ingredient.type, ingredient.alcohol === true ? "Alcoholic" : ingredient.alcohol === false ? "No alcohol" : null, ingredient.percentage != null ? `${ingredient.percentage}% ABV` : null].filter(Boolean).join(" · ") || "No extra details available"}
                    </p>
                  </div>
                  <p className="max-w-1/2 text-sm text-gray-500 text-right break-words">{ingredient.measure?.trim() || "Amount not specified"}</p>
                </div>

                {(ingredient.description || ingredient.imageUrl) && (
                  <details className="text-sm text-gray-500">
                    <summary className="w-fit cursor-pointer hover:text-black">About {ingredient.name}</summary>
                    <div className="flex flex-col gap-3 pt-3">
                      {ingredient.imageUrl && <Image src={ingredient.imageUrl} width={96} height={96} alt={ingredient.name} className="w-24 h-24 object-contain bg-white"/>}
                      {ingredient.description && <p className="leading-relaxed whitespace-pre-line break-words">{ingredient.description.replaceAll("\\r\\n", "\n")}</p>}
                    </div>
                  </details>
                )}
              </div>
            )) : <p className="text-gray-500">No ingredients listed.</p>}
          </div>

          <div className="flex flex-col gap-4 mt-4 pt-6 w-full border-t border-gray-200">
            <h2 className={`text-3xl ${playfair.className}`}>The method</h2>
            <p className="text-base text-gray-600 leading-relaxed whitespace-pre-line break-words">
              {cocktail.instructions}
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
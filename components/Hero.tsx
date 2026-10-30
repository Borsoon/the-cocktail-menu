import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
    subsets: ["latin"]
  })  

export default function Hero(){
    return(
        <div className="flex flex-col items-start justify-center gap-3 py-8 font-sans sm:py-12">
        <h1 className={`max-w-xl text-4xl sm:text-5xl lg:text-6xl font-medium ${playfair.className} leading-tight lg:leading-16 tracking-tight`}>Find your next favourite cocktail</h1>
        <p className="text-base font-medium text-gray-500">Choose the cocktail from the list below</p>
      </div>
    )
}
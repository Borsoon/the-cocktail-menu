import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
    subsets: ["latin"]
  })  

export default function Hero(){
    return(
        <div className="flex flex-col items-start justify-center gap-2 py-12 font-sans">
        <h1 className={`max-w-xl text-6xl font-medium ${playfair.className} leading-16 tracking-tight`}>Find your next favourite cocktail</h1>
        <p className="text-md font-medium text-gray-500">Choose the cocktail from the list below</p>
      </div>
    )
}
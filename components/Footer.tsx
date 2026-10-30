import Link from "next/link";

export default function Footer(){
  return(
    <footer className="flex flex-col justify-between items-start sm:flex-row sm:items-center gap-4 mt-auto py-8 border-t border-gray-200">
      <Link href="/" className="text-sm tracking-tight">THE COCKTAIL MENU</Link>

      <div className="flex flex-col gap-1 text-sm text-gray-500 items-start sm:items-end">
        <Link href="https://cocktails.solvro.pl/" target="_blank" rel="noreferrer" className="hover:text-black hover:underline">Recipes & data from Solvro Cocktails API ↗</Link>
      </div>
    </footer>
  )
}

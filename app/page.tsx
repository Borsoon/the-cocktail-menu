import CocktailList from "@/components/CocktailList";
import type { Cocktail } from "@/lib/types";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

type HomeProps = {searchParams: Promise<{search?: string | string[]}>};

export default async function Home({searchParams}: HomeProps){
  const params = await searchParams;
  const search = typeof params.search === "string" ? params.search : "";

  async function getCocktails() {


    let page = 1;
    let lastPage = 1;
    const cocktails: Cocktail[] = [];

    do {
      const res = await fetch(`https://cocktails.solvro.pl/api/v1/cocktails?perPage=250&ingredients=true&page=${page}`);

      if (!res.ok) {
        throw new Error("Failed to fetch cocktails");
      }

      const result = await res.json();
      cocktails.push(...result.data);
      lastPage = result.meta.lastPage;
      page++;
    } while(page <= lastPage);

    return cocktails;
  }

  const cocktails = await getCocktails();

  return (
    <div className="flex flex-col mx-auto w-full max-w-7xl min-h-screen px-6">
      <Navbar/>
      <Hero/> 
      <CocktailList key={search} cocktails={cocktails} initialSearch={search}/>
      <Footer/>
    </div>
  );
}

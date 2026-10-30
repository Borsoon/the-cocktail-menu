"use client";

import { useState } from "react";
import CocktailCard from "@/components/CocktailCard";
import { useFavourites } from "@/lib/favourites";
import type { Cocktail } from "@/lib/types";

export default function CocktailList({cocktails, initialSearch = ""}: {cocktails: Cocktail[]; initialSearch?: string}){
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState("");
  const [alcohol, setAlcohol] = useState("");
  const [glass, setGlass] = useState("");
  const [sort, setSort] = useState("az");
  const [onlyFavourites, setOnlyFavourites] = useState(false);
  const [page, setPage] = useState(1);
  const {favourites} = useFavourites();

  const categories = [...new Set(cocktails.map((cocktail) => cocktail.category))].sort();
  const glasses = [...new Set(cocktails.map((cocktail) => cocktail.glass))].sort();

  const filtered = cocktails.filter((cocktail) =>
    cocktail.name.toLowerCase().includes(search.trim().toLowerCase()) &&
    (!category || cocktail.category === category) &&
    (!glass || cocktail.glass === glass) &&
    (!alcohol || cocktail.alcoholic === (alcohol === "true")) &&
    (!onlyFavourites || favourites.includes(cocktail.id))
  ).sort((a, b) => sort === "az" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));

  const perPage = 15;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  function clearFilters(){
    setSearch("");
    setCategory("");
    setAlcohol("");
    setGlass("");
    setSort("az");
    setOnlyFavourites(false);
    setPage(1);
  }

  const inputStyle = "min-w-0 w-full bg-white lg:w-auto border border-gray-200 px-4 py-3 outline-none focus:border-black";

  const selectStyle = `${inputStyle} appearance-none pr-10 bg-no-repeat bg-[length:16px_16px] bg-[position:right_12px_center]`;
  const selectArrow = {
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23171717' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")"
  };

  return (
    <div className="flex flex-col flex-1">
      <form onSubmit={(event) => event.preventDefault()} className="grid grid-cols-2 mb-6 gap-3 lg:flex lg:flex-row lg:flex-wrap">
        <input type="search" aria-label="Search cocktails" placeholder="Search cocktails..." value={search} onChange={(event) => {setSearch(event.target.value); setPage(1)}} className={`${inputStyle} col-span-2 lg:flex-1`}/>

        <select aria-label="Category" value={category} onChange={(event) => {setCategory(event.target.value); setPage(1)}} className={selectStyle} style={selectArrow}>
          <option value="">All categories</option>
          {categories.map((name) => <option key={name} value={name}>{name}</option>)}
        </select>

        <select aria-label="Alcohol" value={alcohol} onChange={(event) => {setAlcohol(event.target.value); setPage(1)}} className={selectStyle} style={selectArrow}>
          <option value="">All drinks</option>
          <option value="true">Alcoholic</option>
          <option value="false">No alcohol</option>
        </select>

        <select aria-label="Glass" value={glass} onChange={(event) => {setGlass(event.target.value); setPage(1)}} className={selectStyle} style={selectArrow}>
          <option value="">All glasses</option>
          {glasses.map((name) => <option key={name} value={name}>{name}</option>)}
        </select>

        <select aria-label="Sort by name" value={sort} onChange={(event) => {setSort(event.target.value); setPage(1)}} className={selectStyle} style={selectArrow}>
          <option value="az">Name: A–Z</option>
          <option value="za">Name: Z–A</option>
        </select>

        <button type="button" aria-pressed={onlyFavourites} onClick={() => {setOnlyFavourites(!onlyFavourites); setPage(1)}} className={`min-w-0 px-3 py-3 border cursor-pointer sm:px-4 ${onlyFavourites ? "bg-black text-white" : "bg-white border-gray-200"}`}>
          {onlyFavourites ? "♥" : "♡"} Favourites ({favourites.length})
        </button>
        <button type="button" onClick={clearFilters} className="px-4 py-3 text-gray-500 underline cursor-pointer">Clear</button>
      </form>

      <p aria-live="polite" className="mb-5 text-sm text-gray-500">{filtered.length} cocktails found</p>

      {visible.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 pb-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-12">
            {visible.map((cocktail) => (
              <CocktailCard key={cocktail.id} cocktail={cocktail}/>
            ))}
          </div>

          <nav aria-label="Cocktail pages" className="flex justify-center items-center gap-3 pb-12 sm:gap-5 sm:pb-16">
            <button onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1} className="min-h-11 px-3 py-2 bg-black sm:px-4 text-white cursor-pointer disabled:opacity-30 disabled:cursor-default">Previous</button>
            <p className="text-sm text-center">Page {currentPage} of {totalPages}</p>
            <button onClick={() => setPage(currentPage + 1)} disabled={currentPage === totalPages} className="min-h-11 px-3 py-2 bg-black sm:px-4 text-white cursor-pointer disabled:opacity-30 disabled:cursor-default">Next</button>
          </nav>
        </>
      ) : (
        <div className="flex flex-col flex-1 justify-center items-center gap-3 py-16">
          <p>{onlyFavourites ? "No favourites match these filters." : "No results found :/"}</p>
          <button onClick={clearFilters} className="underline cursor-pointer">Clear filters</button>
        </div>
      )}
    </div>
  );
}

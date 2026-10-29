"use client";

import { useFavourites } from "@/lib/favourites";

export default function FavouriteButton({id}: {id: number}){
  const {favourites, toggleFavourite} = useFavourites();
  const saved = favourites.includes(id);

  return (
    <button
      type="button"
      onClick={() => toggleFavourite(id)}
      aria-pressed={saved}
      aria-label={saved ? "Remove from favourites" : "Add to favourites"}
      className="flex justify-center items-center gap-2 px-3 py-2 bg-white border border-gray-200 cursor-pointer hover:bg-gray-100"
    >
      <span aria-hidden="true">{saved ? "♥" : "♡"}</span>
      {saved ? "Saved" : "Save"}
    </button>
  );
}

"use client";

import { useSyncExternalStore } from "react";

const key = "cocktail-favourites";
const event = "favourites-changed";

function subscribe(callback: () => void){
  window.addEventListener("storage", callback);
  window.addEventListener(event, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(event, callback);
  }
}

function getSnapshot(){
  try {
    return localStorage.getItem(key) || "[]";
  } catch {
    return "[]";
  }
}

export function useFavourites(){
  const saved = useSyncExternalStore(subscribe, getSnapshot, () => "[]");
  let favourites: number[] = [];

  try {
    const parsed = JSON.parse(saved);
    if(Array.isArray(parsed)) favourites = parsed.filter((id) => Number.isInteger(id));
  } catch {}

  function toggleFavourite(id: number){
    const updated = favourites.includes(id)
      ? favourites.filter((savedId) => savedId !== id)
      : [...favourites, id];

    try {
      localStorage.setItem(key, JSON.stringify(updated));
      window.dispatchEvent(new Event(event));
    } catch {
      window.alert("Your browser could not save favourites. Please allow local storage.");
    }
  }

  return {favourites, toggleFavourite};
}

import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { axiosInstance } from "../api/axios";
import type { Meal } from "../models/Meal";
import type { SearchType } from "../models/SearchType";

const urlSearchKeyword = "search.php?s=";
const urlSearchIngredients = "filter.php?i=";

export function useSearchRecipes(
  query: string,
  searchType: SearchType
): [Meal[] | null, string, boolean] {
  const [recipes, setRecipes] = useState<Meal[] | null>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const debouncedSearchTerm = useDebounce(query, 300);
  const searchUrl = useMemo(
    () => (searchType === "keyword" ? urlSearchKeyword : urlSearchIngredients),
    [searchType]
  );

  const searchRecipes = useCallback(async () => {
    if (!debouncedSearchTerm.trim()) {
      setRecipes([]);
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.get(`${searchUrl}${debouncedSearchTerm}`);
      setRecipes(res.data.meals ?? null);
    } catch (err) {
      console.error("[Err]" + err);
      setError("Errore nel recupero dei dati.");
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchTerm, searchUrl]);

  useEffect(() => {
    searchRecipes();
  }, [searchRecipes]);

  return [recipes, error, loading];
}

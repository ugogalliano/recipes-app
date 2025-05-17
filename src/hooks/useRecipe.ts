import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";
import type { Meal } from "../models/Meal";

const urlGetRecipe = "lookup.php?i=";

export function useRecipe(recipeId: string): [Meal | null, string, boolean] {
  const [recipe, setRecipe] = useState<Meal | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRecipe = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`${urlGetRecipe}${recipeId}`);
      setRecipe(res.data.meals?.[0] ?? null);
      setError("");
    } catch (err) {
      console.error("[Err]", err);
      setError("Errore nel recupero della ricetta.");
      setRecipe(null);
    } finally {
      setLoading(false);
    }
  }, [recipeId]);

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  return [recipe, error, loading];
}

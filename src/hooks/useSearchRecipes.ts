import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { axiosInstance } from "../api/axios";
import type { Meal } from "../models/Meal";
import type { SearchType } from "../models/SearchType";
import { isAbortedError } from "@/lib/utils";

const urlSearchKeyword = "search.php?s=";
const urlSearchIngredients = "filter.php?i=";

export function useSearchRecipes(
  query: string,
  searchType: SearchType
): [Meal[] | null, string, boolean] {
  const [recipes, setRecipes] = useState<Meal[] | null>([]);
  const [error, setError] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const debouncedSearchTerm = useDebounce(query, 300);
  const searchUrl = useMemo(
    () => (searchType === "keyword" ? urlSearchKeyword : urlSearchIngredients),
    [searchType]
  );
  const searchRecipes = useCallback(() => {
    if (!debouncedSearchTerm.trim()) {
      setRecipes([]);
      return;
    }
    const controller = new AbortController();
    startTransition(async () => {
      try {
        const res = await axiosInstance.get(
          `${searchUrl}${debouncedSearchTerm}`,
          { signal: controller.signal }
        );
        setRecipes(res.data.meals ?? null);
        setError("");
      } catch (err: unknown) {
        if (isAbortedError(err)) {
          return;
        }
        console.error("[Err]", err);
        setError("Errore nel recupero dei dati.");
        setRecipes([]);
      }
    });
    return () => controller.abort();
  }, [debouncedSearchTerm, searchUrl]);

  useEffect(() => {
    const abortController = searchRecipes();
    return () => abortController && abortController();
  }, [searchRecipes]);

  return [recipes, error, isPending];
}

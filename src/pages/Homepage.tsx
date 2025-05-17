import SearchBox from "../components/SearchBox";
import RecipesList from "../features/recipes/components/RecipesList";
import { useSearchRecipes } from "../hooks/useSearchRecipes";
import RecipesLoader from "../features/recipes/components/RecipesLoader";
import RecipesError from "../features/recipes/components/RecipeError";
import React, { useMemo, useState } from "react";
import RecipeNotFound from "../features/recipes/components/RecipeNotFound";
import type { SearchType } from "../models/SearchType";
import Banner from "../shared/banner/Banner";
import { Keyboard } from "lucide-react";

export default function Homepage() {
  const [query, setQuery] = useState("");
  const [typeOfSearch, setTypeOfSearch] = useState<SearchType>("ingredient");
  const [recipes, error, loading] = useSearchRecipes(query, typeOfSearch);

  const noRecipes = useMemo(
    () => !loading && !recipes && !error,
    [loading, recipes, error]
  );

  const showBanner = useMemo(
    () => recipes && recipes.length === 0 && !loading,
    [recipes, loading]
  );

  return (
    <React.Fragment>
      <SearchBox
        setQuery={setQuery}
        typeOfSearch={typeOfSearch}
        setTypeOfSearch={setTypeOfSearch}
      />

      {loading && <RecipesLoader />}
      {showBanner && (
        <Banner icon={Keyboard} message="Typing for search recipes." />
      )}
      {error && <RecipesError />}
      {recipes && <RecipesList recipes={recipes} />}
      {noRecipes && <RecipeNotFound />}
    </React.Fragment>
  );
}

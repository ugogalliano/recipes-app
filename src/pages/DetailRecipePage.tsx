import { useParams } from "react-router";
import { useRecipe } from "../hooks/useRecipe";
import Loader from "../shared/loader/Loader";
import RecipesError from "../features/recipes/components/RecipeError";
import RecipeNotFound from "../features/recipes/components/RecipeNotFound";
import { useMemo } from "react";
import RecipeDetail from "../features/recipes/components/RecipeDetail";

export default function DetailRecipePage() {
  const { idRecipe } = useParams();

  const [recipe, error, loading] = useRecipe(idRecipe ?? "");

  const noRecipe = useMemo(
    () => !loading && !recipe && !error,
    [loading, recipe, error]
  );

  return (
    <>
      {recipe && <RecipeDetail recipe={recipe} />}
      {loading && <Loader />}
      {error && <RecipesError />}
      {noRecipe && <RecipeNotFound />}
    </>
  );
}

import { Star } from "lucide-react";
import RecipesList from "../features/recipes/components/RecipesList";
import { useFavorites } from "../provider/provider";
import Banner from "../shared/banner/Banner";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  return (
    <>
      {favorites.length === 0 && (
        <Banner
          icon={Star}
          message="Click the star to save your favorite recipes!"
        />
      )}
      {favorites && <RecipesList recipes={favorites} />}
    </>
  );
}

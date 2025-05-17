import { useCallback, useMemo } from "react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import type { Meal } from "../../../models/Meal";
import { ExternalLink, Star, Video } from "lucide-react";
import { useFavorites } from "../../../provider/provider";
import { cn } from "../../../lib/utils";
import { useNavigate } from "react-router";

interface RecipeCardProps {
  recipe: Meal;
}

export default function RecipeCard({ recipe }: Readonly<RecipeCardProps>) {
  const isPresentDescription = useMemo(
    () => recipe.strArea && recipe.strCategory,
    [recipe.strArea, recipe.strCategory]
  );
  const { favorites, toggleFavorite } = useFavorites();
  const router = useNavigate();

  const isFavorite = useMemo(
    () => favorites.find((item) => item.idMeal === recipe.idMeal),
    [favorites, recipe.idMeal]
  );

  const label = isFavorite
    ? `Rimuovi ${recipe.strMeal} dai preferiti`
    : `Aggiungi ${recipe.strMeal} ai preferiti`;

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<SVGSVGElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleFavorite(recipe);
      }
    },
    [toggleFavorite, recipe]
  );

  const handleFavorite = useCallback(() => {
    toggleFavorite(recipe);
  }, [toggleFavorite, recipe]);

  const handleToDetail = useCallback(() => {
    router(`/${recipe.idMeal}`);
  }, [recipe.idMeal, router]);

  return (
    <Card
      className={
        "overflow-hidden w-full border-0 gap-0 shadow-md hover:shadow-2xl "
      }
    >
      <div className="relative h-55  w-full">
        <img
          alt={recipe.strMeal}
          src={recipe.strMealThumb}
          className="object-cover w-full"
          sizes="auto"
        />
      </div>
      <div className="pt-5 pb-5  rounded-b-2xl">
        <CardHeader>
          <CardTitle className="md:text-2xl  text-lg font-bold text-start">
            {recipe.strMeal}
          </CardTitle>
          {isPresentDescription && (
            <CardDescription className=" text-start">
              {recipe.strArea} : {recipe.strCategory}
            </CardDescription>
          )}
        </CardHeader>

        <CardFooter className="text-xs text-muted-foreground justify-between pt-8 mt-auto">
          <div className="flex justify-between w-full items-center">
            <div className="flex gap-3 items-center">
              {recipe.strSource && (
                <a href={recipe.strSource} target="_blank" rel="Source Link">
                  <ExternalLink className="w-7 h-7 hover:text-primary" />
                </a>
              )}
              {recipe.strYoutube && (
                <a href={recipe.strYoutube} target="_blank" rel="Recipe Video">
                  <Video className="w-7 h-7 hover:text-primary" />
                </a>
              )}
              <Star
                onClick={handleFavorite}
                tabIndex={0}
                aria-label={label}
                onKeyDown={handleKeyDown}
                className={cn(
                  "w-7 h-7 cursor-pointer text-yellow-500 hover:fill-yellow-500",
                  {
                    "fill-yellow-500": isFavorite,
                  }
                )}
              />
            </div>
            <Button variant={"secondary"} onClick={handleToDetail}>
              View Recipe
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}

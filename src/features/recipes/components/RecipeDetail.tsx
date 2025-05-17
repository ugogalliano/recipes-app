import { useMemo } from "react";
import type { IngredientEntry } from "../../../models/IngredientEntry";
import type { Meal } from "../../../models/Meal";

interface RecipeDetailProps {
  recipe: Meal;
}

const extractIngredientsFromMeal = (meal: Meal): IngredientEntry[] => {
  const keys = Object.entries(meal);

  const filterIngredients = keys.filter(
    ([key, value]) =>
      key.startsWith("strIngredient") &&
      typeof value === "string" &&
      value.toString().trim()
  );

  const ingredients: IngredientEntry[] = filterIngredients.map(
    ([key, value]) => {
      const index = key.replace("strIngredient", "");
      const measureKey = `strMeasure${index}` as keyof Meal;
      const measure = meal[measureKey] || "";
      return {
        ingredient: value as string,
        measure: measure as string,
      };
    }
  );

  return ingredients;
};

export default function RecipeDetail({ recipe }: Readonly<RecipeDetailProps>) {
  const ingredients = useMemo(
    () => extractIngredientsFromMeal(recipe),
    [recipe]
  );

  return (
    <div className="flex flex-col items-center p-6 gap-6">
      <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
        {recipe.strMeal}
      </h1>

      <div className="flex justify-center">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          width={400}
          height={350}
          className="rounded-md shadow-lg hover:shadow-2xl object-cover"
        />
      </div>
      <div className="flex gap-4 text-gray-600 text-sm md:text-lg font-medium">
        <div className="bg-yellow-100 rounded px-3 py-1 shadow">
          Category: <span className="font-semibold">{recipe.strCategory}</span>
        </div>
        <div className="bg-yellow-100 rounded px-3 py-1 shadow">
          Area: <span className="font-semibold">{recipe.strArea}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl ">
        <div className="bg-primary rounded-md p-3 shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Instructions</h2>
          <p className="text-lg text-gray-700 whitespace-pre-line">
            {recipe.strInstructions}
          </p>
        </div>

        <div className="bg-primary rounded-md p-3 shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((item, index) => {
              return (
                <div
                  key={index + item.ingredient}
                  className="rounded-full px-4 py-2 bg-yellow-100 text-base text-yellow-800 shadow"
                >
                  {item.measure} {item.ingredient}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

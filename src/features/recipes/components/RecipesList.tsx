import LayoutWrapper from "../../../components/layout/LayoutWrapper";
import RecipeCard from "./RecipeCard";
import type { Meal } from "../../../models/Meal";

interface RecipesListProps {
  recipes: Meal[];
}
export default function RecipesList(props: Readonly<RecipesListProps>) {
  return (
    <LayoutWrapper>
      {props.recipes.map((recipe) => (
        <li key={recipe.idMeal}>
          <RecipeCard recipe={recipe} />
        </li>
      ))}
    </LayoutWrapper>
  );
}

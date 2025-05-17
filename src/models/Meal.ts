/**
 * Acc is an accumulator array, initially empty ([]).
 * On each recursive step, it appends the current length of the array (Acc["length"]).
 * Once the array's length equals N, recursion stops.
 * The final result is Acc[number], which returns a union of all numbers in the array.
 *
 * This works only for smallish ranges
 */
type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

/**
 * Exclude delete from Enumerate<T> all types present in  Enumerate<F>
 */
type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

type Range20 = IntRange<1, 21>;

interface MealBase {
  idMeal: string;
  strMeal: string;
  strMealAlternate?: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  strSource?: string;
  strImageSource?: string;
  strCreativeCommonsConfirmed?: string;
  dateModified?: Date;
}

type IngredientKeys = `strIngredient${Range20}`;
type MeasureKeys = `strMeasure${Range20}`;

export type Meal = MealBase & {
  [K in IngredientKeys]?: string;
} & {
  [K in MeasureKeys]?: string;
};

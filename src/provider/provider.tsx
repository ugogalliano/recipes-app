import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import type { ReactNode } from "react";
import type { Meal } from "../models/Meal";
import { localStorageKey } from "@/config/costants";

type FavoritesContextType = {
  favorites: Meal[];
  toggleFavorite: (meal: Meal) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesContextProvider = ({
  children,
  initialFavorites = [],
}: {
  children: ReactNode;
  initialFavorites: Meal[];
}) => {
  const [favorites, setFavorites] = useState<Meal[]>(initialFavorites);

  /**
   * Updates the localStorage when the user toggles a
   *  recipe as favorite or not.
   */
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(favorites));
  }, [favorites]);

  /**
   * This function update the state of favorites
   */
  const toggleFavorite = useCallback((meal: Meal) => {
    setFavorites((prev) => {
      const exists = prev.find((m) => m.idMeal === meal.idMeal);
      if (exists) {
        return prev.filter((m) => m.idMeal !== meal.idMeal);
      } else {
        return [...prev, meal];
      }
    });
  }, []);

  const value = useMemo<FavoritesContextType>(
    () => ({ favorites, toggleFavorite }),
    [favorites, toggleFavorite]
  );

  return <FavoritesContext value={value}> {children} </FavoritesContext>;
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used in  FavoritesProvider");
  }
  return context;
};

import { createBrowserRouter, RouterProvider } from "react-router";

import Layout from "./shared/layout/Layout";
import { FavoritesContextProvider } from "./provider/provider";
import type { Meal } from "./models/Meal";
import { lazy } from "react";

const Homepage = lazy(() => import("./pages/Homepage"));
const DetailRecipe = lazy(() => import("./pages/DetailRecipePage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Homepage },
      { path: ":idRecipe", Component: DetailRecipe },
      { path: "favorites", Component: FavoritesPage },
    ],
  },
]);

const localStorageKey = import.meta.env.VITE_LOCALSTORAGE_KEY;

function App() {
  const localStorageValue = localStorage.getItem(localStorageKey);

  const initialFavorites: Meal[] = localStorageValue
    ? JSON.parse(localStorageValue)
    : [];

  return (
    <FavoritesContextProvider initialFavorites={initialFavorites}>
      <RouterProvider router={router} />
    </FavoritesContextProvider>
  );
}

export default App;

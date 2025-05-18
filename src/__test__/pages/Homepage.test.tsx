import { fireEvent, render, screen } from "@testing-library/react";
import Homepage from "@/pages/Homepage";
import { useSearchRecipes } from "@/hooks/useSearchRecipes";
import { FavoritesContextProvider } from "@/provider/provider";
import { MemoryRouter } from "react-router";

const recipesFilterByIngredient = [
  {
    strMeal: "Apam balik",
    strMealThumb:
      "https://www.themealdb.com/images/media/meals/adxcbq1619787919.jpg",
    idMeal: "53049",
  },
];

describe("Homepage component", () => {
  const mockedUseSearchRecipes = useSearchRecipes as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows typing banner", () => {
    mockedUseSearchRecipes.mockReturnValue([[], null, false]);
    render(<Homepage />);
    checkBanner(/typing for search recipes./i, "bg-primary");
  });

  test("shows loader when loading", () => {
    /** Mock the return value of costum hook */
    mockedUseSearchRecipes.mockReturnValue(["", null, true]);

    render(<Homepage />);
    const loaders = screen.getAllByTestId("skeleton-loader");
    expect(loaders.length).toBeGreaterThan(0);
    expect(loaders[0]).toBeInTheDocument();
  });

  test("shows error when error exists", () => {
    mockedUseSearchRecipes.mockReturnValue([null, "error", false]);
    render(<Homepage />);
    checkBanner(/warning: an error has occurred./i, "bg-red-400");
  });

  test("shows banner when no recipes found", () => {
    mockedUseSearchRecipes.mockReturnValue([null, null, false]);
    render(<Homepage />);
    checkBanner(/No results found./i, "bg-orange-400");
  });

  test("input updates value correctly", () => {
    render(<Homepage />);
    const input = screen.getByRole("textbox", { name: /search for recipes/i });
    fireEvent.change(input, { target: { value: "milk" } });
    expect(input).toHaveValue("milk");
  });

  test("renders list of recipes filter by ingredient", () => {
    mockedUseSearchRecipes.mockReturnValue([
      recipesFilterByIngredient,
      null,
      false,
    ]);

    render(
      <MemoryRouter>
        <FavoritesContextProvider initialFavorites={[]}>
          <Homepage />
        </FavoritesContextProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Apam balik/i)).toBeInTheDocument();
    const image = screen.getByRole("img", { name: /Apam balik/i });
    expect(image).toHaveAttribute(
      "src",
      recipesFilterByIngredient[0].strMealThumb
    );
  });
});

/** Test Banner */
function checkBanner(sectionLabel: RegExp, expectedClass: string) {
  const message = screen.getByText(sectionLabel);
  expect(message).toBeInTheDocument();

  const section = screen.getByLabelText(sectionLabel);
  expect(section).toBeInTheDocument();

  const icon = section.querySelector("svg");
  expect(icon).toBeInTheDocument();
  expect(icon).toHaveAttribute("aria-hidden", "true");
  expect(icon).toHaveAttribute("focusable", "false");

  expect(section).toHaveClass(expectedClass);
}

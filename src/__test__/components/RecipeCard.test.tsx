import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RecipeCard from "@/features/recipes/components/RecipeCard";
import { useFavorites } from "@/provider/provider";
import { MemoryRouter, Route, Routes, useLocation } from "react-router";
import { mockRecipeCard } from "../mockRecipe/mock";

jest.mock("@/provider/provider");

const DetailPage = () => {
  const location = useLocation();
  return <div data-testid="idMealTest">{location.pathname}</div>;
};

describe("Recipe Card", () => {
  const mockedUseFavorites = useFavorites as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders recipe information correctly", () => {
    mockedUseFavorites.mockReturnValue({
      favorites: [{ idMeal: "123" }],
      toggleFavorite: jest.fn(),
    });

    render(
      <MemoryRouter>
        <RecipeCard recipe={mockRecipeCard} />
      </MemoryRouter>
    );

    checkInformationRecipe(false);
  });

  it("renders recipe information correctly when favorite", () => {
    mockedUseFavorites.mockReturnValue({
      favorites: [{ idMeal: mockRecipeCard.idMeal }],
      toggleFavorite: jest.fn(),
    });

    render(
      <MemoryRouter>
        <RecipeCard recipe={mockRecipeCard} />
      </MemoryRouter>
    );
    checkInformationRecipe(true);
  });

  it("renders recipe information correctly when click toggleFavorite", async () => {
    const toggleFavoriteMock = jest.fn();

    mockedUseFavorites.mockReturnValue({
      favorites: [],
      toggleFavorite: toggleFavoriteMock,
    });

    const { rerender } = render(
      <MemoryRouter>
        <RecipeCard recipe={mockRecipeCard} />
      </MemoryRouter>
    );

    checkInformationRecipe(false);
    const starIcon = screen.getByLabelText(/aggiungi|rimuovi.*preferiti/i);
    fireEvent.click(starIcon);
    expect(toggleFavoriteMock).toHaveBeenCalledTimes(1);

    mockedUseFavorites.mockReturnValue({
      favorites: [mockRecipeCard],
      toggleFavorite: toggleFavoriteMock,
    });

    rerender(
      <MemoryRouter>
        <RecipeCard recipe={mockRecipeCard} />
      </MemoryRouter>
    );

    /** Now is preferite! */
    checkInformationRecipe(true);
  });

  it("renders recipe information correctly when click toggleFavorite", async () => {
    const toggleFavoriteMock = jest.fn();

    mockedUseFavorites.mockReturnValue({
      favorites: [],
      toggleFavorite: toggleFavoriteMock,
    });

    const { rerender } = render(
      <MemoryRouter>
        <RecipeCard recipe={mockRecipeCard} />
      </MemoryRouter>
    );

    checkInformationRecipe(false);
    const starIcon = screen.getByLabelText(/aggiungi|rimuovi.*preferiti/i);
    fireEvent.click(starIcon);
    expect(toggleFavoriteMock).toHaveBeenCalledTimes(1);

    mockedUseFavorites.mockReturnValue({
      favorites: [mockRecipeCard],
      toggleFavorite: toggleFavoriteMock,
    });

    rerender(
      <MemoryRouter>
        <RecipeCard recipe={mockRecipeCard} />
      </MemoryRouter>
    );

    /** Now is preferite! */
    checkInformationRecipe(true);
  });

  it("navigates to detail page when 'View Recipe' button is clicked", () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<RecipeCard recipe={mockRecipeCard} />} />
          <Route path="/:idRecipe" element={<DetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /view recipe/i });
    fireEvent.click(button);

    const locationDisplay = screen.getByTestId("idMealTest");
    expect(locationDisplay).toHaveTextContent(mockRecipeCard.idMeal);
  });
});

/** Test Information Recipe */
function checkInformationRecipe(isFavorite: boolean) {
  const nameRecipe = mockRecipeCard.strMeal;
  const descriptionSection = `${mockRecipeCard.strArea} : ${mockRecipeCard.strCategory}`;
  const videoAriaLabelText = "Recipe video";
  const sourceAriaLabelText = "Source link for the recipe";
  const labelDetailText = "View Recipe";
  const imageRecipedCard = mockRecipeCard.strMealThumb;
  const image = screen.getByRole("img", { name: nameRecipe });

  /** Image Card */
  expect(image).toHaveAttribute("src", imageRecipedCard);

  /** Texts Card */
  expect(screen.getByText(nameRecipe)).toBeInTheDocument();
  expect(screen.getByText(descriptionSection)).toBeInTheDocument();
  expect(screen.getByLabelText(videoAriaLabelText)).toBeInTheDocument();
  expect(screen.getByLabelText(sourceAriaLabelText)).toBeInTheDocument();
  expect(screen.getByText(labelDetailText)).toBeInTheDocument();

  const starHTMLElement = screen.getByLabelText(/aggiungi|rimuovi.*preferiti/i);
  if (isFavorite) {
    expect(starHTMLElement).toHaveClass("fill-yellow-500");
  } else {
    expect(starHTMLElement).not.toHaveClass("fill-yellow-500");
  }
}

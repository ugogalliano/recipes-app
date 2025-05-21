import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../../shared/header/Header";
import { MemoryRouter } from "react-router";

describe("Header component", () => {
  it("renders the title with link to home", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const titleLink = screen.getByRole("link", { name: /recipe finder/i });
    expect(titleLink).toBeInTheDocument();
    expect(titleLink).toHaveAttribute("href", "/");
  });

  it("renders the link to favorite recipes", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const favoritesLink = screen.getByRole("link", {
      name: /go to your list of favorite recipes/i,
    });
    expect(favoritesLink).toBeInTheDocument();
    expect(favoritesLink).toHaveAttribute("href", "/favorites");
  });

  it("renders the Heart icon in the favorites link", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const favoritesLink = screen.getByRole("link", {
      name: /go to your list of favorite recipes/i,
    });

    const heartIcon = favoritesLink.querySelector("svg");

    expect(heartIcon).toBeInTheDocument();
  });
});

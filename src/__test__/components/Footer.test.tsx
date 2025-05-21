import { render, screen } from "@testing-library/react";
import { githubUrl, linkedinUrl } from "@/config/costants";
import Footer from "@/shared/footer/Footer";

describe("Footer component", () => {
  it("renders the h1 with correct text", () => {
    render(<Footer />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/created by ugo galliano/i);
    expect(heading).toHaveTextContent(/2024/i);
  });

  it("renders LinkedIn link with correct href", () => {
    render(<Footer />);
    const linkedinLink = screen.getByRole("link", { name: /linkedin/i });
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute("href", linkedinUrl);
    expect(linkedinLink).toHaveAttribute("target", "_blank");
  });

  it("renders GitHub link with correct href", () => {
    render(<Footer />);
    const githubLink = screen.getByRole("link", { name: /github/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", githubUrl);
    expect(githubLink).toHaveAttribute("target", "_blank");
  });
});

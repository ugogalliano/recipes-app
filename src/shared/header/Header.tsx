import { Heart } from "lucide-react";
import { Link } from "react-router";

const Header = () => {
  return (
    <div className="container bg-primary mx-auto flex items-center justify-between px-4 py-6">
      <h1
        className="text-2xl md:text-4xl font-bold tracking-tight"
        aria-label="Recipe Finder Home"
      >
        <Link to="/" className="hover:opacity-90  ">
          Recipe Finder
        </Link>
      </h1>

      <nav aria-label="Main Navigation">
        <Link
          to="/favorites"
          className="flex items-center space-x-2 text-lg md:text-xl hover:underline "
          aria-label="Go to your list of favorite recipes"
        >
          <Heart className="w-6 h-6" aria-hidden="true" />
          <span>Favorite Recipes</span>
        </Link>
      </nav>
    </div>
  );
};

export default Header;

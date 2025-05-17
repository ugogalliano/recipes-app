import { useCallback } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import type { SearchType } from "../models/SearchType";

interface SearchBoxProps {
  setQuery: (query: string) => void;
  typeOfSearch: SearchType;
  setTypeOfSearch: (typeOfSeach: SearchType) => void;
}
export default function SearchBox({
  setQuery,
  typeOfSearch,
  setTypeOfSearch,
}: Readonly<SearchBoxProps>) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    [setQuery]
  );

  const handleTypeOfSearch = (key: SearchType) => setTypeOfSearch(key);

  return (
    <div className="bg-primary rounded-b-md py-5 px-10">
      <div className="md:flex-row flex  justify-end items-center flex-col pb-3 gap-4 ">
        <Button
          variant={typeOfSearch !== "ingredient" ? "outline" : "secondary"}
          onClick={() => handleTypeOfSearch("ingredient")}
        >
          Search by Ingredient
        </Button>
        <Button
          variant={typeOfSearch !== "keyword" ? "outline" : "secondary"}
          onClick={() => handleTypeOfSearch("keyword")}
        >
          Search by Keyword
        </Button>
      </div>

      <Input
        name="search"
        className="bg-white"
        placeholder="Search Recipes..."
        onChange={handleChange}
        aria-label="Search for recipes"
      />
    </div>
  );
}

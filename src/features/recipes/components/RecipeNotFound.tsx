import Banner from "../../../shared/banner/Banner";
import { ArchiveX } from "lucide-react";

export default function RecipeNotFound() {
  return (
    <Banner
      icon={ArchiveX}
      message="No results found."
      className="bg-orange-400"
    />
  );
}

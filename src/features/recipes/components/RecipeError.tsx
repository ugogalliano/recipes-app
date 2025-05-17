import { TriangleAlert } from "lucide-react";
import Banner from "../../../shared/banner/Banner";

export default function RecipesError() {
  return (
    <Banner
      icon={TriangleAlert}
      message="Warning: An error has occurred."
      className="bg-red-400"
    />
  );
}

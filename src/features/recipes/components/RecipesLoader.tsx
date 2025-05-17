import Skeleton from "../../../shared/skeleton/Skeleton";
import LayoutWrapper from "../../../components/layout/LayoutWrapper";

export default function RecipesLoader() {
  return (
    <LayoutWrapper>
      {[...Array(10).keys()].map((_, index) => (
        <Skeleton key={index} className="mt-3 w-96 h-96" />
      ))}
    </LayoutWrapper>
  );
}

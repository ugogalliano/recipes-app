import { type LucideProps } from "lucide-react";
import { cn } from "../../lib/utils";

interface BannerProps {
  message: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  className?: string;
}
export default function Banner({
  icon: Icon,
  message,
  className,
}: Readonly<BannerProps>) {
  return (
    <section
      className={cn(
        "bg-primary p-6 rounded-2xl  md:max-w-[500px] mt-10 mx-3  md:mx-auto shadow-md flex items-center space-x-4",
        className
      )}
      aria-label="Search instruction"
    >
      <Icon className="w-8 h-8 " focusable="false" aria-hidden="true" />

      <h1 className="text-lg font-semibold text-gray-800">{message}</h1>
    </section>
  );
}

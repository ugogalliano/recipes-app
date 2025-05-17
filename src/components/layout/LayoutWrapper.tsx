import type { ReactNode } from "react";

type Props = { children: ReactNode };

const LayoutWrapper = (props: Props) => {
  return (
    <ul
      className={
        "grid md:grid-cols-3 gap-6 grid-cols-1 px-2 mt-5 md:mt-0 md:p-5"
      }
      data-testid="layout-wrapper"
    >
      {props.children}
    </ul>
  );
};

export default LayoutWrapper;

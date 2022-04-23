import type { PropsWithChildren } from "react";

const Header = <T,>(props: PropsWithChildren<T>) => {
  return (
    <div className="h-16 w-full border-b-8 divide-y-8 border-sky-500">
      <div className="flex items-center h-full w-full">{props.children}</div>
    </div>
  );
};

export default Header;

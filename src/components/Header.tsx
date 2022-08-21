import type { PropsWithChildren } from "react";

const Header = <T,>(props: PropsWithChildren<T>) => {
  return (
    <div className="h-16 w-full border-b-8 divide-y-8 border-sky-500">
      <div className="flex justify-between flex-row h-full p-2">
        {props.children}
      </div>
    </div>
  );
};

export default Header;

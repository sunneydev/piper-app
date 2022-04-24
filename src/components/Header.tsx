import type { PropsWithChildren } from "react";

const Header = <T,>(props: PropsWithChildren<T>) => {
  return (
    <div className="h-22 w-full border-b-8 divide-y-8 border-sky-500">
      <div className="flex items-center flex-row-reverse h-full p-5">
        {props.children}
      </div>
    </div>
  );
};

export default Header;

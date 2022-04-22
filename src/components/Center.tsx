import { PropsWithChildren } from "react";

const Center = <T,>({ children }: PropsWithChildren<T>) => (
  <div className="flex items-center justify-center h-full">{children}</div>
);

export default Center;

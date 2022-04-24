import { PropsWithChildren } from "react";

const Center = <T,>({ children }: PropsWithChildren<T>) => (
  <div className="h-screen">
    <div className="flex items-center justify-center h-screen">{children}</div>
  </div>
);

export default Center;

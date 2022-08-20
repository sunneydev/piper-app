import { PropsWithChildren } from "react";

const Center = <T,>({
  children,
  className,
}: PropsWithChildren<T> & {
  className?: string;
}) => (
  <div className={`h-screen ${className}`}>
    <div className="flex items-center justify-center h-screen">{children}</div>
  </div>
);

export default Center;

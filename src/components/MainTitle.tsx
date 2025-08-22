import type { HTMLAttributes, PropsWithChildren } from "react";

const MainTitle = ({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) => {
  return (
    <h1 className={`text-5xl lg:text-6xl font-bold text-red-600 italic ${className}`} {...props}>
      {children}
    </h1>
  );
};

export default MainTitle;

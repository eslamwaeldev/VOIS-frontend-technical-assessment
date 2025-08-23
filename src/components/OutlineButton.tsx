import type { ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren } from "react";

const OutlineButton = ({
  children,
  className,
  ...props
}: PropsWithChildren<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>) => {
  return (
    <button
      className={`border-2 h-11 shadow-sm  border-gray-300 hover:border-transparent hover:bg-red-500 hover:text-gray-50 rounded-lg p-2 transition-all duration-150 font-medium ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default OutlineButton;

import type { ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren } from "react";

const FilledButton = ({
  children,
  className,
  ...props
}: PropsWithChildren<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>) => {
  return (
    <button
      className={` h-11 shadow-sm text-gray-50 border-gray-300 bg-vodafone-gray dark:bg-gray-100 dark:text-vodafone-red hover:bg-red-500 hover:text-gray-50 rounded-lg p-2 transition-all duration-150 font-medium ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default FilledButton;

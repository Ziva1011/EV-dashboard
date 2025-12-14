import React from "react";

type ButtonVariant = "primary" | "secondary";

const buttonClasses: Record<ButtonVariant, string> = {
  primary: "bg-violet-500 hover:bg-violet-700 text-white w-full",
  secondary: "text-gray-500 underline hover:text-gray-700",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  ...rest
}) => {
  return (
    <button
      className={`${buttonClasses[variant]} font-bold py-2 px-4 rounded hover:cursor-pointer`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

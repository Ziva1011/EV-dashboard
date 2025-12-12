import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  color = "violet",
  type = "submit",
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

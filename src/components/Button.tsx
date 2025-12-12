import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  color = "blue",
  type = "submit",
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`bg-${color}-500 hover:bg-${color}-700 text-white font-bold py-2 px-4 rounded`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

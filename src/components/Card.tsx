import React from "react";

type CardProps = {
  title?: string;
  children?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="overflow-hidden shadow-lg bg-white rounded-xl h-auto">
      <div className="px-6 py-4">
        <div className="font-bold text mb-2">{title}</div>
        <div className="text-gray-700 text-base">{children}</div>
      </div>
    </div>
  );
};

export default Card;

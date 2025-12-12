
import React from "react";

type NavbarProps = {
    children?: React.ReactNode;
    n_nav_links?: number;
    variant?: string; 
}

const Navbar: React.FC<NavbarProps> = ({ children, n_nav_links, variant }) => {
  return(
    <nav className="w-full h-16 flex items-center px-6 bg-white shadow">
      <div className="flex items-center justify-between w-full">
        <div className="font-bold text-xl text-black">EV Simulation</div>
        <div className="flex gap-6">{children}</div>
        </div>
    </nav>
  )
};


export default Navbar

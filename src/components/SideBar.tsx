import React from "react";
import { useState } from "react";

const SideBar: React.FC<{}> = ({}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);

  return (
    <aside
      className={`sticky top-0 h-screen shrink-0 border-r border-slate-200 bg-white
        ${sidebarCollapsed ? "w-14" : "w-52"}`}
      aria-label="Main navigation"
    >
      <div className={`flex flex-col`}>
        <button
          type="button"
          onClick={toggleSidebar}
          className="h-12 flex items-center justify-center border-b border-slate-200 hover:bg-slate-50 hover:cursor-pointer"
          aria-expanded={!sidebarCollapsed}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <span className="w-6 h-0.5 bg-slate-700 relative before:content-[''] before:absolute before:w-6 before:h-0.5 before:bg-slate-700 before:-translate-y-1.5 after:content-[''] after:absolute after:w-6 after:h-0.5 after:bg-slate-700 after:translate-y-1.5 " />
        </button>

        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            <li className="bg-violet-100 hover:bg-violet-200">
              <button
                type="button"
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700  hover:cursor-pointer"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg  text-violet-600 text-base hover:cursor-pointer ">
                  D
                </span>
                {!sidebarCollapsed && <span>Dashboard</span>}
              </button>
            </li>
            <li className="hover:bg-violet-200">
              <button
                type="button"
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:cursor-pointer"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:cursor-pointer text-violet-600 text-base">
                  M
                </span>
                {!sidebarCollapsed && <span>My Charging Stations</span>}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;

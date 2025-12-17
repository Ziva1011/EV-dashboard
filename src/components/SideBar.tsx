import React from "react";
import { useState } from "react";

const SideBar: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);

  return (
    <aside
      className={`sticky top-0 md:h-screen md:shrink-0 border-r bg-white border-slate-200 md:bg-white
        ${sidebarCollapsed ? "w-8 md:w-14" : "w-52 border-slate-200 "}`}
      aria-label="Main navigation"
    >
      <div className={`flex flex-col`}>
        <button
          type="button"
          onClick={toggleSidebar}
          className=" md:rounded-none h-12 flex items-center justify-center md:border-b md:border-slate-200 hover:bg-slate-50 hover:cursor-pointer"
          aria-expanded={!sidebarCollapsed}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
            />
          </svg>
        </button>

        <nav className="flex-1 py-4">
          <ul
            className={`space-y-1 md:block ${
              sidebarCollapsed ? "hidden " : "block"
            } `}
          >
            <li className="bg-violet-100 hover:bg-violet-200">
              <button
                type="button"
                className={`flex w-full items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:cursor-pointer
          ${sidebarCollapsed ? "justify-center" : "justify-start"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-violet-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                  />
                </svg>
                {!sidebarCollapsed && <span>Dashboard</span>}
              </button>
            </li>
            {/*             <li className="hover:bg-violet-200 ">
              <button
                type="button"
                className={`flex w-full items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:cursor-pointer
          ${sidebarCollapsed ? "justify-center" : "justify-start"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-violet-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
                  />
                </svg>

                {!sidebarCollapsed && <span>My Charging Stations</span>} 
              </button>
            </li>*/}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;

import Dashboard from "./features/Dashboard";
import "./App.css";
import { useState } from "react";
function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);

  return (
    <>
      <div className="flex min-h-screen">
        <aside
          className={`flex flex-col border-r border-slate-200 bg-white transition-[width] duration-300 ease-in-out
        ${sidebarCollapsed ? "w-14" : "w-52"}`}
          aria-label="Main navigation"
        >
          <button
            type="button"
            onClick={toggleSidebar}
            className="h-12 flex items-center justify-center border-b border-slate-200 hover:bg-slate-50"
            aria-expanded={!sidebarCollapsed}
            aria-label={
              sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
          >
            {/* simple icon */}
            <span className="w-6 h-0.5 bg-slate-700 relative before:content-[''] before:absolute before:w-6 before:h-0.5 before:bg-slate-700 before:-translate-y-1.5 after:content-[''] after:absolute after:w-6 after:h-0.5 after:bg-slate-700 after:translate-y-1.5" />
          </button>

          <nav className="flex-1 py-4">
            <ul className="space-y-1">
              <li>
                <button
                  type="button"
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-600 text-base">
                    A
                  </span>
                  {!sidebarCollapsed && <span>Analytics</span>}
                </button>
              </li>
              {/* more items */}
            </ul>
          </nav>
        </aside>
        <main className="flex-1 max-w-6xl mx-auto p-6">
          <Dashboard />
        </main>
      </div>
    </>
  );
}

export default App;

import Dashboard from "./features/Dashboard";
import "./App.css";
import { useState } from "react";
import SideBar from "./components/SideBar";

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);

  return (
    <>
      <div className="flex min-h-screen">
        <SideBar />

        <main className="flex-1 max-w-7xl mx-auto p-6">
          <Dashboard />
        </main>
      </div>
    </>
  );
}

export default App;

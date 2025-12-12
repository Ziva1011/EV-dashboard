import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Button from "./components/Button";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import SimulationForm from "./features/SimulationForm";
import Modal from "./components/Modal";
import SimulationChart from "./features/Charts";

interface SimulationInputs {
  numChargePoints: number;
  arrivalMultiplier: number;
  carConsumption: number;
  chargingPower: number;
}

function App() {
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState<SimulationInputs>({
    numChargePoints: 20,
    arrivalMultiplier: 100,
    carConsumption: 18,
    chargingPower: 11,
  });

  const handleSubmit = (inputs: any) => {
    console.log("Form submitted:", inputs);
    setOpen(false);
  };

  return (
    <>
      <div className="container mx-auto mt-8 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">Analytics</h1>

          {/* Toggle */}
          <div className="flex space-x-2">
            <button className="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium">
              Year
            </button>
            <button className="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium">
              Month
            </button>
            <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 font-medium">
              Week
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card title="First">gibberish</Card>
          <Card title="Second">gibberish</Card>

          <Card title="Third">gibberish</Card>
          <div className="flex justify-center items-center border border-gray-300 rounded-md shadow p-4">
            <Button onClick={() => setOpen(true)}>Open Simulation Form</Button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Cars per day</h2>
          <SimulationChart />
        </div>
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Simulation Settings</h2>

        <SimulationForm simulationInputs={inputs} onSubmit={handleSubmit} />
      </Modal>
    </>
  );
}

export default App;

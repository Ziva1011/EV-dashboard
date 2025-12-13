import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Button from "./components/Button";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import SimulationForm from "./features/SimulationForm";
import Modal from "./components/Modal";
import SimulationChart from "./features/charts/PowerChart";
import EnergyChart from "./features/charts/EnergyChart";
import EventsChart from "./features/charts/EventsChart";
import Charts2 from "./features/charts/Charts2";

export interface SimulationInputs {
  numChargePoints: number;
  arrivalMultiplier: number;
  carConsumption: number;
  chargingPower: number;
}

const timeIntervalOptions = ["Day", "Week", "Month", "Year"] as const;
export type TimeInterval = (typeof timeIntervalOptions)[number];

function App() {
  const [open, setOpen] = useState(false);
  const [timeInterval, setTimeInterval] = useState<TimeInterval>("Day");
  const [inputs, setInputs] = useState<SimulationInputs>({
    numChargePoints: 20,
    arrivalMultiplier: 100,
    carConsumption: 18,
    chargingPower: 11,
  });

  const handleSubmit = (parameters: any) => {
    console.log("Form submitted:", parameters);
    setInputs(parameters);
    setOpen(false);
  };

  const handleToggle = (value: TimeInterval) => {
    setTimeInterval(value);
    console.log(inputs);
  };

  return (
    <>
      <div className="container mx-auto mt-8 space-y-6">
        <main>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="text-2xl font-bold mb-4 md:mb-0">Analytics</h1>

            {/* Time toogle */}
            <div className="flex space-x-2">
              {timeIntervalOptions.map((option, key) => (
                <button
                  className={`px-4 py-2 rounded-md ${
                    timeInterval == option
                      ? `bg-violet-600 text-white hover:bg-violet-700`
                      : `bg-white border border-gray-300 text-gray-700 hover:bg-gray-100`
                  }  font-medium`}
                  onClick={() => handleToggle(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card title="Total Energy Charged" value={30}>
              kWh
            </Card>
            <Card title="Total Number of Charging Events" value={40}>
              per year
            </Card>

            <Card title="Third" value={40}></Card>
            <div className="flex justify-center items-center border border-transparent rounded-md  p-4">
              <Button onClick={() => setOpen(true)}>
                Open Simulation Form
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Power per day</h2>
            <SimulationChart
              simulationInputs={inputs}
              timeInterval={timeInterval}
            />
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">
              Energy consumption per {timeInterval}
            </h2>
            <EnergyChart
              simulationInputs={inputs}
              timeInterval={timeInterval}
            />
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">
              Events per {timeInterval}
            </h2>
            <EventsChart
              simulationInputs={inputs}
              timeInterval={timeInterval}
            />
          </div>
          {/* <Charts2 simulationInputs={inputs} timeInterval={timeInterval} /> */}
        </main>
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Simulation Settings</h2>

        <SimulationForm
          onSubmit={handleSubmit}
          onClose={() => setOpen(false)}
          simulationInputs={inputs}
        />
      </Modal>
    </>
  );
}

export default App;

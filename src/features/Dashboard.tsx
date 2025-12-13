import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Button from "../components/Button";
import Card from "../components/Card";
import SimulationForm from ".//SimulationForm";
import Modal from "../components/Modal";
import SimulationChart from "./charts/PowerChart";
import EnergyChart from "./charts/EnergyChart";
import EventsChart from "./charts/EventsChart";

export interface SimulationInputs {
  numChargePoints: number;
  arrivalMultiplier: number;
  carConsumption: number;
  chargingPower: number;
}

const timeIntervalOptions = ["Day", "Week", "Month", "Year"] as const;
export type TimeInterval = (typeof timeIntervalOptions)[number];

function Dashboard() {
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
      <div className="mt-3">
        <div className="flex flex-col mb-5 md:flex-row justify-between items-start md:items-center ">
          <div className="text-left ">
            <h1 className="text-2xl font-bold mb-4 md:mb-0">Analytics</h1>
            <p className="text-sm text-gray-500 font-light ">
              Anaylize your energy consumption
            </p>
          </div>

          {/* Time toogle */}
          <div className="flex space-x-2">
            {timeIntervalOptions.map((option, key) => (
              <button
                className={`px-6 py-2 text-sm font-light rounded-md ${
                  timeInterval == option
                    ? `border-2 border-violet-600/50 text-violet-600 bg-violet-100 hover:bg-violet-200`
                    : `border border-violet-600/50 text-violet-600  hover:bg-violet-200`
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
            <Button onClick={() => setOpen(true)}>Open Simulation Form</Button>
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
          <EnergyChart simulationInputs={inputs} timeInterval={timeInterval} />
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            Events per {timeInterval}
          </h2>
          <EventsChart simulationInputs={inputs} timeInterval={timeInterval} />
        </div>
        {/* <Charts2 simulationInputs={inputs} timeInterval={timeInterval} /> */}
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

export default Dashboard;

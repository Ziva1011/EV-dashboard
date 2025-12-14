import { useState } from "react";
import Button from "../components/Button";
import SimulationForm from ".//SimulationForm";
import Modal from "../components/Modal";
import SimulationChart from "./charts/PowerChart";
import EnergyChart from "./charts/EnergyChart";
import EventsChart from "./charts/EventsChart";
import OverviewChart from "./charts/OverviewChart";
import Card from "../components/Card";

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
      <div className="mt-3 space-y-4 md:space-y-7">
        <div className="flex flex-col space-y-6 md:flex-row justify-between items-start md:items-center ">
          <div className="text-left space-y-2 md:space-y-4">
            <h1 className="text-2xl font-bold ">EV Charging Analytics</h1>
            <p className="text-sm text-gray-500 font-light ">
              Anaylize your energy consumption
            </p>
          </div>

          {/* Time toogle */}
          <div className="flex space-x-2 self-center">
            {timeIntervalOptions.map((option, key) => (
              <button
                key={key}
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
        <div className="flex flex-col space-y-10 md:flex-row md:gap-x-10">
          <aside className="w-full shrink-0 md:w-64 md:order-1">
            <Card>
              <div className="space-y-4 md:space-y-8">
                <SimulationForm
                  onSubmit={handleSubmit}
                  onClose={() => setOpen(false)}
                  simulationInputs={inputs}
                />
              </div>
            </Card>
          </aside>
          <div className="flex-1 space-y-5 md:order-0">
            <Card>
              <h2 className="text-lg font-semibold mb-4">Power per day</h2>
              <SimulationChart
                simulationInputs={inputs}
                timeInterval={timeInterval}
              />
            </Card>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <h2 className="text-lg font-semibold mb-4">
                  Energy consumption per {timeInterval}
                </h2>
                <EnergyChart
                  simulationInputs={inputs}
                  timeInterval={timeInterval}
                />
              </Card>
              <Card>
                <h2 className="text-lg font-semibold mb-4">
                  Events per {timeInterval}
                </h2>
                <EventsChart
                  simulationInputs={inputs}
                  timeInterval={timeInterval}
                />
              </Card>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Power per day</h2>
              <OverviewChart
                simulationInputs={inputs}
                timeInterval={timeInterval}
              />
            </div>
          </div>
        </div>
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

import React from "react";
import type { Props } from "recharts/types/container/Surface";
import { useState } from "react";
import Button from "../components/Button";

interface SimulationInputs {
  numChargePoints: number;
  arrivalMultiplier: number; // as percentage, e.g. 100
  carConsumption: number; // kWh
  chargingPower: number; // kW
}

interface SimulationFormProps {
  onSubmit: (inputs: SimulationInputs) => void;
  onClose: () => void;
  simulationInputs: SimulationInputs;
}

const SimulationForm: React.FC<SimulationFormProps> = ({
  onSubmit,
  onClose,
  simulationInputs,
}) => {
  const [inputs, setInputs] = useState<SimulationInputs>(simulationInputs);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(inputs);
    onSubmit(inputs);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.id, e.target.value);
    setInputs({ ...inputs, [e.target.id]: Number(e.target.value) });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="numChargePoints"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Number of charge points
          </label>
          <input
            type="number"
            id="numChargePoints"
            min="0"
            max="20"
            value={inputs.numChargePoints}
            onChange={handleChange}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="arrivalMultiplier"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Arrival probability
          </label>
          <input
            type="number"
            id="arrivalMultiplier"
            value={inputs.arrivalMultiplier}
            onChange={handleChange}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="carConsumption"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Average Car Consumption (kW)
          </label>
          <input
            type="number"
            id="carConsumption"
            value={inputs.carConsumption}
            onChange={handleChange}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="chargingPower"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Charging Power
          </label>
          <input
            type="number"
            id="chargingPower"
            value={inputs.chargingPower}
            onChange={handleChange}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            required
          />
        </div>
        <div className="flex flex-row">
          <Button color="gray" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => onSubmit(inputs)}>Submit</Button>
        </div>
      </form>
    </>
  );
};

export default SimulationForm;

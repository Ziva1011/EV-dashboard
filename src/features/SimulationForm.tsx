import React from "react";
import type { Props } from "recharts/types/container/Surface";
import { useState } from "react";
import Button from "../components/Button";
import type { SimulationInputs } from "../App";

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
    onSubmit(inputs);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputs({ ...inputs, [id]: value });
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputs({ ...inputs, [id]: value === "" ? 0 : Number(value) });
  };

  const inputFields = [
    {
      id: "numChargePoints",
      label: "Number of charge points",
      suffix: "",
      min: 0,
      max: 20,
    },
    {
      id: "arrivalMultiplier",
      label: "Arrival probability",
      suffix: "%",
      min: 20,
      max: 200,
    },
    {
      id: "carConsumption",
      label: "Average Car Consumption ",
      suffix: "kWh",
    },
    {
      id: "chargingPower",
      label: "Charging Power per Chargepoint (kW)",
      suffix: "kW",
    },
  ] as const;

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        {inputFields.map((input) => {
          const value = inputs[input.id as keyof SimulationInputs];
          return (
            <div className="mb-5 relative">
              <label
                htmlFor={input.id}
                className="block mb-2.5 text-sm font-medium text-heading "
              >
                {input.label}
              </label>
              <div className="flex items-center rounded-base bg-neutral-secondary-medium border border-default-medium px-3 py-2.5 shadow-xs focus-within:ring-2 focus-within:ring-brand focus-within:border-brand">
                <input
                  type="number"
                  id={input.id}
                  value={value}
                  //min and max missing
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="flex-1 bg-transparent border-0 focus:ring-0 text-heading text-sm md:text-base outline-none"
                  required
                />
                <span className="ml-2 text-gray-500 font-medium">
                  {input.suffix}
                </span>
              </div>
            </div>
          );
        })}

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 underline hover:text-gray-700 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancel
          </button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </>
  );
};

export default SimulationForm;

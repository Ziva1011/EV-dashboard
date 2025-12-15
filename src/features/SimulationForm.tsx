import React, { useState } from "react";
import Button from "../components/Button";
import type { SimulationInputs } from "./Dashboard";
import { useEffect } from "react";

interface SimulationFormProps {
  onSubmit: (inputs: SimulationInputs) => void;
  onClose?: () => void;
  simulationInputs: SimulationInputs;
}

type InputField = {
  id: keyof SimulationInputs;
  label: string;
  suffix?: string;
  min?: number;
  max?: number;
  errorMessage?: string;
};

type Errors = Partial<Record<keyof SimulationInputs, boolean>>;

const SimulationForm: React.FC<SimulationFormProps> = ({
  onSubmit,
  simulationInputs,
}) => {
  const [inputs, setInputs] = useState<SimulationInputs>(simulationInputs);
  const [errors, setErrors] = useState<Errors>({});
  const [onSuccess, setOnSuccess] = useState<boolean>(true);

  const inputFields: InputField[] = [
    {
      id: "numChargePoints",
      label: "Number of charge points",
      min: 0,
      max: 20,
      errorMessage: "Charge points must be between 0 and 20.",
    },
    {
      id: "arrivalMultiplier",
      label: "Arrival probability",
      suffix: "%",
      min: 20,
      max: 200,
      errorMessage: "Arrival probability must be between 20% and 200%.",
    },
    {
      id: "carConsumption",
      label: "Average Car Consumption",
      suffix: "kWh",
      min: 0,
      max: 1000,
      errorMessage: "Car consumption must be positive and 1000kWh or less",
    },
    {
      id: "chargingPower",
      label: "Charging Power per Chargepoint",
      suffix: "kW",
      min: 0,
      max: 2000,
      errorMessage: "Charging power must be positive and 2000 kW or less.",
    },
  ];

  // Validate a single value
  const validateInput = (value: number, min?: number, max?: number) => {
    if (Number.isNaN(value)) return false;
    if (min !== undefined && value < min) return false;
    if (max !== undefined && value > max) return false;
    return true;
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputs({ ...inputs, [id]: Number(value) });
  };

  // Validate on blur
  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const field = inputFields.find((f) => f.id === id)!;
    const numberValue = Number(value);

    const isValid = validateInput(numberValue, field.min, field.max);

    setErrors((prev) => ({
      ...prev,
      [id]: !isValid,
    }));
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all inputs
    const newErrors: Errors = {};
    inputFields.forEach((field) => {
      const value = inputs[field.id];
      newErrors[field.id] = !validateInput(value, field.min, field.max);
    });
    setErrors(newErrors);

    // Prevent submit if any error
    if (Object.values(newErrors).some(Boolean)) return;
    setOnSuccess(true);
    onSubmit(inputs);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setOnSuccess(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onSuccess]);

  return (
    <>
      <h3 className="text-md font-semibold text-left">Simulation Parameters</h3>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto" noValidate>
        {inputFields.map((field) => {
          const value = inputs[field.id];
          const hasError = errors[field.id];

          return (
            <div key={field.id} className="mb-5 text-left">
              <label
                htmlFor={field.id}
                className="block mb-1 text-sm text-heading"
              >
                {field.label}
              </label>
              <div
                className={`flex items-center rounded-md bg-neutral-secondary-medium border px-3 py-2.5 shadow-xs focus-within:ring-1  ${
                  hasError
                    ? "border-red-500 focus-within:ring-red-500"
                    : "border-slate-400 focus-within:ring-violet-500"
                }`}
              >
                <input
                  type="number"
                  id={field.id}
                  value={value}
                  min={field.min}
                  max={field.max}
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="flex-1 min-w-0 bg-transparent border-0 focus:ring-0 text-heading text-sm md:text-base outline-none"
                />
                <span className="ml-2 text-gray-500 font-medium">
                  {field.suffix}
                </span>
              </div>
              {hasError && (
                <p className="mt-1 text-sm text-red-600">
                  {field.errorMessage}
                </p>
              )}
            </div>
          );
        })}

        <div className="flex justify-end space-x-4 mt-3 ">
          <Button variant="primary" type="submit">
            Save
          </Button>
        </div>
        {onSuccess && (
          <div className="bg-green-200/90 text-green-700 rounded-sm shadow-sm mt-3">
            <p className="text-sm">Changes were saved successfully</p>
          </div>
        )}
      </form>
    </>
  );
};

export default SimulationForm;

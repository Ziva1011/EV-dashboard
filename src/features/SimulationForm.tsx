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

type CustomCharges = {
  power: number;
  amount: number;
};

type Errors = Partial<Record<keyof SimulationInputs, boolean>>;

const SimulationForm: React.FC<SimulationFormProps> = ({
  onSubmit,
  simulationInputs,
}) => {
  const [inputs, setInputs] = useState<SimulationInputs>(simulationInputs);
  const [errors, setErrors] = useState<Errors>({});
  const [onSuccess, setOnSuccess] = useState<boolean>(false);

  const [useCustomCharge, setUseCustomCharge] = useState<boolean>(false);
  const [customCharges, setCustomCharge] = useState<CustomCharges[]>([
    { power: 11, amount: inputs.numChargePoints },
  ]);

  const inputFields: InputField[] = [
    {
      id: "numChargePoints",
      label: "Number of Charging Points",
      min: 0,
      max: 20,
      errorMessage: "Charge points must be between 0 and 20.",
    },
    {
      id: "arrivalMultiplier",
      label: "Arrival Probability",
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
      label: "Charging Power per Charging Point",
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

  const removeCustomCharge = (indexToRemove: number) => {
    setCustomCharge((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
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
            <div key={field.id} className="mb-3 text-left">
              <label
                htmlFor={field.id}
                className="block mb-1 text-sm text-heading"
              >
                {field.label}
              </label>
              <div
                className={`flex items-center rounded-md bg-neutral-secondary-medium border px-3 py-2.5 shadow-xs focus-within:ring-1 ${
                  hasError
                    ? "border-red-500 focus-within:ring-red-500"
                    : "border-slate-400 focus-within:ring-brand"
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
        <div>
          <button
            type="button"
            onClick={() => setUseCustomCharge((prev) => !prev)}
            className="text-sm text-violet-600 underline hover:text-violet-800"
          >
            {useCustomCharge
              ? "Use custom charges"
              : "Use single charging power"}
          </button>
        </div>
        {!useCustomCharge && (
          <div className="mb-5 text-left space-y-4">
            {customCharges.map((charge, index) => (
              <div
                key={index}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-4"
              >
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-slate-700">
                    Custom charge {index + 1}
                  </h4>

                  <button
                    type="button"
                    onClick={() => removeCustomCharge(index)}
                    className="text-slate-400 hover:text-red-600 transition"
                    aria-label={`Remove custom charge ${index + 1}`}
                  >
                    ✕
                  </button>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Power */}
                  <div className="flex items-center gap-3">
                    <label className="w-28 text-sm text-slate-600">Power</label>

                    <div className="flex items-center flex-1 rounded border border-slate-300 bg-white px-3 py-2 focus-within:ring-1 focus-within:ring-violet-500">
                      <input
                        type="number"
                        min={0}
                        value={charge.power}
                        className="flex-1 border-0 p-0 text-sm focus:ring-0 outline-none"
                      />
                      <span className="ml-2 text-xs text-slate-500">kW</span>
                    </div>
                  </div>

                  {/* Chargers */}
                  <div className="flex items-center gap-3">
                    <label className="w-28 text-sm text-slate-600">
                      Chargers
                    </label>

                    <div className="flex items-center flex-1 rounded border border-slate-300 bg-white px-3 py-2 focus-within:ring-1 focus-within:ring-violet-500">
                      <input
                        type="number"
                        min={1}
                        value={charge.amount}
                        className="flex-1 border-0 p-0 text-sm focus:ring-0 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setCustomCharge((prev) => [...prev, { power: 0, amount: 0 }])
              }
            >
              + Add Charge
            </button>
          </div>
        )}

        <div className="flex justify-end space-x-4 mt-5">
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

import React, { useState } from "react";
import Button from "../../components/Button";
import type { SimulationInputs } from "../Dashboard";
import { useEffect } from "react";
import CustomCharges from "./CustomCharges";

interface SimulationFormProps {
  onSubmit: (inputs: SimulationInputs) => void;
  onClose?: () => void;
  simulationInputs: SimulationInputs;
}

export type InputField = {
  id: keyof SimulationInputs;
  label: string;
  suffix?: string;
  min: number;
  max: number;
  errorMessage?: string;
};

export type CustomCharges = {
  power: number;
  amount: number;
};

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

const errorMessages = {
  numChargePoints: "Charge points must be between  and 20.",
  arrivalMultiplier: "Arrival probability must be between 20% and 200%.",
  carConsumption: "Car consumption must be positive and 1000kWh or less",
  chargingPower: "Charging power must be positive and 2000 kW or less.",
  amountChargers: "Number of charging points needs to be 20",
};

export type Errors = Partial<Record<keyof typeof errorMessages, boolean>>;

const SimulationForm: React.FC<SimulationFormProps> = ({
  onSubmit,
  simulationInputs,
}) => {
  const [inputs, setInputs] = useState<SimulationInputs>(simulationInputs);
  const [errors, setErrors] = useState<Errors>({});
  const [onSuccess, setOnSuccess] = useState<boolean>(false);
  const [chargingPower, setChargingPower] = useState<CustomCharges[]>([
    { power: inputs.chargingPower, amount: inputs.numChargePoints },
  ]);
  const [useCustomCharge, setUseCustomCharge] = useState<boolean>(false);
  const chargingPowerField = inputFields.find(
    (field) => field.id === "chargingPower"
  )!;

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

  const calculateChargingValues = (chargingPower: CustomCharges[]) => {
    const { totalPower, totalChargers } = chargingPower.reduce(
      (acc, charge) => {
        acc.totalPower += charge.power * charge.amount;
        acc.totalChargers += charge.amount;
        return acc;
      },
      { totalPower: 0, totalChargers: 0 }
    );
    const averagePower =
      totalChargers === 0 ? 0 : Math.round(totalPower / totalChargers);
    return { averagePower: averagePower, totalChargers: totalChargers };
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextInputs = { ...inputs };
    const newErrors: Errors = {};

    //Assign Charging Power to Inputs object
    console.log(chargingPower);
    if (useCustomCharge) {
      const { averagePower, totalChargers } =
        calculateChargingValues(chargingPower);
      newErrors.amountChargers = totalChargers !== inputs.numChargePoints;
      //validateChargingValues(nextInputs, totalChargers);
      nextInputs.chargingPower = averagePower;
    }
    // Validate all inputs

    inputFields.forEach((field) => {
      const value = inputs[field.id];
      newErrors[field.id] = !validateInput(value, field.min, field.max);
    });

    console.log("Errors" + newErrors);
    setErrors(newErrors);

    // Prevent submit if any error
    if (Object.values(newErrors).some(Boolean)) return;
    console.log(nextInputs);
    setOnSuccess(true);
    onSubmit(nextInputs);
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
        {inputFields
          .filter((field) => !(field.id === "chargingPower"))
          .map((field) => {
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
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setUseCustomCharge((prev) => !prev)}
            className="relative inline-flex h-8 w-52 items-center rounded-full bg-slate-200 p-1 transition"
            aria-pressed={useCustomCharge}
          >
            {/* Sliding pill */}
            <span
              className={`absolute left-1 h-6 w-[calc(50%-0.25rem)] rounded-full bg-white shadow transition-transform
        ${useCustomCharge ? "translate-x-full" : "translate-x-0"}
      `}
            />

            {/* Labels */}
            <span
              className={`relative z-10 flex-1 text-center text-xs font-medium transition
        ${!useCustomCharge ? "text-violet-600 " : "text-slate-500"}
      `}
            >
              Single power
            </span>
            <span
              className={`relative z-10 flex-1 text-center text-xs font-medium transition
        ${useCustomCharge ? "text-violet-600 " : "text-slate-500"}
      `}
            >
              Custom charges
            </span>
          </button>
        </div>

        {!useCustomCharge ? (
          //Single Charge

          <div className="mb-3 text-left">
            <label
              htmlFor="chargingPower"
              className="block mb-1 text-sm text-heading"
            >
              {chargingPowerField.label}
            </label>
            <div
              className={`flex items-center rounded-md bg-neutral-secondary-medium border px-3 py-2.5 shadow-xs focus-within:ring-1 ${
                errors["chargingPower"]
                  ? "border-red-500 focus-within:ring-red-500"
                  : "border-slate-400 focus-within:ring-brand"
              }`}
            >
              <input
                type="number"
                id={chargingPowerField.id}
                required
                min={chargingPowerField.min}
                max={chargingPowerField.max}
                value={inputs[chargingPowerField.id]}
                onChange={handleChange}
                className="flex-1 min-w-0 bg-transparent border-0 focus:ring-0 text-heading text-sm md:text-base outline-none"
              />
              <span className="ml-2 text-gray-500 font-medium">
                {chargingPowerField.suffix}
              </span>
            </div>
            {errors["chargingPower"] && (
              <p className="mt-1 text-sm text-red-600">
                {chargingPowerField.errorMessage}
              </p>
            )}
          </div>
        ) : (
          //Custom Charges
          <CustomCharges
            chargingPower={chargingPower}
            setChargingPower={setChargingPower}
            powerParameters={inputFields[3]}
            errors={errors}
          />
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

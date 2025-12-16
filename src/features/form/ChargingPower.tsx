import React, { useState } from "react";
import Button from "../../components/Button";
import type { CustomCharges, InputField } from "./SimulationForm";
import { useEffect } from "react";
import { parseArgs } from "util";

interface ChargingPowerProps {
  chargingPower: CustomCharges[];
  setChargingPower: React.Dispatch<React.SetStateAction<CustomCharges[]>>;
  numChargePoints?: number;
  powerParameters: InputField;
  errorAmount?: boolean;
}

type Errors = Partial<Record<keyof number, boolean>>;

const ChargingPower: React.FC<ChargingPowerProps> = ({
  chargingPower,
  setChargingPower,
  numChargePoints = 20,
  powerParameters,
  errorAmount = false,
}) => {
  const [errorPower, setErrorPower] = useState<Errors>({});
  const [useCustomCharge, setUseCustomCharge] = useState<boolean>(false);

  const validatePower = (power: number) => {
    if (power > powerParameters.max || power < powerParameters.min) {
      return false;
    }
    return true;
  };
  const updateCharge = (
    index: number,
    field: keyof CustomCharges,
    value: number
  ) => {
    setChargingPower((prev) =>
      prev.map((charge, i) =>
        i === index ? { ...charge, [field]: value } : charge
      )
    );
    validatePower(value);
  };

  const removeCustomCharge = (indexToRemove: number) => {
    setChargingPower((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <>
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
        <div className="mb-3 text-left">
          <label
            htmlFor="chargingPower"
            className="block mb-1 text-sm text-heading"
          >
            Charging Power
          </label>
          <div
            className={`flex items-center rounded-md bg-neutral-secondary-medium border px-3 py-2.5 shadow-xs focus-within:ring-1 
              }`}
          >
            <input
              type="number"
              id="chargingPower"
              required
              min={powerParameters.min}
              max={powerParameters.max}
              value={chargingPower[0].power}
              onChange={(e) => updateCharge(0, "power", Number(e.target.value))}
              className="flex-1 min-w-0 bg-transparent border-0 focus:ring-0 text-heading text-sm md:text-base outline-none"
            />
            <span className="ml-2 text-gray-500 font-medium">kW</span>
          </div>
        </div>
      ) : (
        <div className="my-5 text-left space-y-4">
          {errorAmount && (
            <p className="mt-1 text-sm text-red-600">
              Number of charging points has to be {numChargePoints}
            </p>
          )}
          {chargingPower.map((charge, index) => (
            <div
              key={index}
              className="rounded-lg border border-slate-200 bg-slate-50 p-3 space-y-2"
            >
              {/* Header*/}
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
              <div className="flex flex-col gap-3">
                {/* Power */}
                <div className="flex flex-col items-start">
                  <label className="text-sm text-slate-600">Power</label>

                  <div className="flex items-center w-full rounded border border-slate-300 bg-white px-3 py-2 focus-within:ring-1 focus-within:ring-violet-500">
                    <input
                      type="number"
                      placeholder="0"
                      value={charge.power}
                      min={powerParameters.min}
                      max={powerParameters.max}
                      onChange={(e) =>
                        updateCharge(index, "power", Number(e.target.value))
                      }
                      className="flex-1 min-w-0 border-0 p-0 text-sm focus:ring-0 outline-none"
                    />
                    <span className="ml-2 text-xs text-slate-500">kW</span>
                  </div>
                </div>

                {/* Number of Chargers */}
                <div className="flex flex-col items-start">
                  <label className="text-sm text-slate-600">Amount</label>

                  <div
                    className={`flex w-full items-center rounded border  bg-white px-3 py-2 focus-within:ring-1 ${
                      errorAmount
                        ? "border-red-500 focus-within:ring-red-500"
                        : "border-slate-300 focus-within:ring-violet-500"
                    }`}
                  >
                    <input
                      type="number"
                      min={powerParameters.min}
                      max={powerParameters.max}
                      value={charge.amount}
                      onChange={(e) =>
                        updateCharge(index, "amount", Number(e.target.value))
                      }
                      className="flex-1 min-w-0  border-0 p-0 text-sm focus:ring-0 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setChargingPower((prev) => [...prev, { power: 0, amount: 0 }])
            }
          >
            + Add Charge
          </button>
        </div>
      )}
    </>
  );
};

export default ChargingPower;

import type { CustomCharges, InputField } from "./SimulationForm";
import type { Errors } from "./SimulationForm";

interface CustomChargePointsProps {
  chargingPower: CustomCharges[];
  setChargingPower: React.Dispatch<React.SetStateAction<CustomCharges[]>>;
  numChargePoints?: number;
  powerParameters: InputField;
  errors: Errors;
}

const CustomChargePoints: React.FC<CustomChargePointsProps> = ({
  chargingPower,
  setChargingPower,
  numChargePoints = 20,
  powerParameters,
  errors,
}) => {
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
      <div className="my-5 text-left space-y-4">
        {errors["amountChargers"] && (
          <p className="mt-1 text-sm text-red-600">
            Number of Chargepoints has to be {numChargePoints}
          </p>
        )}
        {errors["chargingPowerCustom"] && (
          <p className="mt-1 text-sm text-red-600">
            Charging power must be positive and less than 2000 kW
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
                Chargepoint {index + 1}
              </h4>

              <button
                type="button"
                onClick={() => removeCustomCharge(index)}
                className="text-slate-400 hover:text-red-600 hover:cursor-pointer transition"
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

                <div
                  className={`flex w-full items-center rounded border  bg-white px-3 py-2 focus-within:ring-1 ${
                    errors["chargingPowerCustom"]
                      ? "border-red-500 focus-within:ring-red-500"
                      : "border-slate-300 focus-within:ring-violet-500"
                  }`}
                >
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
                    errors["amountChargers"]
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
          className=" hover:cursor-pointer rounded hover:text-violet-600"
          onClick={() =>
            setChargingPower((prev) => [...prev, { power: 0, amount: 0 }])
          }
        >
          + Add Charge
        </button>
      </div>
    </>
  );
};

export default CustomChargePoints;

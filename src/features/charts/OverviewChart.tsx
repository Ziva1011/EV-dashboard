import React from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import type { PowerChartProps } from "./PowerChart";

import {
  mockHourlyCars,
  mockWeeklyCars,
  mockMonthlyCars,
  mockYearlyCars,
} from "../../../data/mockData";

const OverviewChart: React.FC<PowerChartProps> = ({
  simulationInputs,
  timeInterval,
}) => {
  const { numChargePoints, arrivalMultiplier, carConsumption, chargingPower } =
    { ...simulationInputs };

  const Datasets = {
    Day: mockHourlyCars,
    Week: mockWeeklyCars,
    Month: mockMonthlyCars,
    Year: mockYearlyCars,
  };

  const chartData = Datasets[timeInterval].map((numCars, hour) => {
    const effectiveCars = Math.min(
      (numCars * arrivalMultiplier) / 100,
      numChargePoints
    );

    return {
      label: `${hour}`,
      events: effectiveCars,
      maxPowerKW: effectiveCars * chargingPower,
      energyKWh: effectiveCars * carConsumption,
    };
  });

  return (
    <div className="w-full">
      <ResponsiveContainer height={300} width="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="events" name="Charging events" fill="#8b5cf6" />
          <Bar dataKey="maxPowerKW" name="Max power (kW)" fill="#3b82f6" />
          <Bar dataKey="energyKWh" name="Energy (kWh)" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OverviewChart;

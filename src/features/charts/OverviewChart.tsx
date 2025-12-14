import React from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  Label,
  Line,
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
    const effectiveCars = (numCars * arrivalMultiplier) / 100;

    return {
      label: `${hour + 1}`,
      energyKWh: effectiveCars * carConsumption,
      events: effectiveCars,
      maxPowerKW: effectiveCars * chargingPower,
    };
  });

  return (
    <div className="w-full">
      <ResponsiveContainer height={300} width="100%">
        <BarChart data={chartData} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="energyKWh" name="Energy (kWh)" fill="#8B5CF6" />
          <Bar dataKey="events" name="Charging events" fill="#FFC6AC" />
          <Line
            dataKey="maxPowerKW"
            name="Max power (kW)"
            fill="#C4A29E"
            strokeWidth={2.5}
            dot={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OverviewChart;

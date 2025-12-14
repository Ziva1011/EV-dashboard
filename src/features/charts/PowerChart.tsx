import React from "react";
import {
  LineChart,
  Line,
  Label,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import type { SimulationInputs } from "../Dashboard";
import type { TimeInterval } from "../Dashboard";

import {
  mockHourlyCars,
  mockWeeklyCars,
  mockMonthlyCars,
  mockYearlyCars,
} from "../../../data/mockData";

export interface PowerChartProps {
  simulationInputs: SimulationInputs;
  timeInterval: TimeInterval;
}

const PowerChart: React.FC<PowerChartProps> = ({
  simulationInputs,
  timeInterval,
}) => {
  const { numChargePoints, arrivalMultiplier, carConsumption, chargingPower } =
    { ...simulationInputs };

  const dataByInterval = {
    Day: mockHourlyCars.map((numCars, hour) => ({
      label: `${hour}h`,
      value:
        Math.min((numCars * arrivalMultiplier) / 100, numChargePoints) *
        chargingPower,
    })),
    Week: mockWeeklyCars.map((numCars, day) => ({
      label: `Day ${day + 1}`,
      value: (numCars * chargingPower * arrivalMultiplier) / 100,
    })),
    Month: mockMonthlyCars.map((numCars, week) => ({
      label: `Week ${week + 1}`,
      value: (numCars * chargingPower * arrivalMultiplier) / 100,
    })),
    Year: mockYearlyCars.map((numCars, month) => ({
      label: `Month ${month + 1}`,
      value: (numCars * chargingPower * arrivalMultiplier) / 100,
    })),
  };

  const chartData = dataByInterval[timeInterval]; // picks dataset depending on interval

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
          }}
        >
          <CartesianGrid
            horizontal={true}
            vertical={false}
            stroke="#e0e0e0"
            strokeDasharray="3 3"
          />

          <XAxis dataKey="label"></XAxis>
          <YAxis></YAxis>
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8B5CF6"
            strokeWidth={2.5}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PowerChart;

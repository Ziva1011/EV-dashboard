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

import type { SimulationInputs } from "../../App";
import type { TimeInterval } from "../../App";

import {
  mockHourlyCars,
  mockWeeklyCars,
  mockMonthlyCars,
  mockYearlyCars,
} from "../../../data/mockData";

export interface SimulationChartProps {
  simulationInputs: SimulationInputs;
  timeInterval: TimeInterval;
}

const SimulationChart: React.FC<SimulationChartProps> = ({
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

  const chartData = dataByInterval[timeInterval]; // pick data depending on interval

  return (
    <div className="w-full h-100">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 20, bottom: 50, left: 40 }}
        >
          <CartesianGrid
            horizontal={true}
            vertical={false}
            stroke="#e0e0e0"
            strokeDasharray="3 3"
          />

          <XAxis dataKey="label">
            <Label
              value="Hour of the Day"
              position="insideBottom"
              offset={-20}
            />
          </XAxis>
          <YAxis>
            <Label value="kW" position="insideLeft" offset={-20} />
          </YAxis>
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="black"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimulationChart;

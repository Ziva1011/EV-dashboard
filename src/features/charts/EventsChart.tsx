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

const EventsChart: React.FC<PowerChartProps> = ({
  simulationInputs,
  timeInterval,
}) => {
  const { numChargePoints, arrivalMultiplier, carConsumption, chargingPower } =
    { ...simulationInputs };

  const dataByInterval = {
    Day: mockHourlyCars.map((numCars, hour) => ({
      label: `${hour}h`,
      value: (numCars * arrivalMultiplier) / 100,
    })),
    Week: mockWeeklyCars.map((numCars, day) => ({
      label: `Day ${day + 1}`,
      value: (numCars * arrivalMultiplier) / 100,
    })),
    Month: mockMonthlyCars.map((numCars, week) => ({
      label: `Week ${week + 1}`,
      value: (numCars * arrivalMultiplier) / 100,
    })),
    Year: mockYearlyCars.map((numCars, month) => ({
      label: `Month ${month + 1}`,
      value: (numCars * arrivalMultiplier) / 100,
    })),
  };

  const chartData = dataByInterval[timeInterval]; // picks dataset depending on interval

  return (
    <div className="w-full">
      <ResponsiveContainer height={300} width="100%">
        <BarChart
          accessibilityLayer
          barCategoryGap="10%"
          barSize={20}
          data={chartData}
          margin={{
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
          }}
          syncMethod="index"
        >
          <CartesianGrid
            horizontal={true}
            vertical={false}
            stroke="#e0e0e0"
            strokeDasharray="3 3"
          />
          <XAxis dataKey="label" />
          <YAxis scale="linear"></YAxis>
          <Tooltip />
          <Bar dataKey="value" fill="#FFC6AC" isAnimationActive={true} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EventsChart;

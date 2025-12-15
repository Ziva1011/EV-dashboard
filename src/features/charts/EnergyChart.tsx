import React from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import type { PowerChartProps } from "./PowerChart";
import { MONTH_LABELS, DATE_APPENDIX } from "../../utils/date";
import {
  mockHourlyCars,
  mockWeeklyCars,
  mockMonthlyCars,
  mockYearlyCars,
} from "../../../data/mockData";

const EnergyChart: React.FC<PowerChartProps> = ({
  simulationInputs,
  timeInterval,
}) => {
  const { arrivalMultiplier, carConsumption } = { ...simulationInputs };

  const dataByInterval = {
    Day: mockHourlyCars.map((numCars, hour) => ({
      label: `${hour + DATE_APPENDIX["Day"]}`,
      value: (numCars * carConsumption * arrivalMultiplier) / 100,
    })),
    Week: mockWeeklyCars.map((numCars, day) => ({
      label: DATE_APPENDIX["Week"] + `${day + 1}`,
      value: (numCars * carConsumption * arrivalMultiplier) / 100,
    })),
    Month: mockMonthlyCars.map((numCars, week) => ({
      label: DATE_APPENDIX["Month"] + `${week + 1}`,
      value: (numCars * carConsumption * arrivalMultiplier) / 100,
    })),
    Year: mockYearlyCars.map((numCars, month) => ({
      label: MONTH_LABELS[month],
      value: (numCars * carConsumption * arrivalMultiplier) / 100,
    })),
  };

  // Selects dataset depending on time interval
  const chartData = dataByInterval[timeInterval];

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
          <YAxis width="auto"></YAxis>
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" isAnimationActive={true} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EnergyChart;

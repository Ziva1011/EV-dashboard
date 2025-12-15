import React from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import {
  mockHourlyCars,
  mockWeeklyCars,
  mockMonthlyCars,
  mockYearlyCars,
} from "../../../data/mockData";
import { INTERVAL_UNIT } from "../../utils/date";

import type { PowerChartProps } from "./PowerChart";

const OverviewChart: React.FC<PowerChartProps> = ({
  simulationInputs,
  timeInterval,
}) => {
  const { arrivalMultiplier, carConsumption, chargingPower } = {
    ...simulationInputs,
  };

  const Datasets = {
    Day: mockHourlyCars,
    Week: mockWeeklyCars,
    Month: mockMonthlyCars,
    Year: mockYearlyCars,
  };

  const chartData = Datasets[timeInterval].map((numCars, timeUnit) => {
    const effectiveCars = (numCars * arrivalMultiplier) / 100;

    return {
      label:
        timeInterval == "Day"
          ? `${timeUnit}` + INTERVAL_UNIT[timeInterval]
          : INTERVAL_UNIT[timeInterval] + `${timeUnit + 1}`,
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

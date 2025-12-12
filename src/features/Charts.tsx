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

import { mockHourlyCars } from "../../data/mockData";

const chartData = mockHourlyCars.map((numCars, hour) => ({
  hour,
  value: numCars,
}));

const SimulationChart: React.FC<{}> = ({}) => {
  return (
    <div className="w-full h-100">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour">
            <Label value="Hour of the Day" position="bottom" offset={0} />
          </XAxis>
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="black"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimulationChart;

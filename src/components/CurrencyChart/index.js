import { useEffect, useState } from "react";

import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
} from "recharts";

// })[
//   {
//     name: arrayOfDates[0].format("MM-YYYY"),
//     uv: 4000,
//     pv: 2400,
//   },
//   {
//     name: arrayOfDates[1].format("MM-YYYY"),
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: arrayOfDates[2].format("MM-YYYY"),
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: arrayOfDates[3].format("MM-YYYY"),
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: arrayOfDates[4].format("MM-YYYY"),
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: arrayOfDates[5].format("MM-YYYY"),
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: arrayOfDates[6].format("MM-YYYY"),
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

export default function CurrencyChart(props) {
  const data = Object.keys(props.data.rates).map((item) => {
    return {
      name: item,
      rate: props.data.rates[item] * props.amount,
    };
  });
  console.log(data);
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="rate" fill="#8884d8" />
          {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

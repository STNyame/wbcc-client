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
const moment = require("moment");
const year = {
  present: moment().format("YYYY"),
  past: moment().subtract(1, "years").format("YYYY"),
};
export default function CurrencyChart(props) {
  const data =
    props.data &&
    Object.keys(props.data.latest.rates).map((item) => {
      return {
        name: item,
        [year.present]: props.data.latest.rates[item] * props.amount,
        [year.past]: props.data.old.rates[item] * props.amount,
      };
    });

  return (
    <div
      style={{ width: "500px", height: "400px", backgroundColor: "#282c34" }}
    >
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
          <Bar dataKey={year.present} fill="#8884d8" />
          <Bar dataKey={year.past} fill="#949" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

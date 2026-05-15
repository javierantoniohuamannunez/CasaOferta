import {LineChart,Line, XAxis,YAxis,Tooltip, CartesianGrid, ResponsiveContainer} from "recharts";

const PrecioChart = ({ historial }) => {
  const data = historial
    .slice()
    .reverse()
    .map((item) => ({
      fecha: new Date(item.fecha).toLocaleDateString(),

      precio: item.precio,
    }));

  return (
    <div
      style={{
        width: "100%",
        height: "350px",
      }}
    >
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="fecha" />

          <YAxis />

          <Tooltip />

          <Line type="monotone" dataKey="precio" stroke="#4ade80" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PrecioChart;

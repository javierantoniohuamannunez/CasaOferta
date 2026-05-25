import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PrecioChart = ({ historial }) => {
  const data = historial
    .slice()
    .reverse()
    .map((item) => ({
      fecha: new Date(item.fecha).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
      }),
      precio: Number(item.precio),
    }));

  return (
    <div
      className="bg-[#0f172a] rounded-2xl p-5 border border-[#1e293b]"
      style={{
        width: "100%",
        height: "380px",
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2
          style={{
            color: "white",
            fontSize: "20px",
            fontWeight: "600",
          }}
        >
          Historial de precios
        </h2>

        <span
          style={{
            color: "#94a3b8",
            fontSize: "14px",
          }}
        >
          {data.length} registros
        </span>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />

              <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="fecha"
            tick={{
              fill: "#94a3b8",
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
            minTickGap={35}
          />

          <YAxis
            tick={{
              fill: "#94a3b8",
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${value}€`}
            domain={[0, (dataMax) => Math.ceil(dataMax + 10)]}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              border: "1px solid #1f2937",
              borderRadius: "12px",
              color: "#fff",
            }}
            formatter={(value) => [`${value}€`, "Precio"]}
            labelStyle={{
              color: "#9ca3af",
            }}
          />

          <Area
            type="monotone"
            dataKey="precio"
            stroke="#22c55e"
            strokeWidth={3}
            fill="url(#priceGradient)"
            dot={false}
            activeDot={{
              r: 5,
              stroke: "#22c55e",
              strokeWidth: 2,
              fill: "#0f172a",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PrecioChart;

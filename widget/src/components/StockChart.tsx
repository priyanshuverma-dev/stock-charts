import { useEffect, useState } from "react";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { formatDistance } from "date-fns";
import { IntervalRadio } from "./IntervalRadio";
import {
  formatPrice,
  formatTime,
  getTimefromInterval,
  mergeDuplicateData,
  stockIntervals,
} from "../lib/utils";

const StockChart = ({ symbol }: { symbol: string; classNames: string }) => {
  const [interval, setInterval] = useState("1Y");
  const currentStockInterval = interval;

  const [chartData, setChartData] = useState<StockData[]>([]);

  const formatXAxis = (tickItem: any) => {
    return formatDistance(tickItem, new Date());
  };

  const formatYAxis = (item: any) => {
    return `${formatPrice(item)}`;
  };

  const formatP = (value: any) => {
    return formatPrice(value);
  };

  useEffect(() => {
    // Fetch historical chart data on initial render
    fetch(
      `http://localhost:5000/chart/${symbol}/?interval=${getTimefromInterval(
        currentStockInterval
      )}`
    ).then(async (res) => {
      const data = await res.json();

      const chart: RawStockData[] = data.quotes;
      const formattedChartData = chart.map((d) => {
        return {
          price: d.high,
          date: Date.parse(d.date),
        };
      });

      const mergedData = mergeDuplicateData(formattedChartData);
      setChartData(mergedData);
    });

    // Set up SSE for real-time updates
    const sse = new EventSource(`http://localhost:5000/stream/${symbol}`);

    sse.onmessage = (event) => {
      try {
        const preParsedData = JSON.parse(event.data);
        const parsedData = JSON.parse(preParsedData);

        const newPoint = {
          price: parsedData.high,
          date: Date.parse(parsedData.date),
        };

        setChartData((prevData) => mergeDuplicateData([...prevData, newPoint]));
      } catch (error) {
        console.log("Error parsing SSE data:", error);
      }
    };

    return () => {
      sse.close();
    };
  }, [symbol, currentStockInterval]);

  return (
    <div className="border-2 m-1 rounded-md">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
          <div className="live-indicator"></div>
          <span className="text-[#82ca9d]">{symbol.toUpperCase()}</span>
        </div>
        <div className="flex items-center gap-4">
          {stockIntervals.map((interval) => (
            <IntervalRadio
              key={interval.label}
              interval={interval}
              currentInterval={currentStockInterval}
              handleRadioChange={(
                event: React.ChangeEvent<HTMLInputElement>
              ) => {
                setInterval(event.target.value);
              }}
            />
          ))}
        </div>
      </div>
      <ResponsiveContainer height={200}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          className=" bg-[#82ca9e0d]"
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tickLine={false}
            minTickGap={35}
            fontSize={12}
            tickFormatter={formatXAxis}
          />
          <YAxis
            domain={["dataMin", "auto"]}
            tickLine={false}
            fontSize={10}
            tickFormatter={formatYAxis}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            wrapperStyle={{ backgroundColor: "#a32828", borderRadius: 40 }}
            formatter={formatP}
            labelFormatter={formatTime}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPrice)"
            strokeWidth={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;

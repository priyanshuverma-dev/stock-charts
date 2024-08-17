"use client";

import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import moment from "moment";
import { useSearchParams } from "next/navigation";

type StockData = {
  symbol: string;
  price: number;
  time: string;
};

const StockChart = () => {
  const searchParams = useSearchParams();

  const symbol = searchParams.get("symbol") ?? "appl";

  const [chartData, setChartData] = useState<StockData[]>([]);

  const TOPIC_NAME = symbol;
  useEffect(() => {
    const sse = new EventSource(`http://localhost:8080/stream/${TOPIC_NAME}`);

    sse.onmessage = (event) => {
      try {
        const preParsedData = JSON.parse(event.data);
        const parsedData = JSON.parse(preParsedData);

        setChartData((prevData) => [
          ...prevData,
          {
            price: parsedData.price,
            symbol: parsedData.symbol,
            time: moment(new Date(parsedData.time)).format("hh:mm:ss A"),
          },
        ]);
      } catch (error) {
        console.log("Error parsing SSE data:", error);
      }
    };
    return () => {
      sse.close();
    };
  }, [TOPIC_NAME]);

  const formatYAxis = (price: number) => {
    return `$${price.toFixed(0)}`;
  };

  return (
    <div>
      <h1 className="font-semibold text-xl">
        Real-time {symbol.toUpperCase()} Stock Prices
      </h1>

      <LineChart
        width={820}
        height={400}
        data={chartData}
        margin={{ top: 20, right: 30, bottom: 10, left: 10 }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="time" />
        <YAxis tickFormatter={formatYAxis} />
        <Tooltip />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default StockChart;

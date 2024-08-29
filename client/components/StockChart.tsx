"use client";

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
import { useSearchParams } from "next/navigation";
import { IntervalRadio } from "./IntervalRadio";
import { formatPrice, getTimefromInterval, stockIntervals } from "@/lib/utils";

type StockData = {
  price: number;
  date: number;
};

type RawStockData = {
  date: string;
  high: number;
  volume: number;
  open: number;
  low: number;
  close: number;
  adjclose: number;
};

const StockChart = () => {
  const searchParams = useSearchParams();
  const symbol = searchParams.get("symbol") ?? "NFLX";
  const currentStockInterval = searchParams.get("interval") ?? "1Y";

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
    fetch(
      `http://localhost:8080/chart?symbol=${symbol}&interval=${getTimefromInterval(
        currentStockInterval
      )}`
    ).then(async (res) => {
      const data: RawStockData[] = await res.json();
      const l = data.map((d) => {
        return {
          price: d.high,
          date: Date.parse(d.date),
        };
      });

      setChartData(l);
    });
    // const sse = new EventSource(`http://localhost:8080/stream/${TOPIC_NAME}`);

    // sse.onmessage = (event) => {
    //   try {
    //     const preParsedData = JSON.parse(event.data);
    //     const parsedData = JSON.parse(preParsedData);

    //     setChartData((prevData) => [
    //       ...prevData,
    //       {
    //         price: parsedData.price,
    //         symbol: parsedData.symbol,
    //         time: moment(new Date(parsedData.time)).format("hh:mm:ss A"),
    //       },
    //     ]);
    //   } catch (error) {
    //     console.log("Error parsing SSE data:", error);
    //   }
    // };
    return () => {
      // sse.close();
    };
  }, [symbol]);

  return (
    <div>
      <div className=" flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
          <div className="live-indicator"></div>
          <span className="text-[#82ca9d]">Live</span>
        </div>
        <div className="flex items-center gap-4">
          {stockIntervals.map((interval) => (
            <IntervalRadio
              key={interval.label}
              interval={interval}
              currentInterval={currentStockInterval}
            />
          ))}
        </div>
      </div>
      <ResponsiveContainer width={600} height={200}>
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

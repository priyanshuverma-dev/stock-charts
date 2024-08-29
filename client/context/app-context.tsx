"use client";

import { stockIntervals } from "@/lib/utils";
import { createContext, useContext, useState } from "react";

export interface StockIntervalProps {
  value: string;
  label: string;
  multiplier: number;
  timeSpan: string;
  from: number;
  to: number;
}
export const AppContext = createContext({
  selectedSymbol: "",
  setSelectedSymbol: (symbol: string) => {},
  currentStockInterval: {
    value: "",
    label: "",
  },
  setCurrentStockInterval: ({ value, label }: StockIntervalProps) => {},
  stockSearchInput: "",
  setStockSearchInput: (input: string) => {},
});

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedSymbol, setSelectedSymbol] = useState("AAPL");
  const [currentStockInterval, setCurrentStockInterval] = useState(
    stockIntervals[0]
  );
  const [stockSearchInput, setStockSearchInput] = useState("");

  const value = {
    selectedSymbol,
    setSelectedSymbol,
    currentStockInterval,
    setCurrentStockInterval,
    stockSearchInput,
    setStockSearchInput,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;

export const useAppContext = () => {
  return useContext(AppContext);
};

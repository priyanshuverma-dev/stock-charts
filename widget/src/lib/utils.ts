import { format } from "date-fns";

export const createDate = (
  hours: number,
  date: number,
  days: number,
  weeks: number
) => {
  let newDate = new Date(date);
  newDate.setHours(newDate.getHours() + hours);
  newDate.setDate(newDate.getDate() + days + weeks * 7);
  return newDate;
};
type StockData = {
  date: number;
  price: number;
};

// Function to merge duplicate data
export function mergeDuplicateData(data: StockData[]): StockData[] {
  const mergedData = data.reduce((acc: StockData[], current: StockData) => {
    const existing = acc.find((item) => item.date === current.date);

    if (existing) {
      // Average the price if date is the same
      existing.price = (existing.price + current.price) / 2;
    } else {
      acc.push({ ...current });
    }

    return acc;
  }, []);

  return mergedData;
}
export const today = () => {
  return new Date().getTime();
};

export const stockIntervals = [
  {
    label: "1W",
    value: "1W",
  },
  {
    label: "1M",
    value: "1M",
  },
  {
    label: "1Y",
    value: "1Y",
  },
];

export const getTimefromInterval = (interval: string) => {
  if (interval == "1M") {
    return new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).getTime(); // 1 month
  }
  if (interval == "1W") {
    return new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).getTime(); // 1 week
  } else {
    return new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).getTime(); // 1 year
  }
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(price);
};
export const formatTime = (time: number) => {
  return format(new Date(time), "PPpp");
};

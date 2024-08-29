import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export const pastHour = () => {
  return new Date(new Date().getTime() - 60 * 60 * 1000).getTime();
};

export const past2Days = () => {
  return new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).getTime();
};

export const pastDay = () => {
  return new Date(new Date().getTime() - 24 * 60 * 60 * 1000).getTime();
};

export const pastWeek = () => {
  return new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).getTime();
};

export const pastMonth = () => {
  return new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000).getTime();
};

export const pastYear = () => {
  return new Date(
    new Date().getTime() - 12 * 30 * 24 * 60 * 60 * 1000
  ).getTime();
};

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

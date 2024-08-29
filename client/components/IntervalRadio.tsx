"use client";
import { useSearchParams } from "next/navigation";

interface IProps {
  interval: { label: string; value: number | string };
  currentInterval: number | string;
}

export const IntervalRadio = ({ interval, currentInterval }: IProps) => {
  const searchParams = useSearchParams();
  const symbol = searchParams.get("symbol") ?? "msft";
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof window != undefined) {
      window.location.href = `?symbol=${symbol}&interval=${event.target.value}`;
    }
  };

  const checked = currentInterval === interval.value;
  return (
    <label
      htmlFor=""
      className={`rounded-md relative transition duration-300 border-slate-400 border select-none cursor-pointer aspect-square w-8 flex items-center justify-center ${
        checked && "bg-primary text-white"
      }`}
    >
      <input
        checked={checked}
        onChange={handleRadioChange}
        value={interval.value}
        type="radio"
        className="absolute opacity-0 cursor-pointer top-0 left-0 right-0 bottom-0"
      />
      <span className=" text-sm">{interval.label}</span>
    </label>
  );
};

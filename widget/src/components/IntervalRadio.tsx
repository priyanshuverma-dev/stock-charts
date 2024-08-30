interface IProps {
  interval: { label: string; value: number | string };
  currentInterval: number | string;
  handleRadioChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const IntervalRadio = ({
  interval,
  currentInterval,
  handleRadioChange,
}: IProps) => {
  const checked = currentInterval === interval.value;
  return (
    <label
      htmlFor=""
      className={`rounded-md relative transition duration-300 border-slate-400 border select-none cursor-pointer aspect-square w-8 flex items-center justify-center ${
        checked && "bg-black text-white"
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

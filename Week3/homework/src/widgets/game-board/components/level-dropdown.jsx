import { cn } from "@shared/utils/cn";

const LEVEL_OPTIONS = [
  { label: "Level 1", value: 1 },
  { label: "Level 2", value: 2 },
  { label: "Level 3", value: 3 },
];

const LevelDropdown = ({ value, onChange }) => {
  const handleChange = (event) => {
    const next = Number(event.target.value);
    onChange?.(next);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className={cn(
        "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:outline-none",
      )}
    >
      {LEVEL_OPTIONS.map(({ label, value: optionValue }) => (
        <option key={optionValue} value={optionValue}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default LevelDropdown;

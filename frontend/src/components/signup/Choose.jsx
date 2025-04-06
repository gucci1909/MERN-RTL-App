import React from "react";

const SelectField = ({ id, label, value, onChange, options }) => (
  <div>
    <label htmlFor={id} className="mb-1 block text-sm font-semibold">
      {label}
    </label>
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="w-full rounded-lg bg-white px-4 py-2 text-gray-900 shadow focus:ring-2 focus:ring-sky-400 focus:outline-none"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;

import React from "react";

const InputField = ({
  id,
  label,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-semibold text-start"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg bg-white px-4 py-2 text-gray-900 shadow focus:outline-none focus:ring-2 focus:ring-sky-400 rtl:text-right"
        required
      />
    </div>
  );
};

export default InputField;

import React from "react";

const TextAreaField = ({ id, label, value, onChange, placeholder }) => (
  <div>
    <label htmlFor={id} className="mb-1 block text-sm font-semibold">
      {label}
    </label>
    <textarea
      id={id}
      name={id}
      rows="3"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full resize-none rounded-lg bg-white px-4 py-2 text-gray-900 shadow focus:ring-2 focus:ring-sky-400 focus:outline-none"
    ></textarea>
  </div>
);

export default TextAreaField;

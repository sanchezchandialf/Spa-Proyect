// InputComponent.js
import React from 'react';

export const InputComponent = ({ type, placeholder, rows }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-[#7eae66]"
      rows={rows}
    />
  );
};


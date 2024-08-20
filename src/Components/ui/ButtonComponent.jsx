// ButtonComponent.jsx
import React from 'react';

export const ButtonComponent = ({ children }) => {
  return (
    <button
      type="submit"
      className="w-full bg-[#d02d69] text-white p-3 rounded-md hover:bg-[#a72153] transition duration-300"
    >
      {children}
    </button>
  );
};

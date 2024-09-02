// ButtonComponent.jsx
import React from 'react';
import Button from 'react-bootstrap/Button';
export const ButtonComponent = ({ children, onClick}) => {
  return (
    <button
    onClick={onClick}
      variant="info"
      type="submit"
      className='text-center bg-[#d02d69] text-white p-3 rounded-md hover:bg-[#a72153] transition duration-300'
    >
      {children}
    </button>
  );
};

import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';

export const FormInput = ({ type, textLabel, name, register, options }) => {
  return (
    <div className="form-floating mt-2">
      <input type={type}
        id={name}  
        name={name}
        className="form-control"
        placeholder=" "
        {...register(name, options)}  // Aplica la función register al input
      />
      <label htmlFor={name}>
        {textLabel}
      </label>
    </div>
  );
};

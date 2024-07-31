import React from 'react';

const DynamicInput = ({ type, placeholder, value, onChange, id }) => {
  return (
    <input
      type={type}
      id={id}
      className='border p-4 rounded-lg mt-2 w-full'
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default DynamicInput;

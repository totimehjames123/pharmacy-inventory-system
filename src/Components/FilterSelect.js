import React from 'react';

function FilterSelect({ filterType, options, onChange }) {
  return (
    <select
      className='border-0 bg-gray-200 mr-2 rounded-lg text-xs h-[32px]'
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="" disabled selected>
        {`${filterType}`}
      </option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default FilterSelect;

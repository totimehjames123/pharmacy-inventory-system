import React from 'react';

function FilterSelect({ filterType, options, onChange, value}) {
  return (
    <select
      className='border-0 bg-gray-200 mr-2 text-gray-500 rounded-lg text-xs h-[32px]'
      onChange={(e) => onChange(e.target.value)}
    >
      <option value={value} disabled >
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

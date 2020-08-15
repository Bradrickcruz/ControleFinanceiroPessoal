import React from 'react';

export default function SelectionPeriod(props) {
  const { periods, selected, propClassName, propOnChange } = props;

  const handleSelectChange = (event) => {
    propOnChange(event.target.value);
  };

  return (
    <div className={propClassName}>
      <select
        value={selected}
        onChange={handleSelectChange}
        className={`browser-default`}
      >
        {periods.map((op) => {
          return (
            <option key={op} value={op}>
              {op}
            </option>
          );
        })}
      </select>
    </div>
  );
}

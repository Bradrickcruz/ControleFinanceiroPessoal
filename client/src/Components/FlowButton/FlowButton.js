import React from 'react';

export default function FlowButton(props) {
  const { char, propOnClick, propClassName } = props;
  return (
    <div>
      <button
        style={{ zIndex: 0 }}
        className={propClassName}
        onClick={propOnClick}
      >
        {char}
      </button>
    </div>
  );
}

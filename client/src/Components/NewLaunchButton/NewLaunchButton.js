import React from 'react';

export default function NewLaunchButton(props) {
  const { propHandleClick } = props;

  const handleClick = () => {
    propHandleClick();
  };

  return (
    <div>
      <button
        style={{ width: '15rem', zIndex: 0 }}
        className="waves-effect waves-light btn browser-default"
        onClick={handleClick}
      >
        + Novo Lançamento
      </button>
    </div>
  );
}

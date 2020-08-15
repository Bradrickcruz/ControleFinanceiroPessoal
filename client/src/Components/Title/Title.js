import React from 'react';

export default function Title(props) {
  const text = props.children;
  return (
    <div className="center">
      <h2>{text}</h2>
    </div>
  );
}

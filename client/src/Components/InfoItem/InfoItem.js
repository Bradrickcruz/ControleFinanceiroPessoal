import React from 'react';

export default function InfoItem(props) {
  const { label, color = 'black', value, bold = true } = props;
  return (
    <div>
      <span style={{ fontWeight: 'bold' }}>
        {`${label}: `}
        <span
          style={{
            color: color,
            fontWeight: bold ? 'bold' : 'normal',
          }}
        >
          {value}
        </span>
      </span>
    </div>
  );
}

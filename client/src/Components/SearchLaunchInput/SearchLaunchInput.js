import React from 'react';

export default function SearchLaunchInput(props) {
  const { value, propOnChange } = props;

  const handleChange = (e) => {
    let searchFor = e.target.value;
    propOnChange(searchFor);
  };

  return (
    <div style={{ ...styles.customInput, ...styles.flexRow }}>
      <i className="small material-icons">search</i>
      <input
        type="search"
        placeholder="Filtro"
        onChange={handleChange}
        value={value}
      />
    </div>
  );
}

const styles = {
  customInput: {
    width: '50rem',
    marginLeft: '10px',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

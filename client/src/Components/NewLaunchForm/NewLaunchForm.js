import React, { useState, useEffect } from 'react';
import { addSymbolLeft } from '../../Helpers/formatHelpers';

export default function NewLaunchForm({ propOnSubmit, hideModal }) {
  const today = new Date();
  const initialLaunch = {
    description: '',
    category: '',
    value: 0,
    year: String(today.getFullYear()),
    month: addSymbolLeft(today.getMonth() + 1, '0', 2),
    day: addSymbolLeft(today.getDate(), '0', 2),
    yearMonth: `${today.getFullYear()}-${addSymbolLeft(
      today.getMonth() + 1,
      '0',
      2
    )}`,
    yearMonthDay: `${today.getFullYear()}-${addSymbolLeft(
      today.getMonth() + 1,
      '0',
      2
    )}-${addSymbolLeft(today.getDate(), '0', 2)}`,
    type: '-',
  };

  const [newLaunch, setNewLaunch] = useState(initialLaunch);

  function handleSubmit(e) {
    e.preventDefault();
    propOnSubmit(newLaunch);
  }

  function handleRadioInputChange({ target }) {
    if (target.checked) {
      const { value } = target;
      setNewLaunch({ ...newLaunch, type: value });
    }
  }

  function handleDescriptionInput({ target: { value } }) {
    setNewLaunch({ ...newLaunch, description: value });
  }

  function handleCategoryInput({ target: { value } }) {
    setNewLaunch({ ...newLaunch, category: value });
  }

  function handleCurrencyValueInput({ target: { value: inputValue } }) {
    setNewLaunch({ ...newLaunch, value: parseFloat(inputValue) });
  }

  function handleDateInput(e) {
    if (!e.target.value) {
      return;
    }
    const inputDate = e.target.value.split('-');

    const dataObj = {
      year: inputDate[0],
      month: inputDate[1],
      day: inputDate[2],
      yearMonth: `${inputDate[0]}-${inputDate[1]}`,
      yearMonthDay: `${inputDate[0]}-${inputDate[1]}-${inputDate[2]}`,
    };

    setNewLaunch({ ...newLaunch, ...dataObj });
  }

  return (
    <form id="newForm" onSubmit={handleSubmit}>
      <div id="formHeader" style={styles.flexRow}>
        <span className="right" style={styles.title}>
          Inclusão de lançamento
        </span>
        <button type="button" className="btn red lighten-1" onClick={hideModal}>
          <i className="material-icons">close</i>
        </button>
      </div>
      <div id="formContent" style={styles.formContent}>
        <div
          id="radio-buttons"
          style={{ ...styles.flexRow, ...styles.justifyCenter }}
        >
          <label onChange={handleRadioInputChange}>
            <input
              className="with-gap"
              name="launchType"
              type="radio"
              value="-"
              defaultChecked
            />
            <span style={{ ...styles.radioLabel, color: 'var(--red)' }}>
              Despesa
            </span>
          </label>
          <label onChange={handleRadioInputChange}>
            <input
              className="with-gap"
              name="launchType"
              type="radio"
              value="+"
            />
            <span style={{ ...styles.radioLabel, color: 'var(--green)' }}>
              Receita
            </span>
          </label>
        </div>

        <label className="input-field">
          Descrição:
          <input
            type="text"
            onChange={handleDescriptionInput}
            value={newLaunch.description}
          />
        </label>

        <label className="input-field">
          categoria:
          <input
            type="text"
            onChange={handleCategoryInput}
            value={newLaunch.category}
          />
        </label>

        <div
          id="value-date"
          style={{
            ...styles.flexRow,
            justifyContent: 'space-between',
          }}
        >
          <label className="input-field" style={{ width: '8rem' }}>
            valor:
            <input
              type="number"
              min={0.0}
              step={0.01}
              onChange={handleCurrencyValueInput}
              value={newLaunch.value}
            />
          </label>

          <label className="input-field">
            Data:
            <input
              id="date"
              type="date"
              onChange={handleDateInput}
              value={newLaunch.yearMonthDay}
            />
          </label>
        </div>

        {/* BOTÃO salvar */}
        <button type="submit" className="btn right">
          Salvar
        </button>
      </div>
    </form>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  justifyCenter: {
    justifyContent: 'space-around',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  radioLabel: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  formContent: {
    border: '1px solid #BDBDBD',
    borderRadius: '5px',
    padding: '1.75rem 1rem',
  },
};
